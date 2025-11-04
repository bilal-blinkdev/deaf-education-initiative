// app/our-publications/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Blog } from '@/payload-types';
import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/layout/Container';
import Heading from '@/components/elements/Heading';
import Paragraph from '@/components/elements/Paragraph';
import RichText from '@/components/elements/RichText'; // A new component to render Payload's rich text
// ... other imports
import styles from './styles.module.scss';
import Button from '@/components/elements/Button';
import InputField from '@/components/elements/InputField';
import Send from '@/graphics/Send';
import Facebook from '@/graphics/Facebook';
import Copy from '@/graphics/Copy';
import Twitter from '@/graphics/Twitter';
import Linkedin from '@/graphics/Linkedin';
import TwoColumnCard2 from '@/components/blocks/TwoColumnCard2';
import SchoolGirlsRaisingHands from '@/assets/school-girls-raising-hands.webp';

// Fetch a single publication by its slug
async function fetchPublication(slug: string): Promise<Blog | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/publications?where[slug][equals]=${slug}&depth=2`,
    { cache: 'no-store' },
  );

  if (!res.ok) return null;

  const data = await res.json();
  // The query returns an array, so we take the first item
  return data.docs[0] || null;
}

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const publication = await fetchPublication(slug);
  console.log(publication);

  if (!publication) {
    return notFound();
  }

  // Type guards for populated relationships
  if (
    typeof publication.category === 'string' ||
    typeof publication.author === 'string' ||
    typeof publication.featuredImage === 'string'
  ) {
    return notFound(); // Or some error state
  }

  const {
    title,
    excerpt,
    publishedDate,
    category,
    author,
    featuredImage,
    readingDuration,
    content,
  } = publication;

  const donationContent = {
    title: 'Less Than 5% Of The One Million Deaf Children In Pakistan Attend School',
    description:
      'Your donations can ensure that deaf education is made available to more children. Together we can make education a reality for deaf children.',
    button: {
      label: 'Donate Now',
      href: '/donate',
    },
    image: {
      src: SchoolGirlsRaisingHands,
      alt: 'School Girls Raising Hands',
    },
  };

  return (
    <>
      <article className={styles.publication}>
        <Container>
          <div className={styles.publication__category}>
            <div className={styles.publication__categoryName}>{category.name}</div>
            <div className={styles.publication__readingDuration}>{readingDuration}</div>
          </div>
          <Heading level={1} className={styles.publication__heading}>
            {title}
          </Heading>
          <Paragraph className={styles.publication__description}>{excerpt}</Paragraph>
          <figure className={styles.publication__featureFigure}>
            <Image
              src={featuredImage.url || ''}
              className={styles.publication__featureImage}
              alt={featuredImage.alt || title}
              width={featuredImage.width || 1200} // Add dimensions
              height={featuredImage.height || 600}
            />
          </figure>
          <div className={styles.publication__meta}>
            <div className={styles.publication__authorAndDate}>
              <p className={styles.publication__author}>
                <span>Written by</span>
                <span>{author.name}</span>
              </p>
              <p className={styles.publication__date}>
                <span>Published on</span>
                <span>{format(new Date(publishedDate), 'dd MMM yyyy')}</span>
              </p>
            </div>
            <div className={styles.publication__links}>
              <button type="button" className={styles.publication__copyLinkBtn}>
                <Copy width="16" height="16" />
                Copy Link
              </button>
              <ul className={styles.publication__socialLinks}>
                <li>
                  <Link href="" target="_blank">
                    <Facebook width="14" height="14" color="var(--ebony-50)" fillOpacity="1" />
                  </Link>
                </li>
                <li>
                  <Link href="" target="_blank">
                    <Twitter width="14" height="14" color="var(--ebony-50)" fillOpacity="1" />
                  </Link>
                </li>
                <li>
                  <Link href="" target="_blank">
                    <Linkedin width="14" height="14" color="var(--ebony-50)" fillOpacity="1" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.publication__body}>
            <section className={styles.publication__content}>
              {/* Render the Rich Text content from Payload */}
              <RichText content={content} />
            </section>
            <aside className={styles.publication__newsletterSubscription}>
              <div className={styles.newsletterSubscription_icon}>
                <Send />
              </div>
              <Heading level={2} className={styles.newsletterSubscription_heading}>
                Weekly Newsletter
              </Heading>
              <Paragraph>
                No spam. Just the latest releases and tips, interesting articles, and exclusive
                interviews in your inbox every week.
              </Paragraph>
              <InputField type="email" name="email" placeholder="Enter your email" />
              <p className={styles.newsletterSubscription__privacyPolicy}>
                Read about our{' '}
                <Link
                  href={'/privacy policy'}
                  className={styles.newsletterSubscription__privacyPolicyLink}
                >
                  privacy policy
                </Link>
                .
              </p>
              <Button size="large" width="full" customClass={styles.newsletterSubscription__cta}>
                Subscribe{' '}
              </Button>
            </aside>
          </div>
          <TwoColumnCard2 content={donationContent} colOneBg="var(--flamingo)" />
        </Container>
      </article>
    </>
  );
}
