import Header from '@/components/common/Header';
import FeedbackSection from '@/components/feedback/FeedbackSection';
import { getFeedbackListFromFirestore } from '@/firebase/feedback';
import { InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';

/**
 * 피드백 페이지
 */
export default function Feedback({
  initialFeedbackList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <NextSeo
        title="피드백"
        description="매장 지도 서비스에 대한 피드백을 받습니다."
        canonical="https://next-map-tuto.vercel.app/feedback"
      />
      <Header />

      <main
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          touchAction: 'pinch-zoom',
        }}
      >
        <FeedbackSection initialFeedbackList={initialFeedbackList} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const initialFeedbackList = await getFeedbackListFromFirestore();
  // const initialFeedbackList: any[] = []; // TODO: 지워라!!
  return {
    props: {
      initialFeedbackList,
    },
  };
}
