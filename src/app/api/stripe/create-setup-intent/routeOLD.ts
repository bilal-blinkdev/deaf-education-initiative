// app/api/create-subscription/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers as getHeaders } from 'next/headers';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Payload } from 'payload';
import { Donor } from '@/payload-types';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const headers = await getHeaders();
  const payload: Payload = await getPayload({ config: await configPromise });
  const cookieStore = await cookies();
  const token = cookieStore.get('payload-token')?.value;

  try {
    // --- 1. Get the Logged-In User ---
    const { user } = await payload.auth({ headers });

    if (!user || user.collection !== 'donors') {
      return NextResponse.json({ error: 'You must be logged in to subscribe.' }, { status: 401 });
    }

    // --- 2. Get Data from the Frontend ---
    const { paymentMethodId, priceId } = await request.json();

    if (!user.stripeCustomerId) {
      // This check handles the case where the ID might be null or undefined
      return NextResponse.json(
        { error: 'Stripe Customer ID not found for this user.' },
        { status: 400 },
      );
    }

    // --- 3. Attach Payment Method to Customer ---
    // This securely associates the card with the customer in Stripe
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: user.stripeCustomerId,
    });

    // Set it as the default payment method for the subscription
    await stripe.customers.update(user.stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // --- 4. Create the Stripe Subscription ---
    const subscription = await stripe.subscriptions.create({
      customer: user.stripeCustomerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    // --- 5. Send Back the Client Secret ---
    const latestInvoice = subscription.latest_invoice as Stripe.Invoice;

    // Ensure the payment_intent object was expanded correctly
    if (!('payment_intent' in latestInvoice) || !latestInvoice.payment_intent) {
      throw new Error('Payment Intent not found in the invoice.');
    }

    const paymentIntent = latestInvoice.payment_intent as Stripe.PaymentIntent;

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      subscriptionId: subscription.id,
    });
  } catch (error: any) {
    console.error('Error creating subscription:', error.message);
    return NextResponse.json({ error: 'Failed to create subscription.' }, { status: 500 });
  }
}
