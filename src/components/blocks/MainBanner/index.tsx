'use client';

import { useState } from 'react';
import Image from 'next/image';
import Banner from '@/assets/girl-standing.webp';
import DonationDetails from '@/components/sections/DonationDetails';
import Container from '@/components/layout/Container';
import { PROJECTS } from '@/app/constants';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';

export default function MainBanner() {
  const router = useRouter();

  const [project, setProject] = useState(PROJECTS[0]);
  const [donationDetails, setDonationDetails] = useState({
    projectType: '',
    supportType: 'Give Once',
    otherAmount: 0,
    donationType: 'Zakat',
    donationFixedAmount: '1',
  });
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
          <DonationDetails
            project={project}
            setProject={setProject}
            projects={PROJECTS}
            handleClick={() => router.push('/donate')}
            donationDetails={donationDetails}
            setDonationDetails={setDonationDetails}
          />
        </div>
      </Container>
    </section>
  );
}
