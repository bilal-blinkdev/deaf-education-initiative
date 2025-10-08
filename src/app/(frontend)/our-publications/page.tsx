import Container from '@/components/layout/Container';
import Paragraph from '@/components/elements/Paragraph';
import Heading from '@/components/elements/Heading';
import Button from '@/components/elements/Button';
import InputField from '@/components/elements/InputField';
import Link from 'next/link';
import Image1 from '@/assets/programs/internal/three-girls-in-school-smiling.webp';
import TabsWithCards, { Card } from '@/components/blocks/TabsWithArticleCards';
import ThreeLinesAccent from '@/graphics/ThreeLinesAccent';
import SwigglyLineAccent from '@/graphics/SwigglyLineAccent';
import { Publication, Category } from '@/payload-types';
import styles from './styles.module.scss';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { fetchPayload } from '@/app/lib/payload/fetchPayload';

// Fetch all publications
async function fetchPublications(): Promise<Publication[]> {
  return fetchPayload<Publication>('/api/publications?depth=2&limit=100');
}

// Fetch all categories
async function fetchCategories(): Promise<Category[]> {
  return fetchPayload<Category>('/api/categories?limit=100');
}

export default async function OurPublications() {
  const publications = await fetchPublications();
  const categories = await fetchCategories();

  if (!publications) {
    return notFound();
  }

  // Dynamically create tabs from your CMS categories
  const tabs = [
    { id: 'all', label: 'View all' },
    ...categories.map((cat) => ({
      id: cat.name.toLowerCase().replace(/\s+/g, '-'), // e.g., 'case-studies'
      label: cat.name,
    })),
  ];

  // Map the fetched publications to the format your 'TabsWithCards' component expects
  const cards = publications.reduce<Card[]>((acc, pub) => {
    // Use optional chaining to safely access nested properties
    const category = typeof pub.category === 'object' ? pub.category : null;
    const author = typeof pub.author === 'object' ? pub.author : null;
    const featuredImage = typeof pub.featuredImage === 'object' ? pub.featuredImage : null;
    const authorPhoto = author && typeof author.photo === 'object' ? author.photo : null;

    // Check if all necessary data, including URLs and dimensions, exists
    if (
      category &&
      author &&
      featuredImage?.url &&
      featuredImage.width &&
      featuredImage.height &&
      authorPhoto?.url &&
      authorPhoto.width &&
      authorPhoto.height
    ) {
      // If everything is valid, create the Card object and add it to the array
      acc.push({
        id: pub.id,
        image: {
          url: featuredImage.url,
          width: featuredImage.width,
          height: featuredImage.height,
          alt: featuredImage.alt ?? '',
        },
        category: category.name,
        title: pub.title,
        excerpt: pub.excerpt,
        date: format(new Date(pub.publishedDate), 'dd MMM yyyy'),
        author: {
          name: author.name,
          image: {
            url: authorPhoto.url,
            width: authorPhoto.width,
            height: authorPhoto.height,
            alt: authorPhoto.alt ?? '',
          },
        },
        duration: pub.readingDuration,
        link: { href: `/our-publications/${pub.slug}` },
      });
    }

    return acc;
  }, []);
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
      <TabsWithCards tabs={tabs} cards={cards} />
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
              src="https://www.youtube.com/embed/K4TOrB7at0Y?si=GDlnltoNPYN5WDof"
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
