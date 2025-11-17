import Banner from '@/assets/girl-sitting-in-class-making-hand-sign.webp';
import Container from '@/components/layout/Container';
import DonationDetailsGlobal from '@/components/sections/DonationDetailsGlobal';
import { fetchProjects } from '@/app/lib/payload/fetchProjects';
import styles from './styles.module.scss';

export default async function MainBanner() {
  const projects = await fetchProjects();

  return (
    <section
      className={styles.banner}
      style={{
        backgroundImage: `url(${Banner.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Container customClass={styles.donationFormContainer}>
        <div className={styles.donationForm}>
          <DonationDetailsGlobal projects={projects} />
        </div>
      </Container>
    </section>
  );
}
