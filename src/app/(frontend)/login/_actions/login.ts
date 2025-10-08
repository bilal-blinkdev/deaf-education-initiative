'use server';

import { getPayload } from 'payload';
import config from '@payload-config';
import { cookies } from 'next/headers';
import { Donor } from '@/payload-types';

type LoginParams = {
  email: string;
  password: string;
};
export type LoginResponse = {
  error?: string;
  success: boolean;
};
type Result = {
  exp?: number;
  token?: string;
  user?: Donor;
};

export async function login({ email, password }: LoginParams): Promise<LoginResponse> {
  const payload = await getPayload({ config });
  try {
    const result: Result = await payload.login({ collection: 'donors', data: { email, password } });

    if (result.token) {
      const cookieStore = await cookies();
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });

      return { success: true };
    } else {
      return { success: false, error: 'Invalid email or password' };
    }
  } catch (error) {
    console.log('Login error: ', error);
    let message = 'An error occurred';
    if (error instanceof Error) {
      message = error.message;
    }
    return { success: false, error: message };
  }
}
