import type { CollectionConfig } from 'payload';
// import syncDonorWithStripe from './hooks/syncDonorWithStripe';

export const Donors: CollectionConfig = {
  slug: 'donors',
  admin: {
    useAsTitle: 'email',
    group: 'Fundraising',
    defaultColumns: ['name', 'email', 'hasActiveSubscription'],
    components: {
      beforeList: [
        {
          path: '@/components/admin/ExportCSV#ExportCSV',
          clientProps: {
            collection: 'donors',
            fieldOrder: [
              'id',
              'name',
              'email',
              'stripeCustomerId',
              'hasActiveSubscription',
              'createdAt',
              'updatedAt',
            ],
          },
        },
      ],
    },
  },
  access: {
    read: () => true,
    create: () => false,
    update: () => true, // Allow webhooks to update status
    delete: () => false,
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      admin: {
        readOnly: true,
      },
      unique: true,
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
      name: 'hasActiveSubscription',
      label: 'Has Active Subscription',
      type: 'select',
      options: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
      ],
      defaultValue: 'No',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
  // hooks: {
  //   afterChange: [syncDonorWithStripe],
  // },
};
