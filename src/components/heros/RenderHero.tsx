import React from 'react';

import type { Page } from '@/payload-types';

import DonationForm from './DonationForm';
import { SimpleImage } from './SimpleImage';

const heroes = {
  simpleImage: SimpleImage,
  donationForm: DonationForm,
};

export const RenderHero: React.FC<Page['hero'] & { slug?: string }> = (props) => {
  const { type, slug } = props || {};

  if (!type || type === 'none') return null;

  const HeroToRender = heroes[type];

  if (!HeroToRender) return null;

  return <HeroToRender {...props} slug={slug} />;
};
