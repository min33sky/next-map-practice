import { NaverMap } from '@/types/map';
import { Coordinates } from '@/types/store';
import { useCallback } from 'react';
import { mutate } from 'swr';
import useSWR from 'swr';

export const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
export const INITIAL_ZOOM = 10;

export const MAP_KEY = '/map';

/**
 * Naver Map을 전역으로 관리하기 위한 Hook
 */
export default function useMap() {
  const { data: map } = useSWR<NaverMap>(MAP_KEY);

  /** Naver Map을 초기화하는 함수 */
  const initializeMap = useCallback((map: NaverMap) => {
    mutate(MAP_KEY, map);
  }, []);

  /** Naver Map의 옵션을 초기화하는 함수 */
  const resetMapOptions = useCallback(() => {
    /** https://navermaps.github.io/maps.js.ncp/docs/naver.maps.Map.html#morph__anchor */
    map?.morph(new naver.maps.LatLng(...INITIAL_CENTER), INITIAL_ZOOM); // 해당 좌표와 줌을 사용하는 위치로 이동
  }, [map]);

  /** 현재 Naver Map의 옵션을 가져오는 함수 */
  const getMapOptions = useCallback(() => {
    const mapCenter = map?.getCenter();
    const center = [mapCenter?.y, mapCenter?.x] as Coordinates;
    const zoom = map?.getZoom();

    return {
      center,
      zoom,
    };
  }, [map]);

  return { initializeMap, resetMapOptions, getMapOptions };
}
