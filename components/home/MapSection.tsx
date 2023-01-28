import useCurrentStore from '@/hooks/useCurrentStore';
import useMap from '@/hooks/useMap';
import { NaverMap } from '@/types/map';
import React, { useCallback } from 'react';
import Map from './Map';
import Markers from './Markers';

/**
 * 지도를 랜더링하는 컴포넌트
 */
export default function MapSection() {
  const { initializeMap } = useMap();
  const { clearCurrentStore } = useCurrentStore();

  const onLoadMap = useCallback(
    (map: NaverMap) => {
      initializeMap(map); // 지도 객체를 전역 상태에 저장
      naver.maps.Event.addListener(map, 'click', clearCurrentStore); // 지도를 클릭하면 현재 선택한 가게를 초기화
    },
    [clearCurrentStore, initializeMap]
  );

  return (
    <>
      <Map onLoad={onLoadMap} />;
      <Markers />
    </>
  );
}
