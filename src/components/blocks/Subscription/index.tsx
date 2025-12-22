'use client';

import { useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { subscribe, SubscriptionResponse } from '@/app/(frontend)/actions/subscribe';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Button from '@/components/elements/Button';
import styles from './styles.module.scss';

export default function SubscriptionBlock() {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e?.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;

    const result: SubscriptionResponse = await subscribe({ firstName, lastName, email });

    setIsPending(false);

    if (result.success) {
      toast.success('Subscribed successfully!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
    } else {
      toast.dismiss();
      toast.error(result.error || 'Error occurred', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
    }
  };

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
            <form action="" className={styles.subscriptionForm} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="firstName"
                  className={styles.input}
                  placeholder="First name"
                />
                <input
                  type="text"
                  name="lastName"
                  className={styles.input}
                  placeholder="Last name"
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  className={styles.input}
                  placeholder="Enter your email"
                />
                <Button type="submit" loading={isPending}>
                  Subscribe
                </Button>
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
      <ToastContainer />
    </section>
  );
}
