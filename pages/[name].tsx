import type { Store } from '@/types/store';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import styles from '@/styles/detail.module.scss';
import DetailHeader from '@/components/home/DetailHeader';
import DetailContent from '@/components/home/DetailContent';
import { useRouter } from 'next/router';
import useCurrentStore from '@/hooks/useCurrentStore';

/**
 * 상품 상세 페이지
 */
export default function StoreDetail({
  store,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const expanded = true;

  const router = useRouter();
  const { setCurrentStore } = useCurrentStore();

  const goToMap = () => {
    setCurrentStore(store!);
    router.push(`
    /?zoom=15&lat=${store!.coordinates[0]}&lng=${store!.coordinates[1]}
  `);
  };

  return (
    <div className={`${styles.detailSection} ${styles.expanded}`}>
      <DetailHeader
        expanded={expanded}
        currentStore={store}
        onClickArrow={goToMap}
      />

      <DetailContent currentStore={store} expanded={expanded} />
    </div>
  );
}

/** https://nextjs.org/docs/basic-features/data-fetching/get-static-paths */
export const getStaticPaths: GetStaticPaths = async () => {
  const stores = (await import('@/public/stores.json')).default;

  const paths = stores.map((store) => ({
    params: { name: store.name },
  }));

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const stores = (await import('@/public/stores.json')).default as Store[];

  const store = stores.find((store) => store.name === params?.name);

  return {
    props: {
      store,
    },
  };
}
