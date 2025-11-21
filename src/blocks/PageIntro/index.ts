import { Block } from 'payload';

export const PageIntro: Block = {
  slug: 'pageIntro',
  interfaceName: 'PageIntro',
  labels: {
    singular: 'Page Intro',
    plural: 'Page Intros',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'overline',
              label: 'Overline (Top Label)',
              type: 'text',
            },
            {
              name: 'title',
              label: 'Main Heading',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Styling',
          fields: [
            {
              name: 'alignment',
              label: 'Text Alignment',
              type: 'select',
              defaultValue: 'center',
              options: [
                { label: 'Center', value: 'center' },
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'overlineColor',
                  type: 'select',
                  label: 'Overline Color',
                  defaultValue: 'var(--dodger-blue)',
                  options: [
                    { label: 'Blue', value: 'var(--dodger-blue)' },
                    { label: 'Brown', value: 'var(--sandy-brown)' },
                    { label: 'Dark', value: 'var(--dark-blue)' },
                    { label: 'Black', value: 'var(--black)' },
                  ],
                },
                {
                  name: 'headingColor',
                  type: 'select',
                  label: 'Heading Color',
                  defaultValue: 'var(--dark-blue)', // Default to your dark text color
                  options: [
                    { label: 'Dark', value: 'var(--dark-blue)' },
                    { label: 'Black', value: 'var(--black)' },
                    { label: 'White', value: 'var(--white)' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
