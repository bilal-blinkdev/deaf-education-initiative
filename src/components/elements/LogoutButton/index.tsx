'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/(frontend)/(authenticated)/_actions/logout';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Button from '../Button';
import Exit from '@/graphics/Exit';
import styles from './styles.module.scss';
import { useAuth } from '@/hooks/useAuth';

export default function LogoutButton({
  style = 'text',
  width = 'auto',
}: {
  style?: 'default' | 'soft' | 'text' | 'outline';
  width?: 'half' | 'full' | 'auto' | 'maxContent';
}) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const handleLogout = async () => {
    setIsPending(true);
    const result = await logout();
    setIsPending(false);

    if (result.success) {
      router.refresh();
      router.push('/login');
    } else {
      toast.dismiss();
      toast.success(result.error || 'Logout failed', {
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
    <>
      {isLoggedIn && (
        <>
          <Button
            size="large"
            width={width}
            style={style}
            onClick={handleLogout}
            disabled={isPending}
          >
            <Exit />
          </Button>
          <ToastContainer />
        </>
      )}
    </>
  );
}
