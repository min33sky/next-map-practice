import Header from '@/components/common/Header';
import Link from 'next/link';
import styles from '@/styles/header.module.scss';
import { VscFeedback } from 'react-icons/vsc';
import { AiOutlineShareAlt } from 'react-icons/ai';

export default function Home() {
  return (
    <>
      <Header
        rightElements={[
          <button
            onClick={() => alert('복사')}
            className={styles.box}
            key="button"
          >
            <AiOutlineShareAlt size={20} />
          </button>,
          <Link href={'/feedback'} className={styles.box} key="link">
            <VscFeedback size={20} />
          </Link>,
        ]}
      />
      <main></main>
    </>
  );
}
