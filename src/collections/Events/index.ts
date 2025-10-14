import { CollectionConfig } from 'payload/';
import { formatSlug } from '@/utils/formatSlug';

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'location'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
    {
      name: 'eventDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'time',
      type: 'text',
      label: 'Time (e.g., 3:00 pm - 5:00 pm)',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'registrationLink',
      type: 'text',
      label: 'Registration Link',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'location',
      type: 'group',
      label: 'Event Location',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Venue Name', // e.g., "BMA House"
          required: true,
        },
        {
          name: 'googleMapsEmbedUrl',
          type: 'textarea',
          label: 'Google Maps Embed URL',
          required: true,
          admin: {
            description:
              "Go to Google Maps, find the location, and click Share > Embed a map. Copy ONLY the URL from the 'src' attribute of the iframe code and paste it here.",
          },
          // Validation to ensure it's a valid URL
          validate: (value) => {
            if (!value) return true;
            try {
              new URL(value);
              return true;
            } catch (_) {
              return 'This is not a valid URL. Please make sure you copied only the URL from the src attribute.';
            }
          },
        },
      ],
    },
    {
      name: 'details', // For the single event page
      type: 'richText',
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
