// src/collections/Subscriptions.ts

import type { CollectionConfig, PayloadRequest } from 'payload';
import { syncToStripe } from './hooks/syncToStripe';

export const Subscriptions: CollectionConfig = {
  slug: 'subscriptions',
  admin: {
    useAsTitle: 'planName',
    group: 'Fundraising', // Groups it with your other collections
    defaultColumns: ['planName', 'status', 'donor', 'planAmount'],
    components: {
      beforeList: [
        {
          path: '@/components/admin/ExportCSV#ExportCSV',
          clientProps: {
            collection: 'subscriptions',
            fieldOrder: [
              'id',
              'stripeSubscriptionID',
              'status',
              'planName',
              'planAmount',
              'planPeriod',
              'donor',
              'originalDonationEntry',
              'createdAt',
              'updatedAt',
            ],
          },
        },
      ],
    },
  },
  access: {
    // Webhooks will create, admins can read/update
    read: ({ req: { user } }) => !!user,
    create: () => true, // Allow API/webhooks to create
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'stripeSubscriptionID',
      label: 'Stripe Subscription ID',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Canceled', value: 'canceled' },
        { label: 'Past Due', value: 'past_due' },
        { label: 'Unpaid', value: 'unpaid' },
        // ... add other Stripe statuses as needed
      ],
      required: true,
      validate: (value: any, { req }: { req: PayloadRequest }) => {
        // Allow the webhook (which has no req.user) to set any status
        if (!req.user) {
          return true;
        }

        // Block an admin from manually setting these statuses
        if (value === 'past_due' || value === 'unpaid') {
          return "Status 'Past Due' and 'Unpaid' are set by Stripe automatically and cannot be set manually.";
        }

        // Allow all other changes (e.g., 'active' -> 'canceled')
        return true;
      },
    },
    {
      name: 'planName',
      label: 'Plan Name',
      type: 'text',
    },
    {
      name: 'planAmount',
      label: 'Plan Amount (£)',
      type: 'number',
    },
    {
      name: 'planPeriod',
      label: 'Plan Period',
      type: 'text', // e.g., 'month', 'year'
    },
    {
      name: 'donor',
      label: 'Donor',
      type: 'relationship',
      relationTo: 'donors',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'originalDonationEntry',
      label: 'Original Donation Entry',
      type: 'relationship',
      relationTo: 'donations',
      unique: true, // Each sub is created by one donation
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [syncToStripe],
  },
};
