import PageTitle from '@/components/blocks/PageTitle';
import LogosGrid from '@/components/blocks/LogosGrid';
import TextCtaAndTwoCards from '@/components/blocks/TextCtaAndTwoCards';
import TwoColumnCard from '@/components/blocks/TwoColumnCard';
import SubscriptionBlock from '@/components/blocks/Subscription';
import SchoolBoyAndGirls from '@/assets/three-girls-one-boy-in-school-uniform.webp';
import ManSpeaking from '@/assets/man-speaking.webp';

export default function OurPartners() {
  const content = {
    heading: { text: 'Read our reports' },
    subHeading: { text: 'Latest in publications' },
    description: {
      content: [
        {
          text: 'Catch up on our  latest reports, publications, blogs and awards and upcoming events.',
        },
      ],
    },
    cta: { link: { href: '/publications' }, text: 'View all posts' },
    cards: [
      {
        content: {
          image: ManSpeaking,
          title: 'Identifying Impactful Solutions - Global Call for Ideas',
          description:
            'The main goal that I have is that all of the students that have been nurtured and cared for in our schools, while they can’t get back to our',
          tags: [{ name: 'Report' }, { name: '30 min read' }],
          link: { href: '/publications' },
        },
      },
      {
        content: {
          image: SchoolBoyAndGirls,
          title: 'FESF Annual Report 2022-2023',
          description:
            'We are committed to improving the quality of life and future of deaf children and youth through supporting education and sign language programs, skills training and job placement',
          tags: [{ name: 'Report' }],
          link: { href: '/publications' },
        },
      },
    ],
  };
  return (
    <>
      <PageTitle
        title="Our Generous Partners"
        breadcrumbs="About > Partners"
        description="Through continued and generous support from our partners, we are able to transform lives and create lasting change for the deaf community."
      />
      <LogosGrid />
      <TextCtaAndTwoCards content={content} />
      <TwoColumnCard />
      <SubscriptionBlock />
    </>
  );
}
