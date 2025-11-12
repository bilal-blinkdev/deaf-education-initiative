'use client';

import { useState } from 'react';
import Banner from '@/assets/girl-sitting-in-class-making-hand-sign.webp';
import DonationDetails from '@/components/sections/DonationDetails';
import Container from '@/components/layout/Container';
import { PROJECTS_TEST as PROJECTS } from '@/app/constants';
import styles from './styles.module.scss';

export default function MainBanner() {

  const [project, setProject] = useState(PROJECTS[0]);
  const [donationDetails, setDonationDetails] = useState({
    projectType: PROJECTS[0].name,
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
            handleClick={() => {
              console.log('test');
            }}
            donationDetails={donationDetails}
            setDonationDetails={setDonationDetails}
            // isFetchingUser={isFetchingUser}
            // isLoggedIn={isLoggedIn}
          />
        </div>
      </Container>
    </section>
  );
}
