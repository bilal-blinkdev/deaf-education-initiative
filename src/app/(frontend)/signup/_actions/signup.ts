'use server';

import { getPayload } from 'payload';
import config from '@payload-config';
import { cookies } from 'next/headers';
import { Donor } from '@/payload-types';

type SignupParams = {
  email: string;
  password: string;
};
export type SignupResponse = {
  error?: string;
  success: boolean;
};
type Result = {
  exp?: number;
  token?: string;
  user?: Donor;
};

export async function signup({ email, password }: SignupParams): Promise<SignupResponse> {
  const payload = await getPayload({ config });

  try {
    const find = await payload.find({
      collection: 'donors',
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (find.totalDocs === 0) {
      try {
        await payload.create({ collection: 'donors', data: { email, password } });

        const result: Result = await payload.login({
          collection: 'donors',
          data: { email, password },
        });

        if (result.token) {
          const cookieStore = await cookies();
          cookieStore.set('payload-token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
          });
          return { success: true };
        } else return { success: true, error: 'Login failed' };
      } catch (error) {
        console.error('Login error: ', error);
        let message = 'Login Failed';
        if (error instanceof Error) {
          message = error.message;
        }
        return { success: false, error: message };
      }
    } else {
      return { success: false, error: 'Account already exists' };
    }
  } catch (error) {
    console.error('Signup error: ', error);
    return { success: false, error: 'An error occurred' };
  }
}
