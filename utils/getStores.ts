import { Store } from '@/types/store';

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export async function getStores() {
  const data = await fetch(`${baseUrl}/api/stores`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  console.log('베이스유알엘::::: ', baseUrl);
  console.log('##### API 불러오기: ', data);

  return data;
}
