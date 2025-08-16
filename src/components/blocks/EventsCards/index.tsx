import Image from 'next/image';
import Container from '@/components/layout/Container';
import Button from '@/components/elements/Button';
import Image1 from '@/assets/events/three-school-girls-and-two-boys-smiling.webp';
import Image2 from '@/assets/events/school-girl-raising-both-hands.webp';
import styles from './styles.module.scss';
import Heading from '@/components/elements/Heading';
import Clock from '@/graphics/Clock';
import MarkerPin from '@/graphics/MarkerPin';

export default function EventCards() {
  return (
    <section className={styles.eventCards}>
      <Container>
        <section className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card__date}>09 Jan</div>
            <figure className={styles.card__figure}>
              <Image src={Image1} alt="" className={styles.card__image} />
            </figure>
            <div className={styles.card__body}>
              <Heading level={3} color="var(--white)" className={styles.card__title}>
                DEI London Annual Dinner
              </Heading>
              <hr className={styles.card__divider} />
              <div className={styles.card__meta}>
                <div className={styles.card__time}>
                  <Clock color="#fff" />
                  <span>3:00 pm - 5:00 pm</span>
                </div>
                <div className={styles.card__location}>
                  <MarkerPin color="#fff" />
                  <span>BMA House</span>
                </div>
              </div>
            </div>
            <div className={styles.card__footer}>
              <Button size="large" width="full">
                Register
              </Button>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__date}>09 Jan</div>
            <figure className={styles.card__figure}>
              <Image src={Image2} alt="" className={styles.card__image} />
            </figure>
            <div className={styles.card__body}>
              <Heading level={3} color="var(--white)" className={styles.card__title}>
                DEI Manchester Annual Dinner
              </Heading>
              <hr className={styles.card__divider} />
              <div className={styles.card__meta}>
                <div className={styles.card__time}>
                  <Clock color="#fff" />
                  <span>4:00 pm - 7:00 pm</span>
                </div>
                <div className={styles.card__location}>
                  <MarkerPin color="#fff" />
                  <span>Bridgewater Hall</span>
                </div>
              </div>
            </div>
            <div className={styles.card__footer}>
              <Button size="large" width="full">
                Register
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
}
