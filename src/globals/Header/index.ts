import { GlobalConfig } from 'payload';
import { linkFields } from '@/fields/linkFields';

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      label: 'Navigation Items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      admin: {
        components: {
          RowLabel: 'src/components/payload/LinkRowLabel.tsx',
        },
      },
      fields: [...linkFields],
    },
    {
      name: 'buttons',
      label: 'Buttons',
      type: 'array',
      maxRows: 2,
      admin: {
        components: {
          RowLabel: 'src/components/payload/LinkRowLabel.tsx',
        },
      },
      fields: [...linkFields],
    },
  ],
};
