'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import InputField from '@/components/elements/InputField';
import Button from '@/components/elements/Button';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { login, LoginResponse } from '@/app/(frontend)/login/_actions/login';
import styles from './styles.module.scss';

export default function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e?.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const message = formData.get('message') as string;

    // const result: LoginResponse = await login({ email, password });

    // setIsPending(false);

    // if (result.success) {
    //   router.push('/');
    // } else {
    //   toast.dismiss();
    //   toast.error(result.error || 'An error occurred', {
    //     position: 'top-center',
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: false,
    //     pauseOnHover: true,
    //     progress: undefined,
    //     theme: 'colored',
    //     transition: Bounce,
    //   });
    // }
  };
  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <div className="inputGroup">
        <p className="inputGroupLabel">
          Your name<span className="required">*</span>
        </p>
        <InputField type="text" name="name" placeholder="John Doe" required={true} />
      </div>
      <div className="inputGroup">
        <p className="inputGroupLabel">
          Email address<span className="required">*</span>
        </p>
        <InputField type="email" name="email" placeholder="john@gmail.com" required={true} />
      </div>
      <div className="inputGroup">
        <p className="inputGroupLabel">
          Phone number<span className="required">*</span>
        </p>
        <InputField type="tel" name="phoneNumber" placeholder="Contact number" required={true} />
      </div>
      <div className="inputGroup">
        <p className="inputGroupLabel">
          Message<span className="required">*</span>
        </p>
        <textarea className="textarea" placeholder="Type here" rows={6} />
      </div>
      <ToastContainer />
      <Button type="submit" width="full" size="large" disabled={isPending}>
        {!isPending ? 'Send message' : 'Sending...'}
      </Button>
    </form>
  );
}
