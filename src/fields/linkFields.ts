import { Field } from 'payload';

export const linkFields: Field[] = [
  {
    name: 'linkText',
    type: 'text',
    label: 'Text to Display',
    required: true,
  },
  {
    name: 'linkType',
    type: 'radio',
    options: [
      { label: 'Internal Page', value: 'internal' },
      { label: 'Custom URL', value: 'custom' },
    ],
    defaultValue: 'internal',
    required: true,
  },
  {
    name: 'internalPage',
    label: 'Page to Link To',
    type: 'relationship',
    relationTo: ['pages', 'programs', 'events'],
    required: true,
    filterOptions: () => {
      return {
        _status: { equals: 'published' },
      };
    },
    admin: {
      condition: (_, siblingData) => siblingData.linkType === 'internal',
    },
  },
  {
    name: 'customUrl',
    label: 'Custom URL',
    type: 'text',
    required: true,
    admin: {
      condition: (_, siblingData) => siblingData.linkType === 'custom',
    },
  },
  {
    name: 'openInNewTab',
    type: 'checkbox',
    label: 'Open in new tab?',
  },
];
