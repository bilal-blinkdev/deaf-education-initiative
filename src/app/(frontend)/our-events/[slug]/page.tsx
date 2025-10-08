import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Event } from '@/payload-types';
import { fetchPayload } from '@/app/lib/payload/fetchPayload';
import Image from 'next/image';

import Container from '@/components/layout/Container';
import SubscriptionBlock from '@/components/blocks/Subscription';
import Heading from '@/components/elements/Heading';
import HeadingOverline from '@/components/elements/HeadingOverline';
import Button from '@/components/elements/Button';
import RichText from '@/components/elements/RichText';
import Clock from '@/graphics/Clock';
import MarkerPin from '@/graphics/MarkerPin';
import Calendar from '@/graphics/Calendar';
import styles from './styles.module.scss';

async function fetchEvent(slug: string): Promise<Event | null> {
  const data = await fetchPayload<Event>(`/api/events?where[slug][equals]=${slug}&depth=1`);
  return data[0] || null;
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await fetchEvent(slug);

  if (!event) {
    return notFound();
  }

  const { title, eventDate, time, location, featuredImage, registrationLink, details } = event;

  // Type guard to ensure the featured image is a valid object with a URL
  if (
    typeof featuredImage !== 'object' ||
    !featuredImage.url ||
    !featuredImage.width ||
    !featuredImage.height
  ) {
    console.error(`Event with slug "${slug}" has an invalid or incomplete featured image.`);
    return notFound();
  }

  const hasMapUrl = location?.googleMapsEmbedUrl;

  return (
    <>
      <Container>
        <section className={styles.mainBanner}>
          <figure className={styles.mainBanner__figure}>
            <Image
              src={featuredImage.url}
              width={featuredImage.width}
              height={featuredImage.height}
              alt={featuredImage.alt || title}
              className={styles.mainBanner__image}
            />
          </figure>
        </section>
        <section className={styles.eventDetail}>
          <Container customClass={styles.eventDetail__container}>
            <HeadingOverline align="center" color="var(--dodger-blue)">
              Save the Date
            </HeadingOverline>
            <div className={styles.eventDetail__meta}>
              <div className={styles.eventDetail__calendar}>
                <Calendar />
                <span>{format(new Date(eventDate), 'eeee, MMMM dd, yyyy')}</span>
              </div>
              <div className={styles.eventDetail__time}>
                <Clock />
                <span>{time}</span>
              </div>
              <div className={styles.eventDetail__location}>
                <MarkerPin />
                <span>{location.name}</span>
              </div>
            </div>
            <Heading level={2} align="center">
              {title}
            </Heading>

            {details && (
              <div className={styles.eventDetail__content}>
                <RichText content={details} />
              </div>
            )}

            {registrationLink && (
              <Button
                link={{ href: registrationLink || '#', target: '_blank' }}
                size="large"
                width="maxContent"
                customClass={styles.eventDetail__cta}
              >
                Register
              </Button>
            )}
          </Container>
        </section>

        {hasMapUrl && (
          <section className={styles.eventLocation}>
            <Heading level={2} align="center">
              Event Location
            </Heading>
            <div className={styles.eventLocation__mapWrapper}>
              <iframe
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: '12px' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={location.googleMapsEmbedUrl}
              ></iframe>
            </div>
          </section>
        )}
      </Container>
      <SubscriptionBlock />
    </>
  );
}
