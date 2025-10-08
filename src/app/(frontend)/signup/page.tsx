import Link from 'next/link';
import Container from '@/components/layout/Container';
import SignupForm from '@/components/sections/SignupForm';
import Heading from '@/components/elements/Heading';
import styles from './styles.module.scss';

export default function Signup() {
  return (
    <section className={styles.signup}>
      <Container customClass={styles.signupContainer}>
        <Heading level={1}>Signup</Heading>
        <SignupForm />
        <p className={styles.loginMessage}>
          Already have an account?{' '}
          <Link href={'/login'} className={styles.loginLink}>
            Login
          </Link>{' '}
          to donate
        </p>
      </Container>
    </section>
  );
}
