import Image from 'next/image';
import Container from '@/components/layout/Container';
import Image1 from '@/assets/programs/girl-on-job-using-laptop.webp';
import Image2 from '@/assets/programs/builders-posing-for-photo.webp';
import Image3 from '@/assets/programs/two-employees.webp';
import Image4 from '@/assets/programs/kfc-staff.webp';
import HandDrawnUnderlines from '@/graphics/HandDrawnUnderlines';
import HandDrawnTwinkle from '@/graphics/HandDrawnTwinkle';
import styles from './styles.module.scss';
import HeadingOverline from '@/components/elements/HeadingOverline';
import Heading from '@/components/elements/Heading';
import Paragraph from '@/components/elements/Paragraph';
import CompanyEmployees from '@/graphics/CompanyEmployees';

export default function JobPlacement() {
  return (
    <section className={styles.jobPlacement}>
      <Container customClass={styles.container}>
        <div className={styles.flexBox}>
          <div className={styles.flexCol}>
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
                >
                  {/* <span className={styles.imageIcon}>
                    <HandDrawnTwinkle />
                  </span> */}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.flexCol}>
            <Heading level={2}>Job Placement</Heading>
            <Paragraph>
              Deaf Education Initiative is driven by the overarching goal of empowering individuals
              holistically and creating opportunities for them to thrive, not just academically but
              also economically. To fulfill this goal, our Job Placement Program actively works to
              locate and facilitate employment for both its graduates and the wider Deaf Community,
              ensuring a pathway to financial independence and success.
            </Paragraph>
            <div className={styles.iconAndContent}>
              <CompanyEmployees />
              <div className={styles.content}>
                <Heading level={3}>Participating Companies</Heading>
                <Paragraph>
                  Deaf Education Initiative’s Job Placement Program has resulted in jobs in numerous
                  companies and organizations, such as:
                </Paragraph>
                <div className={styles.listWrapper}>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>KFC</li>
                    <li className={styles.listItem}>Thal Engineering</li>
                    <li className={styles.listItem}>Valet Solutions</li>
                    <li className={styles.listItem}>Continental Biscuits</li>
                    <li className={styles.listItem}>Allied Caterpillar</li>
                    <li className={styles.listItem}>Bank Al-Habib</li>
                    <li className={styles.listItem}>CDC</li>
                    <li className={styles.listItem}>UBL</li>
                    <li className={styles.listItem}>Engro</li>
                  </ul>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>Lucky Knits</li>
                    <li className={styles.listItem}>Movenpick</li>
                    <li className={styles.listItem}>Feroze 1888 Mills Ltd.</li>
                    <li className={styles.listItem}>Sapphire</li>
                    <li className={styles.listItem}>Indus Home</li>
                    <li className={styles.listItem}>Bank of Punjab</li>
                    <li className={styles.listItem}>Deaf Reach</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
