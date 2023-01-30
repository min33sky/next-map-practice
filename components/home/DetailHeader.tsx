import { IoIosArrowUp } from 'react-icons/io';
import styles from '@/styles/detail.module.scss';
import { Store } from '@/types/store';

interface Props {
  currentStore?: Store;
  expanded: boolean;
  onClickArrow: () => void;
}

export default function DetailHeader({
  expanded,
  onClickArrow,
  currentStore,
}: Props) {
  return (
    <div aria-label="상세 정보 헤더" className={styles.header}>
      <button
        className={`${styles.arrowButton} ${expanded ? styles.expanded : ''}`}
        onClick={onClickArrow}
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
  );
}
