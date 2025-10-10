import Image from 'next/image';
import Container from '@/components/layout/Container';
import Image1 from '@/assets/boy-raising-hand.webp';
import Image2 from '@/assets/deaf-children-with-teacher.webp';
import Image3 from '@/assets/deaf-reach-training-center.webp';
import Image4 from '@/assets/boy-and-girl-in-lab.webp';
import HandDrawnUnderlines from '@/graphics/HandDrawnUnderlines';
import HandDrawnTwinkle from '@/graphics/HandDrawnTwinkle';
import styles from './styles.module.scss';
import HeadingOverline from '@/components/elements/HeadingOverline';
import Heading from '@/components/elements/Heading';
import Paragraph from '@/components/elements/Paragraph';
import CompanyEmployees from '@/graphics/CompanyEmployees';
import Button from '@/components/elements/Button';

export default function OurVision() {
  return (
    <section className={styles.digitalSignTraining}>
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
                <p className={styles.imageText}>
                  <span>
                    Approximately 1 million deaf children in Pakistan, only 5% have access to
                    quality education
                  </span>
                  <span>
                    <HandDrawnUnderlines
                      color="var(--yellow)"
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
          <div className={styles.flexCol}>
            <HeadingOverline align="left" color="var(--yellow)">
              Our Vision is Quite Simple
            </HeadingOverline>
            <Heading level={2} color="var(--white)">
              Ensuring No Deaf Child Goes Without Literacy and Learning
            </Heading>
            <Paragraph color="var(--white)">
              We believe education is a right, not a privilege. Every deaf child has a right to have
              access to quality education that meets their learning needs.
            </Paragraph>
            <Paragraph color="var(--white)">
              Since the past 35+ years, Deaf Reach has been dedicated to working towards empowerment
              of the Deaf community in Pakistan. What began as a small club for the Deaf has grown
              into the country’s only branch network of schools, colleges, and training centers
              dedicated to serving the Deaf community.
            </Paragraph>
            <Paragraph color="var(--white)">
              Dedicated to bridging the education gap, DEI is committed to transforming lives by
              providing accessible, high-quality education and opportunities that enable all deaf
              children to lead meaningful and financially independent lives.
            </Paragraph>
          </div>
        </div>
      </Container>
    </section>
  );
}
