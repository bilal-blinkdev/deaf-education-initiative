'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import InputField from '@/components/elements/InputField';
import Button from '@/components/elements/Button';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { login, LoginResponse } from '@/app/(frontend)/login/_actions/login';
import { Turnstile } from '@marsidev/react-turnstile';
import styles from './styles.module.scss';

export default function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate Turnstile token
    if (!turnstileToken) {
      toast.error('Please complete the security verification', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
      return;
    }

    setIsPending(true);

    const formData = new FormData(e?.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const message = formData.get('message') as string;

    try {
      // Send contact form data including turnstile token
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          message,
          turnstileToken,
        }),
      });

      const result = await response.json();

      setIsPending(false);

      if (result.success) {
        toast.success('Message sent successfully!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
        // Reset form
        e.currentTarget.reset();
        setTurnstileToken('');
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
    } catch (error) {
      setIsPending(false);
      toast.error('Failed to send message', {
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

      {/* Turnstile Widget */}
      <div className="inputGroup">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={(token: any) => setTurnstileToken(token)}
          onError={() => {
            setTurnstileToken('');
            toast.error('Security verification failed. Please try again.', {
              position: 'top-center',
              autoClose: 5000,
              theme: 'colored',
            });
          }}
          onExpire={() => setTurnstileToken('')}
        />
      </div>

      <Button type="submit" width="full" size="large" disabled={isPending}>
        {!isPending ? 'Send message' : 'Sending...'}
      </Button>
    </form>
  );
}
