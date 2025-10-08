import type { CollectionConfig } from 'payload';
import syncDonorWithStripe from './hooks/syncDonorWithStripe';

export const Donors: CollectionConfig = {
  slug: 'donors',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    // tokenExpiration: 12 * 60 * 60,
    // verify: true,
    cookies: {
      secure: true,
      sameSite: 'None',
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  access: {
    create: () => false,
    admin: () => false,
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      name: 'stripeCustomerId',
      label: 'Stripe Customer ID',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'subscriptionStatus',
      label: 'Subscription Status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Canceled', value: 'canceled' },
        { label: 'Incomplete', value: 'incomplete' },
        { label: 'Incomplete Expired', value: 'incomplete_expired' },
        { label: 'Past Due', value: 'past_due' },
        { label: 'Trialing', value: 'trialing' },
        { label: 'Unpaid', value: 'unpaid' },
        { label: 'Paused', value: 'paused' },
        { label: 'None', value: 'none' },
      ],
      defaultValue: 'none',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [syncDonorWithStripe],
  },
};
