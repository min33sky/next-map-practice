import MapSection from '@/components/home/MapSection';
import { InferGetStaticPropsType } from 'next';
import useStores from '@/hooks/useStores';
import { useEffect } from 'react';
import { Store } from '@/types/store';
import Header from '@/components/home/Header';
import DetailSection from '@/components/home/DetailSection';

export default function Home({
  stores,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  return (
    <>
      <Header />
      <main style={{ position: 'relative', width: '100%', height: '100%' }}>
        <MapSection />
        <DetailSection />
      </main>
    </>
  );
}

export async function getStaticProps() {
  // TODO: next api routes로 불러오기
  const stores = (await import('../public/stores.json')).default as Store[];

  return {
    props: {
      stores,
    },
    revalidate: 60 * 60, // 1 hour (상점 정보는 자주 바뀌지 않기 때문에 갱신을 빠르게 할 필요는 없다.)
  };
}
