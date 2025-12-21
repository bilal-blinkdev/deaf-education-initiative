// app/api/create-subscription/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Donor } from '@/payload-types';
// import { Donor } from '@/payload-types';
// import { authenticatedRoute } from '@/app/lib/server/protect-route';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: Request) => {
  try {
    const { donationDetails, userDetails, priceId, customAmount } = await req.json();
    if (!donationDetails || !userDetails) {
      return NextResponse.json(
        { error: 'Donation and user details are required.' },
        { status: 400 },
      );
    }

    // Either priceId OR customAmount must be provided
    if (!priceId && !customAmount) {
      return NextResponse.json(
        { error: 'Either Price ID or custom amount is required.' },
        { status: 400 },
      );
    }

    const payload = await getPayload({ config });

    const { email, firstName, lastName, ...restUserDetails } = userDetails;
    const { projectType, supportType, donationType, ...restDonationDetails } = donationDetails;

    // 1. Find a stripe customer
    let customer: Stripe.Customer;
    const existingCustomers = await stripe.customers.list({ email: email, limit: 1 });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: email,
        name: `${firstName} ${lastName}`,
      });
    }

    // 2. Find or Create a Payload Donor
    let donor: Donor | null = null;
    const { docs: existingDonors } = await payload.find({
      collection: 'donors',
      where: { email: { equals: email } },
      limit: 1,
    });

    if (existingDonors.length > 0) {
      donor = existingDonors[0];
      // Optionally update the donor's name if it was different
      if (donor.name !== `${firstName} ${lastName}`) {
        await payload.update({
          collection: 'donors',
          id: donor.id,
          data: {
            name: `${firstName} ${lastName}`,
            stripeCustomerId: customer.id,
          },
        });
      }
    } else {
      // Create a new donor in Payload
      donor = await payload.create({
        collection: 'donors',
        data: {
          email: email,
          name: `${firstName} ${lastName}`,
          stripeCustomerId: customer.id,
          hasActiveSubscription: 'No',
        },
      });
    }

    if (!donor) {
      throw new Error('Failed to find or create donor.');
    }

    // 3. Use existing or create dynamic price
    let finalPriceId: string;
    let donationAmount = Number(donationDetails.donationFixedAmount);

    if (customAmount && !priceId) {
      // Create a dynamic price for custom amount
      donationAmount = Number(customAmount);

      // First, get or create a product for this project
      const products = await stripe.products.list({
        limit: 100,
      });

      let product = products.data.find(
        (p) => p.metadata?.projectType === projectType && p.metadata?.isDynamic === 'true',
      );

      if (!product) {
        product = await stripe.products.create({
          name: `${projectType} - Custom Recurring Donation`,
          metadata: {
            projectType: projectType,
            isDynamic: 'true',
          },
        });
      }

      // Create a new price for this custom amount
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(donationAmount * 100), // Convert to pence/cents
        currency: 'gbp',
        recurring: {
          interval: 'month',
        },
        metadata: {
          customAmount: 'true',
          projectType: projectType,
          amount: donationAmount.toString(),
        },
      });

      finalPriceId = price.id;
    } else if (priceId) {
      finalPriceId = priceId;
    } else {
      throw new Error('Could not determine price ID');
    }

    if (!finalPriceId) {
      throw new Error('Failed to get or create price ID');
    }

    // 4. Log the "Pending" Donation in Payload

    // Capitalize the donationType to match Payload collection options
    const formattedDonationType = donationType.charAt(0).toUpperCase() + donationType.slice(1);

    const donation = await payload.create({
      collection: 'donations',
      data: {
        // Donation Details
        project: donationDetails.projectType,
        supportType: donationDetails.supportType,
        amount: donationAmount,
        donationType: formattedDonationType,
        // User Details
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: userDetails.phoneNumber,
        country: userDetails.country,
        city: userDetails.city,
        address: userDetails.address,
        zipCode: userDetails.zipCode,
        comments: userDetails.comments,
        // Status
        status: 'pending',
        // Link to the donor
        donor: donor.id,
      },
    });

    // 5. Create setup intent
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
      usage: 'off_session',
      metadata: {
        priceId: finalPriceId,
        subscriptionFlow: 'true',
        donationId: donation.id,
        customAmount: customAmount ? 'true' : 'false',
        projectType: projectType,
        donationAmount: donationAmount.toString(),
      },
    });

    // 6. Return the client secret
    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
      setupIntentId: setupIntent.id,
      priceId: finalPriceId,
    });
  } catch (error: any) {
    console.error('Error creating setup intent:', error);
    return NextResponse.json(
      {
        error: 'Failed to create setup intent.',
        details: error.message,
      },
      { status: 500 },
    );
  }
};
