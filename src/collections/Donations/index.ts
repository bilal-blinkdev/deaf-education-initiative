import type { CollectionConfig } from 'payload';

export const Donations: CollectionConfig = {
  slug: 'donations',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'project', 'amount', 'status'],
  },
  access: {
    // We'll create these programmatically, so lock down the admin UI
    // to prevent accidental creation or deletion.
    read: () => true, // Allow admins to read all donations
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    // Step 1: Donation Details
    {
      name: 'project',
      label: 'Project',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'supportType',
      label: 'Support Type',
      type: 'select',
      options: ['Give Once', 'Recurring'],
      admin: { readOnly: true },
    },
    {
      name: 'amount',
      label: 'Amount',
      type: 'number',
      admin: { readOnly: true },
    },
    {
      name: 'donationType',
      label: 'Donation Type',
      type: 'select',
      options: ['Zakat', 'Donation'],
      admin: { readOnly: true },
    },

    // Step 2: User Details
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      admin: { readOnly: true },
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'country',
      label: 'Country',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'zipCode',
      label: 'Zip/Postal Code',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'comments',
      label: 'Comments',
      type: 'textarea',
      admin: { readOnly: true },
    },

    // Status and Relationship
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Complete', value: 'complete' },
        { label: 'Failed', value: 'failed' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'donor',
      label: 'Donor',
      type: 'relationship',
      relationTo: 'donors', // Links to your existing 'donors' collection
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
};
