import Container from '@/components/layout/Container';
import BoyRaisingHand from '@/assets/boy-raising-hand.webp';
import GirlUsingLaptop from '@/assets/girl-using-laptop.webp';
import GirlsWorkingOnComputers from '@/assets/girls-working-on-computers.webp';
import TeacherTraining from '@/assets/teacher-training.webp';
import Button from '@/components/elements/Button';
import SwiperCardsOverflow from '@/components/sections/SwiperCardsOverflow';
import styles from './styles.module.scss';

export default function CardsOverflowSlider() {
  const cards = [
    {
      image: { src: BoyRaisingHand, alt: 'Boy Raising Hand' },
      title: 'Schools, Training Centres & Colleges',
      description:
        'Deaf Reach provides a holistic model for formal deaf education, academic literacy, and vocational skills training to deaf children and youth. Deaf Reach is the only branch network of schools in Pakistan bridging the immense education gap for deaf community in the country.',
      cta: {
        text: 'Learn More',
        url: '',
      },
    },
    {
      image: { src: GirlUsingLaptop, alt: 'Girl Using Laptop' },
      title: 'Job Placement',
      description:
        'Deaf Reach is driven by the overarching goal of empowering individuals holistically and creating opportunities for them to thrive, not just academically but also economically. To fulfill this, our Job Placement program actively works to locate and facilitate employment for both its graduates and the wider Deaf community, ensuring a pathway to financial independence and success.',
      cta: {
        text: 'Learn More',
        url: '',
      },
    },
    {
      image: {
        src: GirlsWorkingOnComputers,
        alt: 'Girls Working on Computers',
      },
      title: 'Digital Sign Language Resources',
      description:
        'Deaf Reach has leveraged digital technology to document Pakistan Sign Language (PSL), producing the first-ever 7,500-word PSL dictionary, PSL curricular resources, stories, and teacher training tutorials. Our PSL Learning Portal, the first resource of its kind in Pakistan, provides country-wide access to these educational resources for the Deaf, their teachers and families free of cost.',
      cta: {
        text: 'Learn More',
        url: '',
      },
    },
    {
      image: {
        src: TeacherTraining,
        alt: 'Teacher Training',
      },
      title: 'Teacher Training',
      description:
        'Our Teacher Training Program ensures that all our educators are well-equipped to meet the unique learning needs of our students by regular trainings. In addition to building capacity in local teachers of the Deaf, we also work on developing new student teacher trainees. Over 50% of Deaf Reach teaching staff are deaf.',
      cta: {
        text: 'Learn More',
        url: '',
      },
    },
  ];
  return (
    <section className={styles.cardsOverflowSlider}>
      <Container>
        {/* <p className={styles.subHeading}>Programs That Make a Difference</p> */}
        <h2 className={styles.heading}>Our Featured Programs</h2>
        <section className={styles.slider}>
          <SwiperCardsOverflow cards={cards} />
        </section>
        <Button
          style="text"
          customClass={styles.ctaButton}
          link={{ href: '' }}
          icons={{ leading: true, width: '28', height: '28', color: '#fff' }}
        >
          <span>Read more about our programs</span>
        </Button>
      </Container>
    </section>
  );
}
