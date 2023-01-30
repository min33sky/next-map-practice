import { IoIosArrowUp } from 'react-icons/io';
import styles from '@/styles/detail.module.scss';
import useSWR from 'swr';
import { CURRENT_STORE_KEY } from '@/hooks/useCurrentStore';
import { Store } from '@/types/store';
import { useState } from 'react';

/**
 * 가게 상세 정보 표시 컴포넌트
 */
export default function DetailSection() {
  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);
  const [expanded, setExpanded] = useState(false);

  console.log('expanded', expanded);

  return (
    <div
      className={`${styles.detailSection} ${
        currentStore ? styles.selected : ''
      } ${expanded ? styles.expanded : ''}`}
    >
      <div className={styles.header}>
        <button
          className={`${styles.arrowButton} ${expanded ? styles.expanded : ''}`}
          onClick={() => setExpanded(!expanded)}
          disabled={!currentStore}
        >
          <IoIosArrowUp size={20} color="#666666" />
        </button>

        {currentStore ? (
          <p className={styles.title}>{currentStore.name}</p>
        ) : (
          <p className={styles.title}>매장을 선택해주세요.</p>
        )}
      </div>
    </div>
  );
}
