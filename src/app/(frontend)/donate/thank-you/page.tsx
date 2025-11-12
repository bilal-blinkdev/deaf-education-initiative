import Button from '@/components/elements/Button';
import styles from './page.module.scss';
import ArrowLeft from '@/graphics/ArrowLeft';
import Container from '@/components/layout/Container';

export default function ThankYou() {
  return (
    <section className={styles.donationSuccess}>
      <Container>
        <div className={styles.success}>
          <h2 className={styles.success__heading}>
            <span>Thank You for Your Support!</span>
          </h2>
          <p className={styles.success__description}>
            Thank you for supporting Deaf Education Initiative’s cause with your generous donation!
            You’re helping make dreams come true and changing lives for the better.
          </p>
          <Button
            size="large"
            width="auto"
            link={{ href: '/' }}
            icons={{ trailing: true, type: <ArrowLeft /> }}
          >
            Home
          </Button>
        </div>
      </Container>
    </section>
  );
}
