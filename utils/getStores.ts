import { Store } from '@/types/store';

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export async function getStores() {
  const data = await fetch(`${baseUrl}/api/stores`).then((res) => res.json());

  return data;
}
