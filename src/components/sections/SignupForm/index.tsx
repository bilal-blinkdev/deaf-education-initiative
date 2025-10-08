'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/elements/InputField';
import Button from '@/components/elements/Button';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { signup, SignupResponse } from '@/app/(frontend)/signup/_actions/signup';
import styles from './styles.module.scss';

export default function SignupForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e?.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      toast.dismiss();
      toast.error('Passwords do not match', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
      setIsPending(false);
      return;
    }
    const result: SignupResponse = await signup({ email, password });

    setIsPending(false);

    if (result.success) {
      toast.dismiss();
      toast.success('Login successful! Redirecting...', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
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
    <form className={styles.signupForm} onSubmit={handleSubmit}>
      <div className="inputGroup">
        <p className="inputGroupLabel">
          Name<span className="required">*</span>
        </p>
        <InputField
          type="text"
          name="name"
          placeholder="Full name"
          required={true}
          onChange={() => {}}
        />
      </div>
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
      <div className="inputGroup">
        <p className="inputGroupLabel">
          Confirm Password<span className="required">*</span>
        </p>
        <InputField
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          required={true}
          onChange={() => {}}
        />
      </div>
      <ToastContainer />
      <Button type="submit" width="full" size="large" disabled={isPending}>
        {!isPending ? 'Signup' : 'Signing up...'}
      </Button>
    </form>
  );
}
