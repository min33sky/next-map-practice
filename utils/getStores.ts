import { Store } from '@/types/store';

export async function getStores() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || process.env.VERCEL_URL}/api/stores`
  ).then((res) => res.json());

  return data;
}
