import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Button from '@/components/elements/Button';
import Heading from '@/components/elements/Heading';
import Clock from '@/graphics/Clock';
import MarkerPin from '@/graphics/MarkerPin';
import styles from './styles.module.scss';

// Define the shape of the data for a single card's image
type ImageType = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

// Define the shape of the data for a single card
export type Card = {
  slug: string;
  date: string;
  image: ImageType;
  title: string;
  time: string;
  location: string;
  registrationLink?: string | null;
};

type EventCardsProps = {
  cards: Card[];
};

export default function EventCards({ cards }: EventCardsProps) {
  return (
    <section className={styles.eventCards}>
      <Container>
        <section className={styles.cards}>
          {cards.map((card) => (
            <div className={styles.card} key={card.slug}>
              <div className={styles.card__date}>{card.date}</div>
              <Link href={`/our-events/${card.slug}`} className={styles.card__linkWrapper}>
                <figure className={styles.card__figure}>
                  <Image
                    src={card.image.url}
                    width={card.image.width}
                    height={card.image.height}
                    alt={card.image.alt}
                    className={styles.card__image}
                  />
                </figure>
                <div className={styles.card__body}>
                  <Heading level={3} color="var(--white)" className={styles.card__title}>
                    {card.title}
                  </Heading>
                  <hr className={styles.card__divider} />
                  <div className={styles.card__meta}>
                    <div className={styles.card__time}>
                      <Clock color="#fff" />
                      <span>{card.time}</span>
                    </div>
                    <div className={styles.card__location}>
                      <MarkerPin color="#fff" />
                      <span>{card.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className={styles.card__footer}>
                <Button
                  link={{ href: card.registrationLink || '#', target: '_blank' }}
                  size="large"
                  width="full"
                  disabled={!card.registrationLink}
                >
                  Register
                </Button>
              </div>
            </div>
          ))}
        </section>
      </Container>
    </section>
  );
}
