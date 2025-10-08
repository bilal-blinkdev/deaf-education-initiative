// app/lib/server/protected-route.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { headers as getHeaders } from 'next/headers';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Donor } from '@/payload-types'; // Make sure this path is correct

// Define the type for the function that your route handler will be
type AuthenticatedHandler = (args: {
  req: NextRequest;
  user: Donor;
}) => Promise<NextResponse | Response>;

// This is the main wrapper function
export const authenticatedRoute = (handler: AuthenticatedHandler) => {
  return async (req: NextRequest) => {
    const payload = await getPayload({ config: await configPromise });
    const headers = await getHeaders();

    const cookieStore = await cookies();
    const token = cookieStore.get('payload-token')?.value;

    if (!token) {
      return new Response('Unauthorized: No token provided', { status: 401 });
    }

    try {
      // This verifies the token and gets the user
      // const { user } = await payload.auth({
      //   headers: new Headers({ Authorization: `JWT ${token}` }),
      // });
      const { user } = await payload.auth({
        headers,
      });

      // Ensure the user exists and is from the correct collection
      if (!user || user.collection !== 'donors') {
        return new Response('Unauthorized: Invalid user', { status: 401 });
      }

      // If everything is valid, call your actual API logic
      return handler({ req, user: user as Donor });
    } catch (error) {
      return new Response('Unauthorized: Invalid token', { status: 401 });
    }
  };
};
