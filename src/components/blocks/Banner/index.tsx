import Image, { StaticImageData } from 'next/image';
import styles from './styles.module.scss';

type BannerProps = {
  src: StaticImageData;
  alt: string;
};

export default function Banner({ src, alt }: BannerProps) {
  return (
    <section className={styles.banner}>
      <Image src={src} alt={alt} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
    </section>
  );
}
