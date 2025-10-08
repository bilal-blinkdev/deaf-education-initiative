// app/api/create-subscription/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Donor } from '@/payload-types';
import { authenticatedRoute } from '@/app/lib/server/protect-route';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = authenticatedRoute(
  async ({ req, user: donor }: { req: Request; user: Donor }) => {
    try {
      if (!donor.stripeCustomerId) {
        return NextResponse.json(
          { error: 'Stripe Customer ID not found for this user.' },
          { status: 400 },
        );
      }

      const { priceId } = await req.json();

      console.log('Creating subscription for customer:', donor.stripeCustomerId);
      console.log('Price ID:', priceId);

      // Alternative approach: Create a SetupIntent for recurring payments
      // This is more reliable than relying on subscription payment_intent expansion
      const setupIntent = await stripe.setupIntents.create({
        customer: donor.stripeCustomerId,
        automatic_payment_methods: {
          enabled: true,
        },
        usage: 'off_session',
        metadata: {
          priceId: priceId,
          subscriptionFlow: 'true',
        },
      });

      console.log('Setup intent created:', setupIntent.id);
      console.log('Client secret exists:', !!setupIntent.client_secret);

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
  },
);
