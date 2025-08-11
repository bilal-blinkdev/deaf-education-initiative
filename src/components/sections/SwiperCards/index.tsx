'use client';

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Button from '@/components/elements/Button';
// import Swiper JS
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// import Swiper styles
import 'swiper/css';
import ArrowLeft from '@/graphics/ArrowLeft';
import ArrowRight from '@/graphics/ArrowRight';
import styles from './styles.module.scss';

type SwiperCardsProps = {
  cards: {
    image: { src: StaticImageData; alt: string };
    title: string;
    description: string;
    cta: { text: string; url: string };
  }[];
};

export default function SwiperCards({ cards }: SwiperCardsProps) {
  const [isEnd, setIsEnd] = useState(false);

  const handleChange = (swiper: any) => {
    if (swiper?.isEnd) {
      setIsEnd(true);
    } else if (swiper?.isBeginning) {
      setIsEnd(false);
    }
  };

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={24}
      // autoplay={{
      //   delay: 3000,
      //   disableOnInteraction: true,
      // }}
      speed={1000}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
        1100: {
          slidesPerView: 3,
        },
      }}
      className={styles.mySwiper}
      modules={[Autoplay]}
      onSlideChange={handleChange}
    >
      <SwiperNavButtons isStart={!isEnd} isEnd={isEnd} />
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

function SwiperNavButtons({ isStart, isEnd }: { isStart: boolean; isEnd: boolean }) {
  const swiper = useSwiper();

  const handlePrev = () => {
    swiper.slidePrev();
  };
  const handleNext = () => {
    swiper.slideNext();
  };
  return (
    <div className={styles.swiperNavButtons}>
      <button className={styles.swiperNavButton} onClick={handlePrev} disabled={isStart}>
        <ArrowLeft />
      </button>
      <button className={styles.swiperNavButton} onClick={handleNext} disabled={isEnd}>
        <ArrowRight />
      </button>
    </div>
  );
}
