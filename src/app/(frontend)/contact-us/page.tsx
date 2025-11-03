import Image from 'next/image';
import Container from '@/components/layout/Container';

import Heading from '@/components/elements/Heading';

import Paragraph from '@/components/elements/Paragraph';
import Link from 'next/link';
import Text from '@/components/blocks/Text';
import Email from '@/graphics/Email';
import Facebook from '@/graphics/Facebook';
import Twitter from '@/graphics/Twitter';
import Instagram from '@/graphics/Instagram';
import Linkedin from '@/graphics/Linkedin';
import Youtube from '@/graphics/Youtube';
import SchoolsMap from '@/assets/schools-location.webp';
import ContactForm from '@/components/sections/ContactForm';
import SchoolGirlsRaisingHands from '@/assets/school-girls-raising-hands.webp';

import Faqs from '@/components/blocks/Faqs';
import TwoColumnCard2 from '@/components/blocks/TwoColumnCard2';
import SubscriptionBlock from '@/components/blocks/Subscription';
import styles from './page.module.scss';

export default function ContactUs() {
  const textBlockContent = {
    heading: { text: 'Got Any Questions?', align: 'center' },
    headingOverline: { text: 'Contact Us', align: 'center', color: 'var(--dark-blue)' },
    description: {
      text: 'We look forward to connecting with you to transform the lives of countless deaf children in Pakistan.',
      align: 'center',
    },
  } as const;

  const faqsContent = {
    faqs: [
      {
        question: 'How does DEI use my donation?',
        answer:
          'Once you’re set up, payouts arrive in your bank account on a 2-day rolling basis. Or you can opt to receive payouts weekly or monthly.',
      },
      {
        question: 'Is donating online secure?',
        answer:
          'Disputed payments (also known as chargebacks) incur a $15.00 fee. If the customer’s bank resolves the dispute in your favor, the fee is fully refunded.',
      },
      {
        question: 'Will I get a tax receipt for my donation?',
        answer:
          'Disputed payments (also known as chargebacks) incur a $15.00 fee. If the customer’s bank resolves the dispute in your favor, the fee is fully refunded.',
      },
      {
        question: 'Who can I contact for group donations?',
        answer:
          'Disputed payments (also known as chargebacks) incur a $15.00 fee. If the customer’s bank resolves the dispute in your favor, the fee is fully refunded.',
      },
      {
        question: 'How much is £1 worth in donation?',
        answer:
          'Once you’re set up, payouts arrive in your bank account on a 2-day rolling basis. Or you can opt to receive payouts weekly or monthly.',
      },
      {
        question: 'How do monthly donations work?',
        answer:
          'Disputed payments (also known as chargebacks) incur a $15.00 fee. If the customer’s bank resolves the dispute in your favor, the fee is fully refunded.',
      },
    ],
  };
  const ourMissionContent = {
    title: 'Volunteer’s Voice',
    titleOverline: 'Join Our Mission',
    description:
      'FESF counts on the generous help of our volunteers to meet the needs of the people we serve throughout Pakistan. Their involvement is crucial to the success of our programs. A special thank you to all our amazing volunteers!',
    button: {
      label: 'Contact Us',
      href: '/contact-us',
    },
    image: {
      src: SchoolGirlsRaisingHands,
      alt: 'School Girls Raising Hands',
    },
  };
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
      <Text content={textBlockContent} sectionClass={styles.textBlock} />
      <section className={styles.connectWithUs}>
        <Container>
          <div className={styles.connectWithUs__grid}>
            <div className={styles.connectWithUs__gridItem}>
              <Heading level={2} className={styles.connectWithUs__heading} color="var(--white)">
                Connect With Us
              </Heading>
              <Paragraph className={styles.connectWithUs__description} color="var(--white)">
                Reach out to us for any inquiries, support, or collaboration opportunities. Whether
                it&apos;s a visit, an email, or a quick call, we&apos;re here to connect and assist.
              </Paragraph>
              <div className={styles.connectWithUs__contactInfo}>
                <address className={styles.connectWithUs__contactItem}>
                  <p className={styles.connectWithUs__contactItemName}>
                    Deaf Education Initiative UK Office
                  </p>
                  <p className={styles.connectWithUs__contactItemDescription}>
                    <Email color="var(--white)" />
                    <Link href={'mailto:info@deiuk.org'} className={styles.connectWithUs__email}>
                      info@deiuk.org
                    </Link>
                  </p>
                </address>
              </div>
              <ul className={styles.connectWithUs__socialLinks}>
                <li>
                  <Link href="" target="_blank">
                    <Facebook color="var(--white)" fillOpacity="1" />
                  </Link>
                </li>
                <li>
                  <Link href="" target="_blank">
                    <Twitter color="var(--white)" fillOpacity="1" />
                  </Link>
                </li>
                <li>
                  <Link href="" target="_blank">
                    <Instagram color="var(--white)" fillOpacity="1" />
                  </Link>
                </li>
                <li>
                  <Link href="" target="_blank">
                    <Linkedin color="var(--white)" fillOpacity="1" />
                  </Link>
                </li>
                <li>
                  <Link href="" target="_blank">
                    <Youtube color="var(--white)" fillOpacity="1" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.connectWithUs__gridItem}>
              <Heading level={2} className={styles.connectWithUs__heading}>
                Get in touch
              </Heading>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
      <section className={styles.ourSchools}>
        <Container>
          <Heading level={2} className={styles.ourSchools__heading} align="center">
            Schools
          </Heading>
          <figure className={styles.ourSchools__figure}>
            <Image src={SchoolsMap} className={styles.ourSchools__image} alt="" />
          </figure>
        </Container>
      </section>
      <Faqs content={faqsContent} />
      <TwoColumnCard2
        content={ourMissionContent}
        colOneBg="var(--white)"
        imageRadius="12px"
        imageShadow="0 4px 25px 0 rgba(18,17,39, 0.25)"
        titleColor="var(--ebony)"
        titleOverlineColor="var(--dodger-blue)"
        descriptionColor="var(--ebony)"
        sectionClass={styles.contactCtaBlock}
      />
      <TwoColumnCard2
        content={donationContent}
        colOneBg="var(--flamingo)"
        sectionClass={styles.donationCtaBlock}
      />
      <SubscriptionBlock />
    </>
  );
}
