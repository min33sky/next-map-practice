import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

/**
 * Next Routing 예제
 */
export default function LinksExample() {
  const router = useRouter();

  //? Link 컴포넌트와 달리 useRouter를 사용하면 컴포넌트가 화면에 노출시 prefetch 설정을
  //? 아래와 같이 수동으로 설정해야 한다.
  //* 특별한 경우가 아니라면 Link 컴포넌트를 사용하자.
  useEffect(() => {
    router.prefetch('/section1/getStaticProps');
  }, [router]);

  //? Next13에서는 Link 컴포넌트가 a 태그를 완전 대체하므로 a 태그를 사용할 필요가 없다.
  //? 그래서 a 태그에 style을 적용할 수 있다.
  return (
    <main>
      <h1>Links</h1>
      <button
        onClick={() => {
          router.push('/section1/getStaticProps');
        }}
      >
        /getStaticProps
      </button>

      {/* <div style={{ height: '200vh' }}></div>
      <Link href={'/section1/getStaticProps'} style={{ color: 'red' }}>
        /getStaticProps
      </Link> */}
    </main>
  );
}
