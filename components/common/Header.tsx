import React from 'react';
import styles from '@/styles/header.module.scss';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  onClickLogo?: () => void;
  rightElements?: React.ReactElement[];
}

export default function Header({ rightElements, onClickLogo }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.flexItem}>
        <Link href={'/'} onClick={onClickLogo} className={styles.box}>
          <Image
            src={'/inflearn.png'}
            width={110}
            height={20}
            alt="inflearn Logo"
          />
        </Link>
      </div>

      {rightElements && <div className={styles.flexItem}>{rightElements}</div>}
    </header>
  );
}
