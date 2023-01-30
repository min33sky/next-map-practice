import { IoIosArrowUp } from 'react-icons/io';
import styles from '@/styles/detail.module.scss';
import useSWR from 'swr';
import { CURRENT_STORE_KEY } from '@/hooks/useCurrentStore';
import { Store } from '@/types/store';
import { useState } from 'react';
import DetailContent from './DetailContent';
import DetailHeader from './DetailHeader';

/**
 * 가게 상세 정보 표시 컴포넌트
 */
export default function DetailSection() {
  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`${styles.detailSection} ${
        currentStore ? styles.selected : ''
      } ${expanded ? styles.expanded : ''}`}
    >
      <DetailHeader
        expanded={expanded}
        currentStore={currentStore}
        onClickArrow={() => setExpanded(!expanded)}
      />

      <DetailContent currentStore={currentStore} expanded={expanded} />
    </div>
  );
}
