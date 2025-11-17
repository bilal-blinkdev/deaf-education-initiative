// src/endpoints/stripeWebhook.ts
import Stripe from 'stripe';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Donor } from '@/payload-types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/**
 * A helper function to update the "summary" status on the main Donor doc.
 */
async function updateDonorSummaryStatus(payload: any, donorId: string) {
  try {
    // Find all "active" subscriptions for this donor
    const { docs: activeSubscriptions } = await payload.find({
      collection: 'subscriptions',
      where: {
        donor: { equals: donorId },
        status: { equals: 'active' },
      },
      limit: 1,
    });

    // If any active sub is found, mark the donor as 'active'
    // Otherwise, mark as 'none' (or 'canceled', etc.)
    const newStatus = activeSubscriptions.length > 0 ? 'Yes' : 'No';

    await payload.update({
      collection: 'donors',
      id: donorId,
      data: {
        hasActiveSubscription: newStatus,
      },
    });
  } catch (error) {
    console.error(`Error updating summary status for donor ${donorId}:`, error);
  }
}

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
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const donationId = paymentIntent.metadata.donationId;

        if (donationId) {
          // Mark the donation as "Complete" in Payload
          await payload.update({
            collection: 'donations',
            id: donationId,
            data: {
              status: 'complete',
            },
          });
        }
        break;
      }
      case 'setup_intent.succeeded':
        const setupIntent = event.data.object as Stripe.SetupIntent;

        // Ensure this is from our subscription flow
        if (setupIntent.metadata?.subscriptionFlow === 'true') {
          const customerId = setupIntent.customer as string;
          const paymentMethodId = setupIntent.payment_method as string;
          const priceId = setupIntent.metadata.priceId;
          const donationId = setupIntent.metadata.donationId;

          if (!customerId || !paymentMethodId || !priceId || !donationId) {
            throw new Error('Missing required data in SetupIntent metadata.');
          }

          // 1. Find the original "Donation" doc to get plan details
          const originalDonationDoc = await payload.findByID({
            collection: 'donations',
            id: donationId,
          });
          if (!originalDonationDoc) {
            throw new Error(`Donation doc ${donationId} not found.`);
          }

          let donorId: string;
          if (typeof originalDonationDoc.donor === 'object' && originalDonationDoc.donor !== null) {
            donorId = (originalDonationDoc.donor as Donor).id;
          } else if (typeof originalDonationDoc.donor === 'string') {
            donorId = originalDonationDoc.donor;
          } else {
            // This handles the `undefined` case that TypeScript was warning about.
            throw new Error(
              `[Webhook Error] Donation doc ${donationId} is missing its donor relationship. Cannot proceed.`,
            );
          }

          // 2. Set the new payment method as the customer's default
          await stripe.customers.update(customerId, {
            invoice_settings: {
              default_payment_method: paymentMethodId,
            },
          });

          // 3. Create the Stripe subscription
          const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            off_session: true,
            // Add metadata to link it back
            metadata: {
              payloadDonationId: donationId,
              payloadDonorId: donorId,
            },
          });

          // 4. Create a new "Subscription" in payload
          await payload.create({
            collection: 'subscriptions',
            data: {
              stripeSubscriptionID: subscription.id,
              status: subscription.status as 'active',
              planName: originalDonationDoc.project,
              planAmount: originalDonationDoc.amount,
              planPeriod:
                originalDonationDoc.supportType === 'Recurring' ? 'month/year' : 'one-time', // You can refine this
              donor: donorId,
              originalDonationEntry: donationId,
            },
          });

          // 5. Mark the donation as "Complete" in Payload
          await payload.update({
            collection: 'donations',
            id: donationId,
            data: {
              status: 'complete',
            },
          });

          // 6. Find the corresponding donor in your database
          const { docs: donors } = await payload.find({
            collection: 'donors',
            where: {
              stripeCustomerId: { equals: customerId },
            },
          });

          // Update the donor's status in Payload
          if (donors.length > 0) {
            const donor = donors[0];
            await payload.update({
              collection: 'donors',
              id: donor.id,
              data: {
                hasActiveSubscription: 'Yes',
              },
            });
          }
        }
        break;

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription;

        // Find the subscription in Payload by its Stripe ID
        const { docs: subsToUpdate } = await payload.find({
          collection: 'subscriptions',
          where: {
            stripeSubscriptionID: { equals: subscription.id },
          },
          limit: 1,
        });

        if (subsToUpdate.length > 0) {
          const subToUpdate = subsToUpdate[0];

          // 1. Update the individual Subscription doc
          await payload.update({
            collection: 'subscriptions',
            id: subToUpdate.id,
            data: {
              status: subscription.status as 'active' | 'canceled' | 'past_due',
            },
          });

          // 2. Update the parent Donor's summary status
          let donorId: string;
          if (typeof subToUpdate.donor === 'object' && subToUpdate.donor !== null) {
            donorId = (subToUpdate.donor as Donor).id;
          } else if (typeof subToUpdate.donor === 'string') {
            donorId = subToUpdate.donor;
          } else {
            throw new Error(
              `[Webhook Error] Subscription doc ${subToUpdate.id} is missing its donor relationship. Cannot update summary status.`,
            );
          }
          await updateDonorSummaryStatus(payload, donorId);
        }
        break;

      // case 'customer.subscription.deleted':
      //   await payload.update({
      //     collection: 'donors',
      //     where: {
      //       stripeCustomerId: { equals: customerId },
      //     },
      //     data: {
      //       subscriptionStatus: 'canceled',
      //     },
      //   });
      //   break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error('Error handling webhook event:', error);
    return new Response('Error processing webhook.', { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
