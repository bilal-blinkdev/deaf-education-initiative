'use client';

import { useState } from 'react';
import TwoColumnCard from '@/components/blocks/TwoColumnCard';
import SubscriptionBlock from '@/components/blocks/Subscription';
import MainBanner from '@/assets/programs/internal/boy-raising-hand-smiling.webp';
import Banner from '@/components/blocks/Banner';
import Text from '@/components/blocks/Text';
import Image1 from '@/assets/programs/internal/three-girls-in-school-smiling.webp';
import Image2 from '@/assets/programs/internal/three-girls-one-boy-in-school-smiling.webp';
import Image3 from '@/assets/programs/internal/students-clapping.webp';
import Image4 from '@/assets/programs/internal/boy-in-school-writing-in-notebook.webp';
import FImage1 from '@/assets/programs/internal/student-graduating.webp';
import FImage2 from '@/assets/programs/internal/two-school-girls-in-library.webp';
import FImage3 from '@/assets/programs/internal/classroom-full-of-students.webp';
import styles from './styles.module.scss';
import { PROJECTS } from '@/app/constants';
import DonationDetails from '@/components/sections/DonationDetails';
import Container from '@/components/layout/Container';
import HandDrawnUnderlines from '@/graphics/HandDrawnUnderlines';
import Heading from '@/components/elements/Heading';
import Paragraph from '@/components/elements/Paragraph';
import Image from 'next/image';

export default function OurPrograms() {
  const [project, setProject] = useState(PROJECTS[0]);
  const [donationDetails, setDonationDetails] = useState({
    projectType: PROJECTS[0].name,
    supportType: 'Give Once',
    otherAmount: 0,
    donationType: 'Zakat',
    donationFixedAmount: '1',
  });
  const textBlockContent = {
    heading: { text: 'Schools, Training Centers & Colleges', align: 'center' },
    headingOverline: {
      text: 'Our Programs > Education',
      align: 'center',
      color: 'var(--dodger-blue)',
    },
    description: {
      text: ' Through the Deaf Reach Program, DEI provides a holistic model for formal deaf education, academic literacy, and vocational skills training to deaf children and youth. Deaf Reach is the only branch network of schools in Pakistan bridging the immense education gap for deaf community in the country.With the aim to ensure that no deaf child goes without learning and literacy, DEI is opening doors to a brighter future for countless deaf children who are otherwise deprived of their basic right to education.',
      align: 'center',
    },
  } as const;
  return (
    <>
      <Banner src={MainBanner} alt="Student sitting in the class smiling" />
      <Text content={textBlockContent} />
      <section className={styles.donation}>
        <Container>
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
              customClass={styles.forPrograms}
            />
          </div>
          <div className={styles.imagesGrid}>
            <div className={styles.imagesGrid__gridItem}>
              <div
                className={styles.imagesGrid__imageContainer}
                style={{
                  backgroundImage: `url(${Image1.src})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              ></div>
            </div>
            <div className={styles.imagesGrid__gridItem}>
              <p className={styles.imageText}>
                <span>
                  Since 2015, we have helped 2,500+ deaf men and women find meaningful employment
                </span>
                <span>
                  <HandDrawnUnderlines
                    color="var(--sandy-brown)"
                    svgClass={styles.handDrawnLinesIcon}
                  />
                </span>
              </p>
              <div
                className={styles.imagesGrid__imageContainer}
                style={{
                  backgroundImage: `url(${Image2.src})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              ></div>
            </div>
            <div className={styles.imagesGrid__gridItem}>
              <div
                className={styles.imagesGrid__imageContainer}
                style={{
                  backgroundImage: `url(${Image3.src})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              ></div>
            </div>
            <div className={styles.imagesGrid__gridItem}>
              <div
                className={styles.imagesGrid__imageContainer}
                style={{
                  backgroundImage: `url(${Image4.src})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              ></div>
            </div>
          </div>
        </Container>
      </section>
      <section className={styles.features}>
        <Container>
          <Heading level={2} align="center">
            More About Our Schools, Colleges & Training Centres
          </Heading>
          <Paragraph align="center">
            Our innovative Program ensures holistic development of all our students by providing
            top-quality education tailored to the unique learning needs of deaf children. Beyond
            academics, we empower students with skills, resources, and support to help them thrive
            in every aspect of life.
          </Paragraph>
          <div className={styles.featureCards}>
            <div className={styles.featureCard}>
              <figure className={styles.featureCardFigure}>
                <Image src={FImage1} alt="" className={styles.featureCardImage} />
              </figure>
              <div className={styles.featureCardBody}>
                <Heading level={3} color="var(--dark-blue)" className={styles.featureCardTitle}>
                  Scholarships
                </Heading>
                <Paragraph>
                  Admission is granted on a “pay-as you-can-afford” basis, with 98% of students on
                  scholarships covering all academic and vocational training costs. Daily transport
                  for a radius of 50 kilometers is provided for all students in each school.
                </Paragraph>
              </div>
            </div>
            <div className={styles.featureCard}>
              <figure className={styles.featureCardFigure}>
                <Image src={FImage2} alt="" className={styles.featureCardImage} />
              </figure>
              <div className={styles.featureCardBody}>
                <Heading level={3} color="var(--dark-blue)" className={styles.featureCardTitle}>
                  Technology-Based Learning
                </Heading>
                <Paragraph>
                  Technology is used extensively to reinforce visual learning, with all students
                  mastering IT skills from an early age. Emphasis is given to student’s development
                  and use of Pakistan Sign Language (PSL) in the classroom to facilitate learning.
                  Students ultimately become literate in three languages: Sign Language, Urdu and
                  English.
                </Paragraph>
              </div>
            </div>
            <div className={styles.featureCard}>
              <figure className={styles.featureCardFigure}>
                <Image src={FImage3} alt="" className={styles.featureCardImage} />
              </figure>
              <div className={styles.featureCardBody}>
                <Heading level={3} color="var(--dark-blue)" className={styles.featureCardTitle}>
                  Matric Board Exams
                </Heading>
                <Paragraph>
                  DEI prepares its students for the Government board exams on an annual basis. To
                  date, 96 percent of examinees have achieved high marks in all core subjects,
                  highlighting the effectiveness of DEI's teaching methodology.
                </Paragraph>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className={styles.video}>
        <Container>
          <Heading level={2} align="center">
            Making Education a Reality for Deaf Children
          </Heading>
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              borderRadius: '12px',
              border: 'thick solid var(--sandy-brown)',
            }}
          >
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/K4TOrB7at0Y?si=GDlnltoNPYN5WDof"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                borderRadius: 8,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
              }}
            ></iframe>
          </div>
        </Container>
      </section>
      <TwoColumnCard />
      <SubscriptionBlock />
    </>
  );
}
