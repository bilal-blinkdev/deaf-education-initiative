import Image from 'next/image';
import Banner from '@/assets/girl-standing.webp';
// import DonationForm from "../sections/DonationForm";
import Container from '@/components/layout/Container';
import styles from './styles.module.scss';

export default function MainBanner() {
  return (
    <section className={styles.banner}>
      <Image src={Banner} className={styles.bannerImage} alt="Girl Standing" />
      {/* <Container customClass={styles.donationFormContainer}>
        <DonationForm />
      </Container> */}
    </section>
  );
}
