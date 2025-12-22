import { CollectionConfig } from 'payload';

export const MailListSubscribers: CollectionConfig = {
  slug: 'mail-list-subscribers',
  admin: {
    useAsTitle: 'email',
    group: 'Mail List Subscribers',
    defaultColumns: ['email', 'firstName', 'createdAt'],
  },
  labels: {
    singular: 'Subscriber',
    plural: 'Subscribers',
  },
  access: {
    create: () => true, // Allow public API to create (for the form)
    read: ({ req: { user } }) => Boolean(user), // Only admins can read
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      label: 'Email Address',
    },
  ],
};
