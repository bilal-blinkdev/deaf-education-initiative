// components/blocks/RenderBlocks.tsx
import React from 'react';
import { Page } from '@/payload-types';
import KeyMetrics from '@/components/blocks/KeyMetrics2';
import CardGrid from '@/components/blocks/CardGrid';

type LayoutBlock = NonNullable<Page['layout']>[number];

type RenderBlocksProps = {
  blocks: LayoutBlock[];
};

export const RenderBlocks: React.FC<RenderBlocksProps> = ({ blocks }) => {
  return (
    <>
      {blocks.map((block, index) => {
        const { blockType } = block;

        switch (blockType) {
          case 'keyMetrics':
            return <KeyMetrics key={index} keyMetrics={block} />;
          case 'cardGrid':
            return <CardGrid key={index} cardGrid={block} />;
          default:
            return null;
        }
      })}
    </>
  );
};
