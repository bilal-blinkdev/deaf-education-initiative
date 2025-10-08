import { linkFields } from '@/fields/linkFields';
import { GlobalConfig } from 'payload';

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Company Info & Socials',
          fields: [
            {
              name: 'tagline',
              type: 'text',
              required: true,
              defaultValue: 'Ensuring that every deaf child has access to literacy and learning!',
            },
            {
              name: 'socialLinks',
              type: 'group',
              fields: [
                { name: 'facebookUrl', type: 'text', label: 'Facebook URL' },
                { name: 'twitterUrl', type: 'text', label: 'Twitter URL' },
                { name: 'instagramUrl', type: 'text', label: 'Instagram URL' },
                { name: 'linkedinUrl', type: 'text', label: 'LinkedIn URL' },
                { name: 'youtubeUrl', type: 'text', label: 'YouTube URL' },
              ],
            },
          ],
        },
        {
          label: 'Navigation Menus',
          fields: [
            {
              name: 'navMenus',
              type: 'array',
              label: 'Menu Columns',
              admin: {
                components: {
                  RowLabel: 'src/components/payload/TitleRowLabel.tsx',
                },
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Column Title',
                  required: true,
                },
                {
                  name: 'links',
                  type: 'array',
                  label: 'Links',
                  minRows: 1,
                  admin: {
                    components: {
                      RowLabel: 'src/components/payload/LinkRowLabel.tsx',
                    },
                  },
                  fields: [...linkFields],
                },
              ],
            },
          ],
        },
        {
          label: 'Copyright',
          fields: [
            {
              name: 'copyrightText',
              type: 'text',
              required: true,
              defaultValue: 'Deaf Education Initiative, Org.',
            },
          ],
        },
      ],
    },
  ],
};
