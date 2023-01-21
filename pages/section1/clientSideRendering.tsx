import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

//? 빌드 시 browser에서만 존재하는 window, document 등의 객체를 사용 시 에러가 발생한다.
//? 이를 해결하기 위해 dynamic import를 사용한다.
const NoSSR = dynamic(() => import('@/components/section1/NoSSR'), {
  ssr: false,
});

export default function ClientSideRenderingExample() {
  const [data, setData] = useState(0);

  useEffect(() => {
    const delayInSeconds = 2;
    new Promise<number>((resolve) =>
      setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
    ).then((data) => setData(data));
  }, []);

  return (
    <main>
      <h1>Client-side data fetching</h1>
      <p>값: {data}</p>

      <h1>no SSR</h1>
      <NoSSR />
    </main>
  );
}
