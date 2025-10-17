import Image from 'next/image';
import Container from '@/components/layout/Container';
import Button from '@/components/elements/Button';
import SchoolGirlsRaisingHands from '@/assets/school-girls-raising-hands.webp';
import styles from './styles.module.scss';

export default function TwoColumnCard() {
  return (
    <section className={styles.twoColumnCard}>
      <Container>
        <div className={styles.card}>
          <div className={styles.cardBody}>
            <div className={styles.colOne}>
              <h3 className={styles.title}>
                Less Than 5% of the One Million Deaf Children in Pakistan Attend School
              </h3>
              <p className={styles.description}>
                Your donations can help make quality Deaf Education accessible to more children.
                Together, we can make education a reality for deaf children across Pakistan.
              </p>
              <Button size="large" width="maxContent" link={{ href: '/donate' }}>
                Donate Now
              </Button>
            </div>
            <div className={styles.colTwo}>
              <div className={styles.imageHolder}>
                <Image
                  src={SchoolGirlsRaisingHands}
                  alt="School Girls Raising Hands"
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
