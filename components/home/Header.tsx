import Header from '@/components/common/Header';
import Link from 'next/link';
import styles from '@/styles/header.module.scss';
import { VscFeedback } from 'react-icons/vsc';
import { AiOutlineShareAlt } from 'react-icons/ai';
import useMap from '@/hooks/useMap';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import copy from 'copy-to-clipboard';

export default function HomeHeader() {
  const { getMapOptions, resetMapOptions } = useMap();
  const router = useRouter();

  /**
   * 현재 지도의 상태를 URL에 반영하고, URL을 클립보드에 복사한다.
   */
  const replaceAndCopyURL = useCallback(() => {
    const mapOptions = getMapOptions();
    const query = `/?zoom=${mapOptions.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;
    router.replace(query);
    copy(location.origin + query);
  }, [getMapOptions, router]);

  return (
    <Header
      onClickLogo={resetMapOptions}
      rightElements={[
        <button
          onClick={replaceAndCopyURL}
          className={styles.box}
          key="button"
          aria-label="현재 위치 클립보드 복사"
        >
          <AiOutlineShareAlt size={20} />
        </button>,
        <Link
          href={'/feedback'}
          className={styles.box}
          key="link"
          aria-label="피드백 페이지로 이동"
        >
          <VscFeedback size={20} />
        </Link>,
      ]}
    />
  );
}
