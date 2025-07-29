import Image, { StaticImageData } from 'next/image';
import Container from '@/components/layout/Container';
import StudentWriting from '@/assets/student-writing.webp';
import StudentWearingGraduationGown from '@/assets/student-wearing-graduation-gown.webp';
import Teacher from '@/assets/teacher.webp';
import styles from './styles.module.scss';

type CardProps = {
  image: { image: StaticImageData; alt: string };
  title: string;
  description: string;
};

export default function Cards() {
  return (
    <section className={styles.cards}>
      <Container>
        {/* <p className={styles.subHeading}>Transforming Lives, One Deaf Child At A Time</p> */}
        <h2 className={styles.heading}>How we can make a difference?</h2>
        <p className={styles.description}>
          Deaf Education Initiative envisions a future where quality education is a reality for
          every deaf child in Pakistan, as we work together with our local communities to educate,
          inspire, and empower.
        </p>
        <section className={styles.cardsBox}>
          <Card
            image={{ image: StudentWriting, alt: 'Student Writing' }}
            title="Educating"
            description="Nearly one million deaf children in Pakistan are deprived of education and language development. We are breaking this cycle by enabling access to quality education in their own language i.e. sign language."
          />
          <Card
            image={{
              image: StudentWearingGraduationGown,
              alt: 'Student Wearing Graduation Gown Writing',
            }}
            title="Inspiring"
            description="By working together with our partners, donors, and volunteers, we inspire lasting change and hope for generations to come."
          />
          <Card
            image={{ image: Teacher, alt: 'Teacher teaching a class' }}
            title="Empowering"
            description="Every child deserves more than just education. DEI is providing them with social as well as professional development, ensuring a brighter and meaningful future for them and their families."
          />
        </section>
      </Container>
    </section>
  );

  function Card({ image, title, description }: CardProps) {
    return (
      <div className={styles.card}>
        <Image src={image.image} alt={image.alt} />
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    );
  }
}
