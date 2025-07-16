'use client';

// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import Image, { StaticImageData } from 'next/image';
import Container from '@/components/layout/Container';
import ActionCare from '@/assets/partner-logos/action-care.webp';
import AfeefGroup from '@/assets/partner-logos/afeef-group.webp';
import AustralianAid from '@/assets/partner-logos/australian-aid.webp';
import CoinCanada from '@/assets/partner-logos/coin-canada.webp';
import Cosaraf from '@/assets/partner-logos/cosaraf.webp';
import EdtechHub from '@/assets/partner-logos/edtech-hub.webp';
import EtihadAirways from '@/assets/partner-logos/etihad-airways.webp';
import Facebook from '@/assets/partner-logos/facebook.webp';
import HumanConcernInternational from '@/assets/partner-logos/human-concern-international.webp';
import Idrf from '@/assets/partner-logos/idrf.webp';
import Kfc from '@/assets/partner-logos/kfc.webp';
import KhakiFoundation from '@/assets/partner-logos/khaki-foundation.webp';
import Philips from '@/assets/partner-logos/philips.webp';
import theICareFoundation from '@/assets/partner-logos/the-i-care-foundation.webp';
import UsAid from '@/assets/partner-logos/us-aid.webp';
import styles from './styles.module.scss';

type logo = {
  image: {
    src: StaticImageData;
    alt: string;
  };
};

export default function LogoSliderBlock() {
  const logos: logo[] = [
    { image: { src: ActionCare, alt: 'Action Care' } },
    { image: { src: AfeefGroup, alt: 'AfeefGroup' } },
    { image: { src: AustralianAid, alt: 'Australian Aid' } },
    { image: { src: CoinCanada, alt: 'Coin Canada' } },
    { image: { src: Cosaraf, alt: 'Cosaraf' } },
    { image: { src: EdtechHub, alt: 'Edtech Hub' } },
    { image: { src: EtihadAirways, alt: 'Etihad Airways' } },
    { image: { src: Facebook, alt: 'Facebook' } },
    {
      image: {
        src: HumanConcernInternational,
        alt: 'Human Concern International',
      },
    },
    { image: { src: Idrf, alt: 'Idrf' } },
    { image: { src: Kfc, alt: 'Kfc' } },
    { image: { src: KhakiFoundation, alt: 'Khaki Foundation' } },
    { image: { src: Idrf, alt: 'Idrf' } },
    { image: { src: theICareFoundation, alt: 'the i-Care Foundation' } },
    { image: { src: Philips, alt: 'Philips' } },
    { image: { src: UsAid, alt: 'US Aid' } },
  ];
  return (
    <section className={styles.logoSliderBlock}>
      <h2 className={styles.heading}>Our Trusted Partners</h2>
      <Container>
        <div className={styles.slider}>
          <Swiper
            // slidesPerView={6}
            slidesPerGroup={6}
            // spaceBetween={24}
            grabCursor={true}
            // centeredSlides={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={7000}
            breakpoints={{
              300: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              900: { slidesPerView: 4 },
              1200: { slidesPerView: 6 },
            }}
            pagination={true}
            modules={[Pagination, Autoplay]}
            className={styles.mySwiper}
          >
            {logos.map((logo: logo, index: number) => (
              <SwiperSlide className={styles.mySwiperSlide} key={index}>
                <div className={styles.imageHolder}>
                  <Image src={logo.image.src} alt={logo.image.alt} className={styles.image} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
