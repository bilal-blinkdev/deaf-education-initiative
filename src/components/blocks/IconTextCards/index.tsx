import Container from '@/components/layout/Container';
import HandsShake from '@/graphics/HandsShake';
import Inclusion from '@/graphics/Inclusion';
import RaisedFist from '@/graphics/RaisedFist';
import HandsHoldingGlobe from '@/graphics/HandsHoldingGlobe';
import styles from './styles.module.scss';

type IconTextCardsProps = {
  sectionClass: string;
  customClass?: string;
};

export default function IconTextCards({ sectionClass, customClass }: IconTextCardsProps) {
  const data = [
    {
      icon: <HandsShake />,
      title: 'Respect',
      description:
        'We respect all people, and support and advocate for children and youth who face challenges due to disability.',
    },
    {
      icon: <Inclusion />,
      title: 'Inclusiveness',
      description:
        'We succeed by effectively working with others, both internal and external, to our organization and schools. We come together in common cause to create and implement solutions in our local communities.',
    },
    {
      icon: <RaisedFist />,
      title: 'Empowerment',
      description:
        'We believe that every child deserves access to language and education that will empower them to reach their full potential, be socially engaged, and experience an improved quality of life.',
    },
    {
      icon: <HandsHoldingGlobe />,
      title: 'Lasting Impact',
      description:
        'We strive to achieve significant and lasting impact in the lives of the children and youth we serve. We embrace innovation, responsiveness, and technology to become agents of development and change.',
    },
  ];
  return (
    <section className={`${styles[sectionClass ?? '']} ${customClass}`}>
      <Container>
        <h2 className={styles.heading}>Our Core Values</h2>
        <section className={styles.cards}>
          {data.map((card, index) => (
            <Card icon={card.icon} title={card.title} description={card.description} key={index} />
          ))}
        </section>
      </Container>
    </section>
  );
}

type CardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function Card({ icon, title, description }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.card__icon}>{icon}</div>
      <h3 className={styles.card__title}>{title}</h3>
      <p className={styles.card__description}>{description}</p>
    </div>
  );
}
