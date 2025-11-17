import type { CollectionConfig } from 'payload';

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    group: 'Fundraising',
    defaultColumns: ['name', 'amountOptions'],
  },
  labels: {
    singular: 'Funding Plan',
    plural: 'Funding Plans',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      label: 'Project Name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'hint',
      label: 'Hint Text',
      type: 'text',
      admin: {
        description: 'A short, helpful message shown below the project dropdown.',
      },
    },
    {
      name: 'amountOptions',
      label: 'Amount Options',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        components: {
          RowLabel: 'src/components/payload/AmountRowLabel.tsx',
        },
      },
      fields: [
        {
          name: 'id',
          label: 'Stripe Price ID',
          type: 'text',
          required: true,
          admin: {
            description: 'Copy the `price_...` ID from your Stripe Dashboard.',
          },
        },
        {
          name: 'symbol',
          label: 'Currency Symbol',
          type: 'text',
          defaultValue: '£',
          required: true,
        },
        {
          name: 'amount',
          label: 'Amount',
          type: 'number', // Use number for better validation
          required: true,
        },
        {
          name: 'period',
          label: 'Period',
          type: 'text',
          admin: {
            description: 'e.g., "month", "year", "setup school". Leave blank for one-time.',
          },
        },
      ],
    },
  ],
};
