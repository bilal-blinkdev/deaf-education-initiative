import Image from 'next/image';
import Container from '@/components/layout/Container';
import SubscriptionBlock from '@/components/blocks/Subscription';
import MainBanner from '@/assets/events/three-school-girls-and-two-boys-smiling.webp';
import DummyMapImage from '@/assets/events/dummy-map-image.webp';
import Heading from '@/components/elements/Heading';
import HeadingOverline from '@/components/elements/HeadingOverline';
import Clock from '@/graphics/Clock';
import MarkerPin from '@/graphics/MarkerPin';
import styles from './styles.module.scss';
import Calendar from '@/graphics/Calendar';
import Paragraph from '@/components/elements/Paragraph';
import Button from '@/components/elements/Button';
import Link from 'next/link';

export default function OurPartners() {
  return (
    <>
      <Container>
        <section className={styles.mainBanner}>
          <figure className={styles.mainBanner__figure}>
            <Image src={MainBanner} alt="" className={styles.mainBanner__image} />
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
                <span>BMA House</span>
              </div>
              <div className={styles.eventDetail__time}>
                <Clock />
                <span>3:00 pm - 5:00 pm</span>
              </div>
              <div className={styles.eventDetail__location}>
                <MarkerPin />
                <span>BMA House</span>
              </div>
            </div>
            <Heading level={2} align="center">
              DEI London Annual Dinner
            </Heading>
            <Paragraph>
              Join us for a memorable evening at the Dallas Annual Dinner, dedicated to supporting
              the education of deaf children in Pakistan.
            </Paragraph>
            <Paragraph>
              Hosted by renowned Pakistani comedian Shafaat Ali, it will be an evening filled with
              inspiration, laughter, and a lively stand-up comedy performance.
            </Paragraph>
            <Paragraph>
              Meet the Deaf Reach founders, Richard and Heidi Geary, and learn about the amazing
              future they envision, where no deaf child is without access to literacy and learning!
            </Paragraph>
            <Paragraph>
              Each ticket you buy directly supports the education of deaf children in Pakistan. We
              promise you an evening that will leave you inspired and uplifted!
            </Paragraph>
            <div>
              <p>For Queries</p>
              <p>
                <Link href="tel:9175658801">917 565 8801</Link>
              </p>
              <p>
                <Link href="mailto:faysal.soomro@deafreachna.org">
                  faysal.soomro@deafreachna.org
                </Link>
              </p>
            </div>
            <Button size="large" width="maxContent" customClass={styles.eventDetail__cta}>
              Register
            </Button>
          </Container>
        </section>
        <section className={styles.eventLocation}>
          <Heading level={2} align="center">
            See Event Location
          </Heading>
          <figure className={styles.eventLocation__figure}>
            <Image src={DummyMapImage} alt="" className={styles.eventLocation__image} />
          </figure>
        </section>
      </Container>
      <SubscriptionBlock />
    </>
  );
}
