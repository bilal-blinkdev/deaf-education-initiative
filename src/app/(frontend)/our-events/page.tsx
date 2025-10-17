import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Event } from '@/payload-types';
import { fetchPayload } from '@/app/lib/payload/fetchPayload';
import SubscriptionBlock from '@/components/blocks/Subscription';
import Text from '@/components/blocks/Text';
import TwoColumnCard from '@/components/blocks/TwoColumnCard';
import EventCards from '@/components/blocks/EventsCards';
import { Card } from '@/components/blocks/EventsCards';

async function fetchEvents(): Promise<Event[]> {
  // Sorts by eventDate in descending order to show upcoming or most recent events first
  return fetchPayload<Event>('/api/events?sort=-eventDate&depth=1&limit=10');
}

export default async function OurEvents() {
  const events = await fetchEvents();

  if (!events) {
    notFound();
  }

  const textBlockContent = {
    heading: { text: 'Upcoming Events', align: 'center' },
    headingOverline: { text: 'Save the Date', align: 'center', color: 'var(--dodger-blue)' },
    description: {
      text: 'Join us to learn more about the Deaf Community, explore Deaf Reach’s transformative work, and support our mission to create lasting change.',
      align: 'center',
    },
  } as const;

  const cards = events.reduce<Card[]>((acc, event) => {
    const { slug, title, eventDate, time, location, featuredImage, registrationLink } = event;

    // Check if all required data is present and valid
    if (
      typeof featuredImage === 'object' &&
      featuredImage?.url &&
      featuredImage.width &&
      featuredImage.height
    ) {
      // If valid, create the card object and push it to our array
      acc.push({
        slug,
        title,
        date: format(new Date(eventDate), 'dd MMM'),
        time,
        location: location.name,
        image: {
          url: featuredImage.url,
          width: featuredImage.width,
          height: featuredImage.height,
          alt: featuredImage.alt ?? '',
        },
        registrationLink,
      });
    } else {
      // If invalid, log an error and simply skip it
      console.error(`Event with ID ${event.id} has a missing or incomplete featured image.`);
    }

    return acc;
  }, []);

  return (
    <>
      <Text content={textBlockContent} />
      <EventCards cards={cards} />
      <TwoColumnCard />
      <SubscriptionBlock />
    </>
  );
}
