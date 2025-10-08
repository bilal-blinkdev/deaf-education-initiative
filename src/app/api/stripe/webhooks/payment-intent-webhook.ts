import { headers as getHeaders } from 'next/headers';
import { NextResponse } from 'next/server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const paymentIntentWebhook = async (req: Request) => {
  let event;

  try {
    const sig = (await getHeaders()).get('stripe-signature');
    const body = await req.text();

    if (!sig) {
      return new Response('No stripe-signature header found.', { status: 400 });
    }

    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    const errorMessage = (error as Error).message;

    if (error) console.error(error);
    return NextResponse.json(
      {
        message: `Webhook Error: ${errorMessage}`,
      },
      { status: 400 },
    );
  }

  const permittedEvents = ['payment_intent.succeeded'];

  if (permittedEvents.includes(event.type)) {
    let data;

    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          data = event.data.object;
          console.log(`Payment status: ${data.status}`);
          break;

        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          message: 'Webhook handler failed',
        },
        { status: 400 },
      );
    }
    return NextResponse.json({ message: 'Received' }, { status: 200 });
  }
};
