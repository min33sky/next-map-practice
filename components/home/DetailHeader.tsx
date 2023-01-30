import { IoIosArrowUp } from 'react-icons/io';
import styles from '@/styles/detail.module.scss';
import headerStyles from '@/styles/header.module.scss';
import { Store } from '@/types/store';
import { AiOutlineShareAlt } from 'react-icons/ai';
import copy from 'copy-to-clipboard';

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
        <div className={styles.flexRow}>
          <p className={styles.title}>{currentStore.name}</p>
          <button
            className={headerStyles.box}
            onClick={() => {
              copy(location.origin + '/' + currentStore.name);
            }}
          >
            <AiOutlineShareAlt size={20} color="#666666" />
          </button>
        </div>
      ) : (
        <p className={styles.title}>매장을 선택해주세요.</p>
      )}
    </div>
  );
}
