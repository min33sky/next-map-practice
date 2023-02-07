import MapSection from '@/components/home/MapSection';
import { InferGetStaticPropsType } from 'next';
import useStores from '@/hooks/useStores';
import { useEffect } from 'react';
import { Store } from '@/types/store';
import Header from '@/components/home/Header';
import DetailSection from '@/components/home/DetailSection';
import { NextSeo } from 'next-seo';

export default function Home({
  stores,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  return (
    <>
      <NextSeo
        title="매장 지도"
        description="Next.js 시작하기 강의를 위한 매장 지도 서비스입니다."
        canonical="https://next-map-tuto.vercel.app"
      />
      <Header />
      <main
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
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
