// app/api/users/me/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { headers as getHeaders } from 'next/headers';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function GET() {
  const payload = await getPayload({ config: await configPromise });
  const headers = await getHeaders();
  const cookieStore = await cookies();
  const token = await cookieStore.get('payload-token')?.value;

  // If there's no token, there's no user
  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    // Payload's auth function validates the token and finds the user
    const { user } = await payload.auth({
      headers,
    });

    if (!user || user.collection !== 'donors') {
      return NextResponse.json({ error: 'You must be logged in to subscribe.' }, { status: 401 });
    }
    console.log('M2 USER: ', user.collection);
    // Return the user if found
    return NextResponse.json({ user });
  } catch (error) {
    // If the token is invalid, there's no user
    return NextResponse.json({ user: null });
  }
}
