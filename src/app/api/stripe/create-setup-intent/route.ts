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
    const { donationDetails, userDetails, priceId } = await req.json();
    if (!donationDetails || !userDetails || !priceId) {
      return NextResponse.json({ error: 'Email and Price ID ar requrired.' }, { status: 400 });
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
    console.log(donationDetails);

    // 3. Log the "Pending" Donation in Payload

    // Capitalize the donationType to match Payload collection options
    const formattedDonationType = donationType.charAt(0).toUpperCase() + donationType.slice(1);

    const donation = await payload.create({
      collection: 'donations',
      data: {
        // Donation Details
        project: donationDetails.projectType,
        supportType: donationDetails.supportType,
        amount: Number(donationDetails.donationFixedAmount), // Recurring uses fixed amount
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

    // 4. Create setup intent
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
      usage: 'off_session',
      metadata: {
        priceId: priceId,
        subscriptionFlow: 'true',
        donationId: donation.id,
      },
    });

    // 5. Return the client secret
    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
      setupIntentId: setupIntent.id,
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
