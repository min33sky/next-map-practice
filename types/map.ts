import { Coordinates } from './store';

export type NaverMap = naver.maps.Map; // @types/navermaps

/**
 * 마커 타입
 */
export type Marker = {
  map: NaverMap; // 네이버 지도 객체
  coordinates: Coordinates; // 마커의 위치 좌표
  icon?: ImageIcon; // 마커 아이콘
  onClick?: () => void; // 마커를 클릭했을 때 실행할 함수
};

/**
 * 마커 아이콘 타입
 */
export type ImageIcon = {
  url: string;
  size: naver.maps.Size;
  origin: naver.maps.Point;
  scaledSize?: naver.maps.Size;
};
