import Header from '@/components/common/Header';
import Link from 'next/link';
import styles from '@/styles/header.module.scss';
import { VscFeedback } from 'react-icons/vsc';
import { AiOutlineShareAlt } from 'react-icons/ai';
import MapSection from '@/components/home/MapSection';
import { InferGetStaticPropsType } from 'next';
import useStores from '@/hooks/useStores';
import { useEffect } from 'react';
import { Store } from '@/types/store';

export default function Home({
  stores,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('## 상점 정보: ', stores);

  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  return (
    <>
      <Header
        rightElements={[
          <button
            onClick={() => alert('복사')}
            className={styles.box}
            key="button"
          >
            <AiOutlineShareAlt size={20} />
          </button>,
          <Link href={'/feedback'} className={styles.box} key="link">
            <VscFeedback size={20} />
          </Link>,
        ]}
      />
      <main style={{ width: '100%', height: '100%' }}>
        <MapSection />
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
