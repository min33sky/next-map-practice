import { InferGetServerSidePropsType } from 'next';
import React from 'react';

export default function GetServersidePropsExample({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <h1>getServerSideProps Page</h1>
      <p>값: {data}</p>
    </main>
  );
}

export async function getServerSideProps() {
  const delayInSeconds = 2;
  const data = await new Promise<number>((resolve) =>
    setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
  );

  /** https://web.dev/i18n/ko/stale-while-revalidate/ */
  // This value is considered fresh for five seconds (s-maxage=5).
  // If a request is repeated within the next 5 seconds, the previously
  // cached value will still be fresh.
  //
  // If the request is repeated before 5~15 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=10).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.

  //? SSR은 요청이 올 때마다 새로 랜더링을 하기때문에 SSG보다 사용자 경험이 좋지 않다.
  //? 인증과 같은 요청마다 다른 데이터를 불러오는 경우에는 SSR을 사용하자.
  //? URL query parameter가 page props로 반드시 필요한 경우에도 역시 getServerSideProps를 사용하자.

  //? getServerSideProps도 getStaticProps와 같이 사용할 수 있다. (근데 쓸 일 없을듯)
  // 5초 동안 캐시를 사용하고, 10초 동안은 캐시를 사용하되, 백그라운드에서 새로운 데이터를 가져온다.
  // 10초 이후에는 새로운 데이터를 가져온다.
  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=5, stale-while-revalidate=10'
  // );

  return {
    props: {
      data,
    },
  };
}
