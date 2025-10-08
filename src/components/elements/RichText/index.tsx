// src/components/elements/RichText/index.tsx

import React, { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import escapeHTML from 'escape-html';

// ✅ Import your custom components
import Heading from '@/components/elements/Heading';
import Paragraph from '@/components/elements/Paragraph';
import Blockquote from '../BlockQuote';

// Define a basic type for Lexical nodes
type LexicalNode = {
  type: string;
  children?: LexicalNode[];
  direction?: 'ltr' | 'rtl' | null;
  format?: 'left' | 'center' | 'right' | 'justify' | '' | number | null;
  indent?: number;
  version?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  listType?: 'bullet' | 'check' | 'number';
  start?: number;
  fields?: { url: string; newTab?: boolean; [key: string]: unknown };
  value?: { id: string; url: string; width: number; height: number; alt: string };
  text?: string;
  style?: string;
  mode?: 'normal' | 'token';
};

// A type guard for Heading levels
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
function isHeadingLevel(level: number): level is HeadingLevel {
  return [1, 2, 3, 4, 5, 6].includes(level);
}

const serializeLexical = (children: LexicalNode[]): React.ReactNode => {
  if (!children) return null;

  return children.map((node, i) => {
    if (node.type === 'text') {
      let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text || '') }} />;
      if (typeof node.format === 'number') {
        if (node.format & 1) text = <strong key={i}>{text}</strong>;
        if (node.format & 2) text = <em key={i}>{text}</em>;
        if (node.format & 8) text = <u key={i}>{text}</u>;
      }
      return <Fragment key={i}>{text}</Fragment>;
    }

    switch (node.type) {
      case 'heading':
        const levelNumber = parseInt(node.tag?.replace('h', '') || '1', 10);
        const level = isHeadingLevel(levelNumber) ? levelNumber : 1;
        const align = typeof node.format === 'string' && node.format !== '' ? node.format : 'left';

        return (
          <Heading level={level} align={align} key={i}>
            {serializeLexical(node.children || [])}
          </Heading>
        );

      case 'paragraph':
        const pAlign = typeof node.format === 'string' && node.format !== '' ? node.format : 'left';

        return (
          <Paragraph align={pAlign} key={i}>
            {serializeLexical(node.children || [])}
          </Paragraph>
        );

      case 'quote':
        return <Blockquote key={i}>{serializeLexical(node.children || [])}</Blockquote>;

      case 'list':
        const ListTag = node.listType === 'number' ? 'ol' : 'ul';
        return <ListTag key={i}>{serializeLexical(node.children || [])}</ListTag>;

      case 'listitem':
        return <li key={i}>{serializeLexical(node.children || [])}</li>;

      case 'link':
      case 'autolink':
        return (
          <Link
            href={node.fields?.url || '#'}
            target={node.fields?.newTab ? '_blank' : '_self'}
            rel="noopener noreferrer"
            key={i}
          >
            {serializeLexical(node.children || [])}
          </Link>
        );

      case 'upload':
        const { value: image } = node;
        if (image?.url) {
          return (
            <figure key={i}>
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                alt={image.alt || 'Embedded image'}
              />
              {image.alt && <figcaption>{image.alt}</figcaption>}
            </figure>
          );
        }
        return null;

      default:
        return node.children ? (
          <Fragment key={i}>{serializeLexical(node.children)}</Fragment>
        ) : null;
    }
  });
};

const RichText = ({ content }: { content: { root: { children: LexicalNode[] } } }) => {
  if (!content?.root?.children) {
    return null;
  }
  return <>{serializeLexical(content.root.children)}</>;
};

export default RichText;
