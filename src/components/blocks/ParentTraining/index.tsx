import Image from 'next/image';
import Container from '@/components/layout/Container';
import Image1 from '@/assets/programs/parent-training-class.webp';
import Image2 from '@/assets/programs/parent-training-class-2.webp';
import Image3 from '@/assets/programs/parent-training-class-3.webp';
import HandDrawnUnderlines from '@/graphics/HandDrawnUnderlines';
import HandDrawnTwinkle from '@/graphics/HandDrawnTwinkle';
import styles from './styles.module.scss';
import HeadingOverline from '@/components/elements/HeadingOverline';
import Heading from '@/components/elements/Heading';
import Paragraph from '@/components/elements/Paragraph';
import CompanyEmployees from '@/graphics/CompanyEmployees';
import PersonalDevelopment from '@/graphics/PersonalDevelopment';
import TrainingSession from '@/graphics/TrainingSession';
import Button from '@/components/elements/Button';

export default function ParentTraining() {
  return (
    <section className={styles.parentTraining}>
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
            </div>
          </div>
          <div className={styles.flexCol}>
            <Heading level={2}>Parent Training</Heading>
            <Paragraph>
              Through the Parent Training Program, parents are provided with training in Pakistan
              Sign Language (PSL). This initiative empowers parents, enabling them to establish
              stronger connections and effective communication with their Deaf children while
              actively participating in their child’s development.
            </Paragraph>
            <Button size="large" width="maxContent" icons={{ leading: true }} link={{ href: '#' }}>
              Learn about PSL
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
