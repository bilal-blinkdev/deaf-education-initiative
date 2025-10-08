import { Block } from 'payload';

export const ImageGrid: Block = {
  slug: 'imageGrid',
  interfaceName: 'ImageGrid',
  fields: [
    {
      name: 'imageText',
      type: 'textarea',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      label: 'Grid Images',
      minRows: 4,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
};
