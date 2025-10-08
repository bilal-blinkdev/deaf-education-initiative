'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import InputField from '@/components/elements/InputField';
import Button from '@/components/elements/Button';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { login, LoginResponse } from '@/app/(frontend)/login/_actions/login';
import styles from './styles.module.scss';

export default function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e?.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result: LoginResponse = await login({ email, password });

    setIsPending(false);

    if (result.success) {
      router.push('/');
    } else {
      toast.dismiss();
      toast.error(result.error || 'An error occurred', {
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
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div className="inputGroup">
        <p className="inputGroupLabel">
          Email<span className="required">*</span>
        </p>
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          required={true}
          onChange={() => {}}
        />
      </div>
      <div className="inputGroup">
        <p className="inputGroupLabel">
          Password<span className="required">*</span>
        </p>
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          required={true}
          onChange={() => {}}
        />
      </div>
      <p className={styles.message}>
        Forgot password?{' '}
        <Link href={'/forgot-password'} className={styles.link}>
          Recover
        </Link>{' '}
        your account
      </p>
      <ToastContainer />
      <Button type="submit" width="full" size="large" disabled={isPending}>
        {!isPending ? 'Login' : 'Logging in...'}
      </Button>
    </form>
  );
}
