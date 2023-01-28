import { Store } from '@/types/store';
import { useCallback } from 'react';
import { mutate } from 'swr';

export const CURRENT_STORE_KEY = '/current-store';

/**
 * 현재 선택한 가게를 전역 관리하는 훅
 * @description
 * 마커를 클릭했을 때 현재 선택한 가게를 변경
 */
export default function useCurrentStore() {
  // 현재 선택한 가게를 저장하는 함수
  const setCurrentStore = useCallback((store: Store) => {
    mutate(CURRENT_STORE_KEY, store);
  }, []);

  // 현재 선택한 가게를 초기화하는 함수
  const clearCurrentStore = useCallback(() => {
    mutate(CURRENT_STORE_KEY, null);
  }, []);

  return { setCurrentStore, clearCurrentStore };
}
