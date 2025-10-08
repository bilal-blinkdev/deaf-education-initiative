// src/endpoints/stripeWebhook.ts
import Stripe from 'stripe';
import { getPayload } from 'payload';
import config from '@payload-config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  if (!webhookSecret) {
    console.error('Stripe webhook secret is not configured.');
    return new Response('Webhook secret is not configured.', { status: 500 });
  }

  const sig = req.headers.get('stripe-signature');
  const body = await req.text(); // Read the raw body as text
  let event: Stripe.Event;

  if (!sig) {
    return new Response('No stripe-signature header found.', { status: 400 });
  }

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const subscription = event.data.object as Stripe.Subscription;
  const customerId = subscription.customer as string;

  try {
    const payload = await getPayload({ config });
    switch (event.type) {
      case 'setup_intent.succeeded':
        const setupIntent = event.data.object as Stripe.SetupIntent;

        // Ensure this is from our subscription flow
        if (setupIntent.metadata?.subscriptionFlow === 'true') {
          const customerId = setupIntent.customer as string;
          const paymentMethodId = setupIntent.payment_method as string;
          const priceId = setupIntent.metadata.priceId;

          if (!customerId || !paymentMethodId || !priceId) {
            throw new Error('Missing required data in SetupIntent metadata.');
          }

          // Find the corresponding donor in your database
          const { docs: donors } = await payload.find({
            collection: 'donors',
            where: {
              stripeCustomerId: { equals: customerId },
            },
          });
          console.log('DONORS: ', donors);

          if (donors.length === 0) throw new Error('Donor not found.');
          const donor = donors[0];

          // Set the new payment method as the customer's default
          await stripe.customers.update(customerId, {
            invoice_settings: {
              default_payment_method: paymentMethodId,
            },
          });

          // CREATE THE SUBSCRIPTION
          await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            // This charges the default payment method immediately
            off_session: true,
          });

          // Update the donor's status in Payload
          await payload.update({
            collection: 'donors',
            id: donor.id,
            data: {
              subscriptionStatus: 'active',
            },
          });
        }
        break;

      case 'customer.subscription.updated':
      case 'customer.subscription.created':
        await payload.update({
          collection: 'donors',
          where: {
            stripeCustomerId: { equals: customerId },
          },
          data: {
            subscriptionStatus: subscription.status,
          },
        });
        break;

      case 'customer.subscription.deleted':
        await payload.update({
          collection: 'donors',
          where: {
            stripeCustomerId: { equals: customerId },
          },
          data: {
            subscriptionStatus: 'canceled',
          },
        });
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error('Error handling webhook event:', error);
    return new Response('Error processing webhook.', { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
