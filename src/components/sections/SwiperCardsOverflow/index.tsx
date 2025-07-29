'use client';

import Image, { StaticImageData } from 'next/image';
import Button from '@/components/elements/Button';
// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper styles
import 'swiper/css';
import styles from './styles.module.scss';

type SwiperCardsOverflowProps = {
  cards: {
    image: { src: StaticImageData; alt: string };
    title: string;
    description: string;
    cta: { text: string; url: string };
  }[];
};

export default function SwiperCardsOverflow({ cards }: SwiperCardsOverflowProps) {
  return (
    <Swiper slidesPerView={'auto'} spaceBetween={24} grabCursor={true} className={styles.mySwiper}>
      {cards.map((card, index) => (
        <SwiperSlide className={styles.mySwiperSlide} key={index}>
          <div className={styles.card}>
            <div className={styles.imageHolder}>
              <Image src={card.image.src} alt={card.image.alt} className={styles.image} />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
              <Button
                size="small"
                icons={{
                  leading: true,
                }}
                customClass={styles.cardCtaButton}
              >
                {card.cta.text}
              </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
