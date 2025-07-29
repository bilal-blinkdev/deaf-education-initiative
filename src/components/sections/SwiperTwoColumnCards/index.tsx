'use client';

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
// import Swiper JS
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
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
  const [isEnd, setIsEnd] = useState(false);

  const handleChange = (swiper: any) => {
    if (swiper.activeIndex === swiper.slides.length - 1) {
      setIsEnd(true);
    } else if (swiper.activeIndex === 0) {
      setIsEnd(false);
    }
  };

  return (
    <Swiper
      slidesPerView={'auto'}
      centeredSlides={true}
      grabCursor={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      speed={1000}
      className={styles.mySwiper}
      modules={[Autoplay]}
      onSlideChange={handleChange}
    >
      <SwiperNavButtons isStart={!isEnd} isEnd={isEnd} />
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
