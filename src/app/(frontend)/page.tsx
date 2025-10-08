import { headers as getHeaders } from 'next/headers.js';
import { getPayload } from 'payload';
import React from 'react';
import { fileURLToPath } from 'url';
import config from '@/payload.config';

import MainBanner from '@/components/blocks/MainBanner';
import KeyMetrics from '@/components/blocks/KeyMetrics';
import Cards from '@/components/blocks/Cards';
import CardsSlider, { Card } from '@/components/blocks/CardsSlider';
import TestimonialSlider from '@/components/blocks/TestimonialSlider';
import TwoColumnCard from '@/components/blocks/TwoColumnCard';
import LogoSlider from '@/components/blocks/LogoSlider';
import Subscription from '@/components/blocks/Subscription';

import Student from '@/graphics/Student';
import Employees from '@/graphics/Employees';
import Teacher from '@/graphics/Teacher';
import PeopleChatting from '@/graphics/PeopleChatting';
import Globe from '@/graphics/Globe';
import { fetchPrograms } from './our-programs/page';
import { notFound } from 'next/navigation';

export default async function HomePage() {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;

  const programs = await fetchPrograms();
  if (!programs) {
    notFound();
  }

  const keyMetrics = {
    content: {
      heading: {
        content: [
          {
            format: 'normal',
            text: 'In Pakistan, more than 95% of deaf children ',
          },
          {
            format: 'break',
          },
          {
            format: 'normal',
            text: 'of school-going age are deprived of their right to education.',
          },
        ],
      },
      description: {
        content: [
          {
            format: 'bold',
            text: 'Deaf Education Initiative is striving to ensure that no deaf child goes without literacy and learning.',
          },
          {
            format: 'break',
          },
          {
            format: 'normal',
            text: ' We are a non-profit organization committed to empowering disadvantaged deaf children and youth in Pakistan. We support the Deaf Reach Program in Pakistan, which is working on empowering the deaf community by providing a full circle solution from education and skills training, teacher development and parent training, to job placement and community inclusion.',
          },
        ],
      },
      metrics: [
        {
          icon: <Student />,
          numbers: '2500+',
          text: 'Students Currently Enrolled',
        },
        {
          icon: <Employees />,
          numbers: '50,000+',
          text: 'Direct Beneficiaries',
        },
        {
          icon: <Teacher />,
          numbers: '2750+',
          text: 'Deaf Persons Employed',
        },
        {
          icon: <PeopleChatting />,
          numbers: '7500+',
          text: 'Words PSL Dictionary',
        },
        {
          icon: <Globe />,
          numbers: '107',
          text: 'Sites Across Pakistan',
        },
      ],
    },
    // colors: {
    //   mainSection: { bgColor: 'var(--white)' },
    //   heading: { textColor: 'var(--ebony)' },
    //   description: { textColor: 'var(--ebony)' },
    // },
  };

  const cards = programs.reduce<Card[]>((acc, program) => {
    const { title, slug, shortDescription, featuredImage } = program;

    // Check if the image is valid
    if (
      typeof featuredImage === 'object' &&
      featuredImage?.url &&
      featuredImage.width &&
      featuredImage.height
    ) {
      // If valid, create the card object and push it to the array
      acc.push({
        image: {
          src: featuredImage.url,
          alt: featuredImage.alt ?? '',
          width: featuredImage.width,
          height: featuredImage.height,
        },
        title,
        description: shortDescription,
        cta: {
          text: 'Learn More',
          url: `/our-programs/${slug}`,
        },
      });
    }

    return acc;
  }, []);
  return (
    <>
      <MainBanner />
      <KeyMetrics keyMetrics={keyMetrics} />
      <Cards />
      <CardsSlider cards={cards} />
      <TestimonialSlider />
      <TwoColumnCard />
      <LogoSlider />
      <Subscription />
    </>
  );
}
