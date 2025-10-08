import { notFound } from 'next/navigation';
import { Program } from '@/payload-types';
import { fetchPayload } from '@/app/lib/payload/fetchPayload';

import TwoColumnCard from '@/components/blocks/TwoColumnCard';
import SubscriptionBlock from '@/components/blocks/Subscription';
import MainBanner from '@/assets/programs/student-sitting-in-class-smiling.webp';
import Banner from '@/components/blocks/Banner';
import Text from '@/components/blocks/Text';
import CardsSlider, { Card } from '@/components/blocks/CardsSlider';
import JobPlacement from '@/components/blocks/JobPlacement';
import TeacherTraining from '@/components/blocks/TeacherTraining';
import ParentTraining from '@/components/blocks/ParentTraining';
import DigitalSignTraining from '@/components/blocks/DigitalSignTraining';

export async function fetchPrograms(): Promise<Program[]> {
  return fetchPayload<Program>('/api/programs?depth=1&limit=10');
}

export default async function OurPrograms() {
  const programs = await fetchPrograms();
  if (!programs) {
    notFound();
  }

  const textBlockContent = {
    heading: { text: 'So Here’s What We Do...', align: 'center' },
    headingOverline: { text: 'Our Programs', align: 'center', color: 'var(--dodger-blue)' },
    description: {
      text: 'Through the Deaf Reach Program, DEI works to address the critical need for Deaf education and empowerment in Pakistan. Deaf Reach is continually expanding its programs to empower marginalized urban and rural deaf youth, the majority of whom are economically challenged, to provide them a brighter future.',
      align: 'center',
    },
  } as const;
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
      <Banner src={MainBanner} alt="Student sitting in the class smiling" />
      <Text content={textBlockContent} />
      <CardsSlider cards={cards} />
      <JobPlacement />
      <TeacherTraining />
      <ParentTraining />
      <DigitalSignTraining />
      <TwoColumnCard />
      <SubscriptionBlock />
    </>
  );
}
