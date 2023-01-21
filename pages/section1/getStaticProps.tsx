import { InferGetStaticPropsType } from 'next';
import React from 'react';

/**
 * SSG - Static Site Generation 예제
 */
export default function GetStaticPropsExample({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <h1>getStaticProps Page</h1>
      <p>값: {data}</p>
    </main>
  );
}

export async function getStaticProps() {
  const delayInSeconds = 2;
  const data = await new Promise<number>(
    (resolve) => setTimeout(() => resolve(Math.random()), delayInSeconds * 1000) // props가 변경되므로 다시 빌드한다.
    // setTimeout(() => resolve(1557), delayInSeconds * 1000) // props가 변경되지 않으므로 다시 빌드하지 않는다.
  );

  //? 개발모드에서는 getStaticProps가 호출될 때마다 새로운 값을 생성한다.
  //? 빌드 후 배포모드에서는 getStaticProps가 호출될 때마다 새로운 값을 생성하지 않는다.
  //? ISR: revalidate 옵션을 사용하면, 빌드 후 배포모드에서도 지정한 시간 이후에
  //? getStaticProps가 호출된다면 다시 빌드를 수행한다. (전체 빌드가 아닌 해당 페이지만 다시 빌드!! )
  //! props의 값이 변경되었을 때만 다시 빌드를 수행한다. (ETag를 사용하여 변경 여부를 확인한다.)
  //? 헤더의 ETag, x-nextjs-cache 값을 확인해보자.
  //? revalidate 시간이 지나 x-nextjs-cache가 stale이면 서버에서 pre-rendering을 수행하며 다시 페이지를 요청 시
  //? 새로 랜더링 된 페이지를 제공한다. (props가 변경되지 않았다면 랜더링을 하지않고 ETag가 변경되지 않는다.)
  return {
    props: {
      data,
    },
    revalidate: 5, //? 5초 이후에 다시 빌드를 수행한다.
  };
}
