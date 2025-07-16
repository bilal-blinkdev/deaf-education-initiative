'use client';

import Image, { StaticImageData } from 'next/image';
// import Swiper JS
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// import Swiper styles
import 'swiper/css';
import ArrowRight from '@/graphics/ArrowRight';
import ArrowLeft from '@/graphics/ArrowLeft';
import styles from './styles.module.scss';

type SwiperTwoColumnCardsProps = {
  cards: {
    image: { src: StaticImageData; alt: string };
    quote: string;
    author: string;
    designation: string;
  }[];
};

export default function SwiperTwoColumnCards({ cards }: SwiperTwoColumnCardsProps) {
  return (
    <Swiper
      slidesPerView={'auto'}
      centeredSlides={true}
      grabCursor={true}
      className={styles.mySwiper}
    >
      <SwiperNavButtons />
      {cards.map((card, index) => (
        <SwiperSlide className={styles.mySwiperSlide} key={index}>
          <div className={styles.card}>
            <div className={styles.cardBody}>
              <div className={styles.colOne}>
                <h3 className={styles.quote}>{card.quote}</h3>
                <p className={styles.author}>— {card.author}</p>
                <p className={styles.designation}>{card.designation}</p>
              </div>
              <div className={styles.colTwo}>
                <div className={styles.imageHolder}>
                  <Image src={card.image.src} alt={card.image.alt} className={styles.image} />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function SwiperNavButtons() {
  const swiper = useSwiper();
  return (
    <div className={styles.swiperNavButtons}>
      <button className={styles.swiperNavButton} onClick={() => swiper.slidePrev()}>
        <ArrowLeft />
      </button>
      <button className={styles.swiperNavButton} onClick={() => swiper.slideNext()}>
        <ArrowRight />
      </button>
    </div>
  );
}
