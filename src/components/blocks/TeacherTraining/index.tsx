import Image from 'next/image';
import Container from '@/components/layout/Container';
import Image1 from '@/assets/programs/staff-group-psl-signs-training-class.webp';
import Image2 from '@/assets/programs/teachers-training.webp';
import Image3 from '@/assets/programs/teacher-training-on-video.webp';
import HandDrawnUnderlines from '@/graphics/HandDrawnUnderlines';
import HandDrawnTwinkle from '@/graphics/HandDrawnTwinkle';
import styles from './styles.module.scss';
import HeadingOverline from '@/components/elements/HeadingOverline';
import Heading from '@/components/elements/Heading';
import Paragraph from '@/components/elements/Paragraph';
import CompanyEmployees from '@/graphics/CompanyEmployees';
import PersonalDevelopment from '@/graphics/PersonalDevelopment';
import TrainingSession from '@/graphics/TrainingSession';

export default function TeacherTraining() {
  return (
    <section className={styles.teacherTraining}>
      <Container customClass={styles.container}>
        <div className={styles.flexBox}>
          <div className={styles.flexCol}>
            <Heading level={2}>Teacher Training</Heading>
            <Paragraph>
              Our Teacher Training Program ensures that all our educators are well-equipped to meet
              the unique learning needs of our students by regular trainings. In addition to
              building capacity in local teachers of the Deaf, we also work on developing new
              student teacher trainees. Over 50% of Deaf Reach teaching staff are deaf.
            </Paragraph>
            <div className={styles.iconAndContent}>
              <PersonalDevelopment />
              <div className={styles.content}>
                <Heading level={3}>Teacher Development</Heading>
                <Paragraph>
                  There is a critical need for trained teachers of the Deaf capacitated to educate
                  students in Pakistan Sign Language with visual learning methodologies tailored to
                  the learning needs of deaf students. Deaf Reach identifies high achieving deaf
                  students and provides training for them to pursue a career in Deaf education.
                </Paragraph>
              </div>
            </div>
            <div className={styles.iconAndContent}>
              <TrainingSession />
              <div className={styles.content}>
                <Heading level={3}>Training Sessions</Heading>
                <Paragraph>
                  Regular training sessions are conducted throughout the year to provide teachers
                  with ongoing training and support in their career development. Trainees gain
                  hands-on experience by interning with leading teachers, with many growing into
                  positions of leadership. Currently, 50 percent of Deaf Reach’s teaching staff are
                  deaf.
                </Paragraph>
              </div>
            </div>
          </div>
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
                  <span>Over 1700+ teachers trained </span>
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
        </div>
      </Container>
    </section>
  );
}
