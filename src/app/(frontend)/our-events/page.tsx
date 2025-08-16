import SubscriptionBlock from '@/components/blocks/Subscription';
import Text from '@/components/blocks/Text';
import TwoColumnCard from '@/components/blocks/TwoColumnCard';
import EventCards from '@/components/blocks/EventsCards';

export default function OurPartners() {
  const textBlockContent = {
    heading: { text: 'Upcoming Events', align: 'center' },
    headingOverline: { text: 'Save the Date', align: 'center', color: 'var(--dodger-blue)' },
    description: {
      text: 'Join us to discover more about the deaf community, learn more about Deaf Reach’s transformative work, and support our mission to create lasting change.',
      align: 'center',
    },
  } as const;
  return (
    <>
      <Text content={textBlockContent} />
      <EventCards />
      <TwoColumnCard />
      <SubscriptionBlock />
    </>
  );
}
