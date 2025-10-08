import Link from 'next/link';
import Container from '@/components/layout/Container';
import LoginForm from '@/components/sections/LoginForm';
import Heading from '@/components/elements/Heading';
import styles from './styles.module.scss';

export default function Login() {
  return (
    <section className={styles.login}>
      <Container customClass={styles.loginContainer}>
        <Heading level={1}>Login</Heading>
        <LoginForm />
        <p className={styles.signupMessage}>
          Don't have an account?{' '}
          <Link href={'/signup'} className={styles.signupLink}>
            Signup
          </Link>{' '}
          to donate
        </p>
      </Container>
    </section>
  );
}
