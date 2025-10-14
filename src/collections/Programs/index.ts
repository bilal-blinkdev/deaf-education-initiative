import { CollectionConfig } from 'payload';
import { ImageGrid } from '@/blocks/ImageGrid';
import { CardGrid } from '@/blocks/CardGrid';
import { formatSlug } from '@/utils/formatSlug';

export const Programs: CollectionConfig = {
  slug: 'programs',
  admin: {
    useAsTitle: 'title',
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
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image for Card', // Updated label for clarity
    },
    {
      name: 'shortDescription', // Renamed from 'excerpt'
      type: 'textarea',
      required: true,
      label: 'Short Description for Card', // Updated label for clarity
    },
    // ✅ This is the new field for your flexible page layouts
    {
      name: 'layout',
      label: 'Page Layout',
      type: 'blocks',
      minRows: 1,
      blocks: [ImageGrid, CardGrid],
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
