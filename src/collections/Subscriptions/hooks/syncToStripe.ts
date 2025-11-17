// src/collections/Subscriptions/hooks/syncToStripe.ts

import type { CollectionAfterChangeHook } from 'payload';
import Stripe from 'stripe';
import { Subscription } from '@/payload-types'; // Import your type

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * This hook syncs a manual cancellation from Payload *back* to Stripe.
 */
export const syncToStripe: CollectionAfterChangeHook<Subscription> = async ({
  doc, // The full document *after* the change
  previousDoc, // The full document *before* the change
  operation,
}) => {
  // We only care about updates
  if (operation !== 'update') {
    return doc; // Return the doc to avoid breaking the hook chain
  }

  // --- HANDLE CANCEL ---
  // If user manually changed status from 'active' to 'canceled'
  if (doc.status === 'canceled' && previousDoc.status === 'active') {
    try {
      // This permanently deletes the subscription in Stripe
      await stripe.subscriptions.cancel(doc.stripeSubscriptionID);
      console.log(`[Payload] Canceled Stripe subscription ${doc.stripeSubscriptionID}`);
    } catch (error: any) {
      console.error(
        `[Payload] Error canceling Stripe sub ${doc.stripeSubscriptionID}:`,
        error.message,
      );
      // Note: We don't throw an error, as that would fail the save
      // in the Payload admin.
    }
  }

  // Return the doc to complete the hook
  return doc;
};
