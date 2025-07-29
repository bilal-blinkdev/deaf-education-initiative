import Container from '@/components/layout/Container';
import GirlClassroomWriting from '@/assets/girl-classroom-writing-pencil-in-hand.webp';
import Shahida from '@/assets/shahida.webp';
import Family from '@/assets/family.webp';
import SwiperCardsTwoColumnOverflow from '@/components/sections/SwiperTwoColumnCards';
import styles from './styles.module.scss';

export default function TestimonialsSlider() {
  const cards = [
    {
      image: { src: GirlClassroomWriting, alt: 'Girl Classroom Writing' },
      quote:
        'I am proud to be the first person in my family to get an education higher than primary grade.',
      author: 'Neha',
      designation: 'Deaf Reach, Rashidabad',
    },
    {
      image: { src: Shahida, alt: 'Shahida' },
      quote:
        'Enrolling my daughter at Deaf Reach has been highly rewarding for me as she continues to learn and become self-reliant.',
      author: 'Shahida Parveen',
      designation: 'Parent - Deaf Reach Supporter, Sukkur',
    },
    {
      image: { src: Family, alt: 'Family' },
      quote:
        'Since Bakhtawar and her brother have joined Deaf Reach School, we have been happy to see a change in them. She has become my teacher in improving my sign language. ',
      author: 'Abdul Ghaffar Soomro',
      designation: 'Parent of student at Deaf Reach, Sukkur Campus',
    },
  ];
  return (
    <section className={styles.cardsOverflowSlider}>
      <Container>
        <p className={styles.subHeading}>Our Impact</p>
        <h2 className={styles.heading}>In Their Own Words</h2>
        <section className={styles.slider}>
          <SwiperCardsTwoColumnOverflow cards={cards} />
        </section>
      </Container>
    </section>
  );
}
