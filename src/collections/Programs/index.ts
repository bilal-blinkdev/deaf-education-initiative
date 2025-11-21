import { CollectionConfig } from 'payload';
import { ImageGrid } from '@/blocks/ImageGrid';
import { CardGrid } from '@/blocks/CardGrid';
import { formatSlug } from '@/utils/formatSlug';
import { DonationForm } from '@/blocks/DonationForm';
import { hero } from '@/fields/heros';
import { PageIntro } from '@/blocks/PageIntro';

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
      type: 'tabs',
      tabs: [
        {
          label: 'Card',
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Card Featured Image',
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              required: true,
              label: 'Card Short Description',
            },
          ],
        },
        { label: 'Hero', fields: [hero] },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              label: 'Page Layout',
              type: 'blocks',
              minRows: 1,
              blocks: [PageIntro, ImageGrid, CardGrid, DonationForm],
            },
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
