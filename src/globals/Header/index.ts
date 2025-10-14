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
          RowLabel: 'src/components/payload/TitleRowLabel.tsx',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Navigation Item Title',
          required: true,
        },
        {
          name: 'hasSubMenu',
          type: 'checkbox',
          label: 'Enable Dropdown Menu?',
        },

        // --- Fields for a SIMPLE LINK (shown when hasSubMenu is false) ---
        {
          name: 'linkType',
          type: 'radio',
          options: [
            { label: 'Internal Page', value: 'internal' },
            { label: 'Custom URL', value: 'custom' },
          ],
          defaultValue: 'internal',
          required: true,
          admin: { condition: (_, siblingData) => !siblingData.hasSubMenu },
        },
        {
          name: 'internalPage',
          label: 'Page to Link To',
          type: 'relationship',
          relationTo: ['pages', 'programs', 'events', 'publications'],
          required: true,
          filterOptions: () => {
            return {
              _status: { equals: 'published' },
            };
          },
          admin: {
            condition: (_, siblingData) =>
              !siblingData.hasSubMenu && siblingData.linkType === 'internal',
          },
        },
        {
          name: 'customUrl',
          label: 'Custom URL',
          type: 'text',
          required: true,
          admin: {
            condition: (_, siblingData) =>
              !siblingData.hasSubMenu && siblingData.linkType === 'custom',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in new tab?',
          admin: { condition: (_, siblingData) => !siblingData.hasSubMenu },
        },

        // --- Field for a DROPDOWN (shown when hasSubMenu is true) ---
        {
          name: 'subMenu',
          label: 'Sub Menu Links',
          type: 'array',
          minRows: 1,
          admin: {
            condition: (_, siblingData) => siblingData.hasSubMenu,
            components: {
              RowLabel: 'src/components/payload/LinkRowLabel.tsx',
            },
          },
          fields: [
            ...linkFields, // The sub-menu items still need the full link fields
          ],
        },
      ],
      // fields: [...linkFields],
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
