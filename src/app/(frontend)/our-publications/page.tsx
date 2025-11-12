import Container from '@/components/layout/Container';
import Paragraph from '@/components/elements/Paragraph';
import Heading from '@/components/elements/Heading';
import Button from '@/components/elements/Button';
import InputField from '@/components/elements/InputField';
import Link from 'next/link';
import ThreeLinesAccent from '@/graphics/ThreeLinesAccent';
import SwigglyLineAccent from '@/graphics/SwigglyLineAccent';
import { Publication } from '@/payload-types';
import { notFound } from 'next/navigation';
import { fetchPayload } from '@/app/lib/payload/fetchPayload';
import dynamic from 'next/dynamic';
import PublicationsList from '@/components/blocks/PublicationList';
import styles from './page.module.scss';

// Fetch all publications
async function fetchPublications(): Promise<Publication[]> {
  // Depth=2 ensures media objects within reportDocuments are populated
  return fetchPayload<Publication>('/api/publications?sort=-publishedAt&depth=2&limit=100');
}

export default async function OurPublications() {
  const publications = await fetchPublications();

  if (!publications || publications.length === 0) {
    // Optionally return notFound() or display a "No publications found" message
    return (
      <Container>
        <Heading level={2} align="center">
          No Publications Found
        </Heading>
      </Container>
    );
  }

  return (
    <>
      <section className={styles.ourJourneySubscription}>
        <Container>
          <div className={styles.ourJourneySubscription__grid}>
            <div className={styles.ourJourneySubscription__gridItem}>
              <Heading level={2} className={styles.ourJourneySubscription__heading}>
                Our Journey in Words
              </Heading>
              <div className={styles.ourJourneySubscription__flex}>
                <InputField
                  type="email"
                  name="email"
                  placeholder="Enter you email"
                  required={true}
                />
                <Button size="large" customClass={styles.ourJourneySubscription__cta}>
                  Get Started
                </Button>
              </div>
              <p className={styles.ourJourneySubscription__privacyPolicy}>
                We care about your data in our{' '}
                <Link
                  href={'/privacy policy'}
                  className={styles.ourJourneySubscription__privacyPolicyLink}
                >
                  privacy policy
                </Link>
                .
              </p>
            </div>
            <div className={styles.ourJourneySubscription__gridItem}>
              <Paragraph className={styles.ourJourneySubscription__description}>
                Subscribe to our mailing list and get updates on how you are helping us make an
                impact.
              </Paragraph>
            </div>
          </div>
        </Container>
      </section>
      {/* --- Main Publications Grid Section --- */}
      <section className={styles.publicationsGrid}>
        <Container>
          {/* Render the Client Component and pass the data */}
          <PublicationsList publications={publications} />
        </Container>
      </section>
      <section className={styles.ourJourneySubscription__video}>
        <Container>
          <Heading
            level={2}
            className={styles.ourJourneySubscription__videoHeading}
            align="center"
            color="var(--white)"
          >
            See the world through the eyes of our students{' '}
          </Heading>
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'visible',
              borderRadius: '12px',
              border: 'thick solid var(--white)',
            }}
          >
            <div className={styles.ourJourneySubscription__videoBottomLeft}>
              <ThreeLinesAccent />
            </div>
            <div className={styles.ourJourneySubscription__videoTopRight}>
              <SwigglyLineAccent />
            </div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/hSLYfnMlXpI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                borderRadius: 8,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
              }}
            ></iframe>
          </div>
        </Container>
      </section>
    </>
  );
}
