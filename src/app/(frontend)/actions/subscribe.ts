'use server';

import { getPayload } from 'payload';
import config from '@payload-config';

type SubscriptionParams = {
  firstName: string;
  lastName: string;
  email: string;
};
export type SubscriptionResponse = {
  error?: string;
  success: boolean;
};

export async function subscribe({ firstName, lastName, email }: SubscriptionParams) {
  const payload = await getPayload({ config });

  try {
    await payload.create({
      collection: 'mail-list-subscribers',
      data: {
        firstName,
        lastName,
        email,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error occurred while subscribing to maillist:', error.data);

    return {
      success: false,
      error: error?.data?.errors?.[0]?.message || error?.message || 'Invalid email address',
    };
  }
}
