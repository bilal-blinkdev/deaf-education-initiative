import { CollectionConfig } from 'payload';
import { populatePublishedAt } from '@/hooks/populatePublishedAt';

export const Publications: CollectionConfig = {
  slug: 'publications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedDate'],
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
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'reportDocuments',
      label: 'Report Documents (1-3 PDFs)', // Updated label
      type: 'array',
      minRows: 1,
      maxRows: 3, // Changed to 3
      required: true,
      admin: {
        components: { RowLabel: 'src/components/payload/TitleRowLabel.tsx' },
      },
      fields: [
        {
          name: 'document',
          label: 'PDF Document',
          type: 'upload',
          relationTo: 'media',
          required: true,
          filterOptions: {
            mimeType: { equals: 'application/pdf' },
          },
        },
        {
          name: 'title',
          label: 'Button Label / Title for PDF',
          type: 'text',
          required: true,
        },
        {
          name: 'allowDownload',
          label: 'Allow Download?',
          type: 'checkbox',
          defaultValue: false, // Default to not allowing download
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Temporary field - will be removed',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
  },
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
