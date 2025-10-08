export async function fetchGlobal<T>(slug: string, depth: number = 0): Promise<T | null> {
  const endpoint = `/api/globals/${slug}?depth=${depth}`;
  const fullUrl = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${endpoint}`;

  try {
    const res = await fetch(fullUrl, {
      cache: 'no-store', // Or your desired cache policy
    });

    if (!res.ok) {
      console.error(`Failed to fetch global '${slug}': ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`Network error fetching global '${slug}':`, error);
    return null;
  }
}
