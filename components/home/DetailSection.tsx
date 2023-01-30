import { IoIosArrowUp } from 'react-icons/io';
import styles from '@/styles/detail.module.scss';

/**
 * 가게 상세 정보 표시 컴포넌트
 */
export default function DetailSection() {
  return (
    <div className={styles.detailSection}>
      <div className={styles.header}>
        <button className={styles.arrowButton}>
          <IoIosArrowUp size={20} color="#666666" />
        </button>
        <p className={styles.title}>매장을 선택해주세요.</p>
      </div>
    </div>
  );
}
