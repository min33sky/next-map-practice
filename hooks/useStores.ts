import { Store } from '@/types/store';
import { useCallback } from 'react';
import { mutate } from 'swr';

export const STORE_KEY = '/stores';

/**
 * 상점 목록을 전역으로 관리하기 위한 Hook
 */
export default function useStores() {
  /** 상점 목록을 초기화하는 함수 */
  const initializeStores = useCallback((stores: Store[]) => {
    mutate(STORE_KEY, stores);
  }, []);

  return { initializeStores };
}
