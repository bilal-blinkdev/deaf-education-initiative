import Link from 'next/link';
import React from 'react';
import { Page, Program, Event, Publication } from '@/payload-types';

// Define a type for the link object coming from Payload
type LinkType = {
  linkText: string;
  linkType: 'internal' | 'custom';
  internalPage?: {
    relationTo: 'pages' | 'programs' | 'events' | 'publications';
    value: Page | Program | Event | Publication | string;
  } | null;
  customUrl?: string | null;
  openInNewTab?: boolean | null;
};

type SmartLinkProps = {
  link: LinkType;
  children?: React.ReactNode;
  className?: string;
};

// This helper function builds the correct URL path
const generateHref = (doc: LinkType['internalPage']): string => {
  if (!doc || typeof doc.value !== 'object') return '#';
  const { relationTo, value } = doc;
  const slug = value.slug;

  switch (relationTo) {
    case 'pages':
      return `/${slug}`;
    case 'programs':
      return `/our-programs/${slug}`;
    case 'events':
      return `/our-events/${slug}`;
    case 'publications':
      return `/our-publications/${slug}`;
    default:
      return '#';
  }
};

export default function SmartLink({ link, children, className }: SmartLinkProps) {
  let href = '#';

  if (link.linkType === 'internal') {
    href = generateHref(link.internalPage);
  } else {
    href = link.customUrl || '#';
  }

  return (
    <Link
      href={href}
      className={className}
      target={link.openInNewTab ? '_blank' : '_self'}
      rel={link.openInNewTab ? 'noopener noreferrer' : ''}
    >
      {children || link.linkText}
    </Link>
  );
}
