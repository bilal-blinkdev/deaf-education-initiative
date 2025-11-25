import Button from '@/components/elements/Button';
import styles from './page.module.scss';
import ArrowLeft from '@/graphics/ArrowLeft';
import Container from '@/components/layout/Container';

export default function ThankYou() {
  return (
    <section className={styles.donationSuccess}>
      <Container>
        <div className={styles.success}>
          <div className={styles.success__header}>
            <video className={styles.success__video} autoPlay muted loop playsInline>
              <source src="/media/videos/donation-thankyou.mp4" type="video/mp4" />
              <source src="/media/videos/donation-thankyou.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className={styles.success__body}>
            <h2 className={styles.success__heading}>
              <span>Thank You For Your Donation</span>
            </h2>
            <p className={styles.success__description}>
              We have sent you an email with the donation information
            </p>
            <Button
              size="large"
              width="maxContent"
              link={{ href: '/' }}
              icons={{ trailing: true, type: <ArrowLeft /> }}
            >
              Home
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
