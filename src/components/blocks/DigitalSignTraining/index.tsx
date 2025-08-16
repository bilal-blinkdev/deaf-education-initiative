import Image from 'next/image';
import Container from '@/components/layout/Container';
import Image1 from '@/assets/programs/woman-learning-sign-language-on-laptop.webp';
import Image2 from '@/assets/programs/woman-teaching-sign-language.webp';
import Image3 from '@/assets/programs/students-learning-sign-language-on-computers.webp';
import Image4 from '@/assets/programs/girl-learning-sign-language-on-computer.webp';
import HandDrawnUnderlines from '@/graphics/HandDrawnUnderlines';
import HandDrawnTwinkle from '@/graphics/HandDrawnTwinkle';
import styles from './styles.module.scss';
import HeadingOverline from '@/components/elements/HeadingOverline';
import Heading from '@/components/elements/Heading';
import Paragraph from '@/components/elements/Paragraph';
import CompanyEmployees from '@/graphics/CompanyEmployees';
import Button from '@/components/elements/Button';

export default function DigitalSignTraining() {
  return (
    <section className={styles.digitalSignTraining}>
      <Container customClass={styles.container}>
        <div className={styles.flexBox}>
          <div className={styles.flexCol}>
            <Heading level={2}>Digital Sign Language Resources</Heading>
            <Paragraph>
              DEI has leveraged digital technology to document Pakistan Sign Language (PSL),
              producing the first-ever 6,000-word PSL dictionary, PSL curricular resources, stories,
              and teacher training tutorials. Our PSL Learning Portal, the first resource of its
              kind in Pakistan, provides country-wide access to these educational resources for the
              Deaf, their teachers and families free of cost.
            </Paragraph>
            <Button size="large" width="maxContent" icons={{ leading: true }} link={{ href: '#' }}>
              Learn about PSL
            </Button>
          </div>
          <div className={styles.flexCol}>
            <div className={styles.imagesGrid}>
              <div className={styles.imagesGrid__gridItem}>
                <p className={styles.imageText}>
                  <span>Over 6000+ signs documented and digitized </span>
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
                    backgroundImage: `url(${Image1.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                >
                  {/* <Image
                    src={BoyRaisingHand}
                    alt="Boy raising his hand"
                    // width={208}
                    // height={268}
                    className={styles.imagesGrid__image}
                  /> */}
                </div>
              </div>
              <div className={styles.imagesGrid__gridItem}>
                <div
                  className={styles.imagesGrid__imageContainer}
                  style={{
                    backgroundImage: `url(${Image2.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                >
                  {/* <Image
                    src={DeafChildrenWithTeacher}
                    alt="Deaf children with teacher"
                    // width={346}
                    // height={286}
                    className={styles.imagesGrid__image}
                  /> */}
                </div>
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
                >
                  {/* <Image
                    src={DeafReachCampus}
                    alt="Deaf reach campus"
                    // width={276}
                    // height={296}
                    className={styles.imagesGrid__image}
                  /> */}
                </div>
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
                  {/* <Image
                    src={BoyAndGirlInLab}
                    alt="A boy and a girl in the lab observing"
                    // width={280}
                    // height={232}
                    className={styles.imagesGrid__image}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
