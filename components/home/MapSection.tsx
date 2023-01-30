import useCurrentStore from '@/hooks/useCurrentStore';
import useMap, { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMap';
import { NaverMap } from '@/types/map';
import { Coordinates } from '@/types/store';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import Map from './Map';
import Markers from './Markers';

/**
 * 지도와 관련된 컴포넌트들을 랜더링하는 컴포넌트
 */
export default function MapSection() {
  const { initializeMap } = useMap();
  const { clearCurrentStore } = useCurrentStore();
  const router = useRouter();

  /**
   * router.asPath === '/?zoom={}&lat={}&lng={}'
   * https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams
   */

  //? 현재 Map의 URL Query를 캐시
  const query = useMemo(
    () => new URLSearchParams(router.asPath.slice(1)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  //? 현재 Map의 Zoom Level을 캐시
  const initialZoom = useMemo(
    () => (query.get('zoom') ? Number(query.get('zoom')) : INITIAL_ZOOM),
    [query]
  );

  //? 현재 Map의 Center 좌표를 캐시
  const initialCenter = useMemo<Coordinates>(
    () =>
      query.get('lat') && query.get('lng')
        ? [Number(query.get('lat')), Number(query.get('lng'))]
        : INITIAL_CENTER,
    [query]
  );

  /**
   * 네이버 지도가 로드된 후 호출되는 콜백 함수
   */
  const onLoadMap = useCallback(
    (map: NaverMap) => {
      initializeMap(map); // 지도 객체를 전역 상태에 저장
      naver.maps.Event.addListener(map, 'click', clearCurrentStore); // 지도를 클릭하면 현재 선택한 가게를 초기화
    },
    [clearCurrentStore, initializeMap]
  );

  return (
    <>
      <Map
        onLoad={onLoadMap}
        initialCenter={initialCenter}
        initialZoom={initialZoom}
      />
      <Markers />
    </>
  );
}
