import { StaticImageData } from 'next/image';
import Container from '@/components/layout/Container';
import Button from '@/components/elements/Button';
import SwiperCards from '@/components/sections/SwiperCards';
import styles from './styles.module.scss';
import { Media } from '@/payload-types';
import SwiperCards2 from '@/components/sections/SwiperCards2';

// 1. Define the shape of the data each card will need
export type Card2 = {
  image: {
    src: string | StaticImageData;
    alt: string;
    width: number;
    height: number;
  };
  title: string;
  description: string;
  cta: {
    text: string;
    url: string;
  };
};

// 2. Define the props for the main component
type CardsSliderProps = {
  cards: Card2[];
};

// 3. Accept 'cards' as a prop instead of hardcoding it
export default function CardsSlider2({ cards }: CardsSliderProps) {
  // The old hardcoded 'cards' array is now gone.

  return (
    <section className={styles.cardsSlider}>
      <Container>
        <h2 className={styles.heading}>Our Featured Programs</h2>
        <section className={styles.slider}>
          {/* 4. Pass the dynamic cards down to the Swiper component */}
          {/* <SwiperCards2 cards={cards} /> */}
        </section>
        <Button
          style="text"
          customClass={styles.ctaButton}
          link={{ href: '/our-programs' }}
          icons={{ leading: true, width: '28', height: '28', color: '#fff' }}
        >
          <span>Read more about our programs</span>
        </Button>
      </Container>
    </section>
  );
}
