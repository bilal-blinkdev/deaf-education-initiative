// import { Category, Publication, AnalyticsPlatform } from '@/payload-types';

type PayloadCollectionResponse<T> = {
  docs: T[];
};

export async function fetchPayload<T>(endpoint: string): Promise<T[]> {
  const fullUrl = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${endpoint}`;

  try {
    const res = await fetch(fullUrl, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Failed to fetch ${fullUrl}: ${res.statusText}`);
      return [];
    }

    const data: PayloadCollectionResponse<T> = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error(`Network error fetching ${fullUrl}:`, error);
    return [];
  }
}
