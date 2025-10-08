'use client';

import { Program } from '@/payload-types';

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
import { PROJECTS_TEST as PROJECTS } from '@/app/constants';
import DonationDetails from '@/components/sections/DonationDetails';
import Container from '@/components/layout/Container';
import HandDrawnUnderlines from '@/graphics/HandDrawnUnderlines';
import Heading from '@/components/elements/Heading';
import Paragraph from '@/components/elements/Paragraph';
import Image from 'next/image';
import ThreeLinesAccent from '@/graphics/ThreeLinesAccent';
import SwigglyLineAccent from '@/graphics/SwigglyLineAccent';
import { useAuth } from '@/hooks/useAuth';

export default function OurProgramClientSide({ program }: { program: Program }) {
  const { isFetching: isFetchingUser, isLoggedIn } = useAuth();

  const [project, setProject] = useState(PROJECTS[0]);
  const [donationDetails, setDonationDetails] = useState({
    projectType: PROJECTS[0].name,
    supportType: 'Give Once',
    otherAmount: 0,
    donationType: 'Zakat',
    donationFixedAmount: '1',
  });
  const textBlockContent = {
    heading: { text: program.title, align: 'center' },
    headingOverline: {
      text: 'Our Programs > Education',
      align: 'center',
      color: 'var(--dodger-blue)',
    },
    description: {
      text: program.shortDescription,
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
              isFetchingUser={isFetchingUser}
              isLoggedIn={isLoggedIn}
              customClass={styles.forPrograms}
            />
          </div>
          {program.layout?.map((block, index) => {
            if (block.blockType === 'imageGrid') {
              return (
                <div key={index} className={styles.imagesGrid}>
                  {block.images?.slice(0, 4).map((item, imgIndex) => {
                    if (typeof item.image !== 'object' || !item.image?.url) {
                      return null;
                    }
                    if (imgIndex === 1) {
                      return (
                        <div key={item.id} className={styles.imagesGrid__gridItem}>
                          <p className={styles.imageText}>
                            <span>{block.imageText}</span>
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
                              backgroundImage: `url(${item.image?.url})`,
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                            }}
                          />
                        </div>
                      );
                    }
                    return (
                      <div key={item.id} className={styles.imagesGrid__gridItem}>
                        <div
                          className={styles.imagesGrid__imageContainer}
                          style={{
                            backgroundImage: `url(${item.image?.url})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            }
          })}
        </Container>
      </section>
      {program.layout?.map((block, index) => {
        if (block.blockType === 'cardGrid') {
          return (
            <section key={index} className={styles.features}>
              <Container>
                <Heading level={2} align="center">
                  {block.heading}
                </Heading>
                <Paragraph align="center">{block.subheading}</Paragraph>
                <div className={styles.featureCards}>
                  {block.cards.map((card) => {
                    if (typeof card.image !== 'object' || !card.image?.url) {
                      return null;
                    }
                    if (
                      typeof card.image !== 'object' ||
                      !card.image?.url ||
                      !card.image.width ||
                      !card.image.height
                    ) {
                      return null;
                    }

                    return (
                      <div key={card.id} className={styles.featureCard}>
                        <figure className={styles.featureCardFigure}>
                          <Image
                            src={card.image.url}
                            width={card.image.width}
                            height={card.image.height}
                            alt={card.image.alt ?? ''}
                            className={styles.featureCardImage}
                          />
                        </figure>
                        <div className={styles.featureCardBody}>
                          <Heading
                            level={3}
                            color="var(--dark-blue)"
                            className={styles.featureCardTitle}
                          >
                            {card.title}
                          </Heading>
                          <Paragraph>{card.description}</Paragraph>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Container>
            </section>
          );
        }
      })}
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
              overflow: 'visible',
              borderRadius: '12px',
              border: 'thick solid var(--sandy-brown)',
            }}
          >
            <div className={styles.video__videoBottomLeft}>
              <ThreeLinesAccent />
            </div>
            <div className={styles.video__videoTopRight}>
              <SwigglyLineAccent />
            </div>
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
