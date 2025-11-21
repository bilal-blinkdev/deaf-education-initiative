import { colorSelectorField } from '@/fields/colorSelector';
import { paddingField } from '@/fields/padding';
import { Block } from 'payload';

export const DonationForm: Block = {
  slug: 'donationForm',
  interfaceName: 'DonationForm',
  // labels: {
  //   singular: 'Donation Section',
  //   plural: 'Donation Sections',
  // },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              label: 'Section Title (Optional)',
              type: 'text',
              defaultValue: 'Make a Donation',
            },
          ],
        },
        {
          label: 'Styling',
          fields: [
            {
              type: 'row',
              fields: [
                paddingField({
                  name: 'paddingTop',
                  label: 'Top Padding',
                }),
                paddingField({
                  name: 'paddingBottom',
                  label: 'Bottom Padding',
                }),
              ],
            },
            {
              name: 'colors',
              label: 'Color Overrides (Optional)',
              type: 'group',
              fields: [
                colorSelectorField({
                  name: 'mainBackgroundColor',
                  label: 'Main Background Color',
                }),
                colorSelectorField({
                  name: 'headingTextColor',
                  label: 'Heading Text Color',
                }),
                colorSelectorField({
                  name: 'descriptionTextColor',
                  label: 'Description Text Color',
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
};
