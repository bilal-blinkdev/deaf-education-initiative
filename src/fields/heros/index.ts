import type { Field } from 'payload';

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { linkGroup } from '../linkGroup';

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'simpleImage',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Simple Image',
          value: 'simpleImage',
        },
        {
          label: 'Donation Form',
          value: 'donationForm',
        },
      ],
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['simpleImage', 'donationForm'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
};
