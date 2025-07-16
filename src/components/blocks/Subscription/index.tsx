import Link from 'next/link';
import Container from '@/components/layout/Container';
import Button from '@/components/elements/Button';
import styles from './styles.module.scss';

export default function SubscriptionBlock() {
  return (
    <section className={styles.subscriptionBlock}>
      <Container>
        <div className={styles.flexBlock}>
          <div className={styles.colOne}>
            <h2 className={styles.heading}>Stay Updated</h2>
            <p className={styles.description}>
              Subscribe to our mailing list and get updates on how you are helping us make an
              impact.
            </p>
          </div>
          <div className={styles.colTwo}>
            <form action="" className={styles.subscriptionForm}>
              <div className={styles.inputGroup}>
                <input type="text" className={styles.input} placeholder="First name" />
                <input type="text" className={styles.input} placeholder="Last name" />
              </div>
              <div className={styles.inputGroup}>
                <input type="text" className={styles.input} placeholder="Enter your email" />
                <Button type="submit">Subscribe</Button>
              </div>
            </form>
            <p className={styles.privacyPolicy}>
              We care about your data in our{' '}
              <Link href="" className={styles.privacyPolicyLink}>
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
