import { colorSelectorField } from '@/fields/colorSelector';
import { paddingField } from '@/fields/padding';
import { Block } from 'payload';

export const KeyMetrics: Block = {
  slug: 'keyMetrics',
  interfaceName: 'KeyMetricsBlock',
  labels: {
    singular: 'Key Metric',
    plural: 'Key Metrics',
  },
  // admin: {
  //   components: {
  //     Label: 'src/components/payload/HeadingRowLabel.tsx',
  //   },
  // },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'metrics',
              type: 'array',
              label: 'Metrics',
              minRows: 1,
              required: true,
              admin: {
                components: { RowLabel: 'src/components/payload/TextRowLabel.tsx' },
              },
              fields: [
                {
                  name: 'iconType',
                  type: 'radio',
                  label: 'Icon Type',
                  options: [
                    { label: 'Select Predefined Icon', value: 'predefined' },
                    { label: 'Upload Custom Icon', value: 'custom' },
                  ],
                  defaultValue: 'predefined',
                  required: true,
                },
                {
                  name: 'predefinedIcon',
                  label: 'Icon',
                  type: 'select',
                  options: ['Student', 'Employees', 'Teacher', 'PeopleChatting', 'Globe'],
                  required: true,
                  admin: {
                    // Only show this field if 'predefined' is selected
                    condition: (_, siblingData) => siblingData.iconType === 'predefined',
                  },
                },
                {
                  name: 'customIcon',
                  label: 'Icon',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  admin: {
                    // Only show this field if 'custom' is selected
                    condition: (_, siblingData) => siblingData.iconType === 'custom',
                  },
                },
                { name: 'numbers', type: 'text', required: true },
                { name: 'text', type: 'text', required: true },
              ],
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
