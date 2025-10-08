import { Donor } from '@/payload-types';
import { PayloadRequest } from 'payload';
import Stripe from 'stripe';

type HookProps = {
  doc: Donor;
  req: PayloadRequest;
  operation: 'create' | 'update';
};
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// This hook will run after a user is created
export default async function syncDonorWithStripe({ doc, req, operation }: HookProps) {
  // We only want this to run when a user is first created
  if (operation === 'create' && !doc.stripeCustomerId) {
    try {
      const customer = await stripe.customers.create({
        email: doc.email,
      });

      // Update the user in Payload with the new Stripe Customer ID
      await req.payload.update({
        collection: 'donors',
        id: doc.id,
        data: {
          stripeCustomerId: customer.id,
        },
      });
    } catch (error) {
      console.error('Error creating Stripe customer:', error);
    }
  }
  console.log('CREATED');

  return doc;
}
