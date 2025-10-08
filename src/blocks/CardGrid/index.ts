import { Block } from 'payload';
import { colorSelectorField } from '@/fields/colorSelector';
import { paddingField } from '@/fields/padding';

export const CardGrid: Block = {
  slug: 'cardGrid',
  interfaceName: 'CardGrid',
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
              defaultValue: 'More About Our Program',
            },
            {
              name: 'subheading',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'cards',
              type: 'array',
              label: 'Cards',
              minRows: 1,
              required: true,
              admin: {
                components: { RowLabel: 'src/components/payload/TitleRowLabel.tsx' },
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'iconType',
                  type: 'radio',
                  label: 'Icon Type',
                  options: [
                    { label: 'Select Predefined Icon', value: 'predefined' },
                    { label: 'Upload Custom Icon', value: 'custom' },
                  ],
                  defaultValue: 'predefined',
                },
                {
                  name: 'predefinedIcon',
                  label: 'Icon',
                  type: 'select',
                  options: ['GraduationCap', 'Monitor', 'SheetSigning'],
                  admin: {
                    condition: (_, siblingData) => siblingData.iconType === 'predefined',
                  },
                },
                {
                  name: 'customIcon',
                  label: 'Icon',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    condition: (_, siblingData) => siblingData.iconType === 'custom',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
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
              type: 'group',
              label: 'Color Overrides',
              fields: [
                colorSelectorField({
                  name: 'backgroundColor',
                  label: 'Background Color',
                }),
                colorSelectorField({
                  name: 'headingColor',
                  label: 'Heading Color',
                }),
                colorSelectorField({
                  name: 'descriptionColor',
                  label: 'Description Color',
                }),
                colorSelectorField({
                  name: 'cardTitleColor',
                  label: 'Card Title Color',
                }),
                colorSelectorField({
                  name: 'cardDescriptionColor',
                  label: 'Card Description Color',
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
};
