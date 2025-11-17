import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import Stripe from 'stripe';
import config from '@payload-config';
import { Donor } from '@/payload-types';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { donationDetails, userDetails, amount } = await request.json();

    if (!amount || !donationDetails || !userDetails) {
      return NextResponse.json({ error: 'Missing required donation details.' }, { status: 400 });
    }

    if (!amount || amount < 100) {
      // Stripe requires a minimum amount (e.g., 100 pence/cents)
      return NextResponse.json({ error: 'A valid amount is required.' }, { status: 400 });
    }

    const payload = await getPayload({ config });

    const { email, firstName, lastName, ...restUserDetails } = userDetails;
    const { projectType, supportType, donationType, ...restDonationDetails } = donationDetails;

    // 1. Find or Create a Stripe Customer
    let customer: Stripe.Customer;
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

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

    // 3. Log the "Pending" Donation in Payload

    // Capitalize the donationType to match Payload collection options
    const formattedDonationType = donationType.charAt(0).toUpperCase() + donationType.slice(1);
    const donation = await payload.create({
      collection: 'donations',
      data: {
        // Donation Details
        project: donationDetails.projectType,
        supportType: donationDetails.supportType,
        amount: amount / 100, // Convert from pence/cents back to pounds/dollars
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
        // Link to donor
        donor: donor.id,
      },
    });

    // 4. Create a PaymentIntent, passing the new donation ID in the metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'gbp',
      automatic_payment_methods: { enabled: true },
      receipt_email: email,
      metadata: {
        donationId: donation.id,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: `Internal Server Error ${error}` }, { status: 500 });
  }
}
