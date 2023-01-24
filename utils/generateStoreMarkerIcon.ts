import { ImageIcon } from '@/types/map';

const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 13;
const SCALE = 2 / 3;

// 마커 사이즈를 2/3로 줄임
const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

/**
 * 마커 아이콘을 생성하는 함수
 * @param markerIndex  스프라이트 이미지에서 마커의 위치를 결정하는 인덱스
 * @returns {ImageIcon} 마커 아이콘 객체
 */
export default function generateStoreMarkerIcon(
  markerIndex: number
): ImageIcon {
  /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-8-marker-retina-sprite.example.html */
  return {
    url: 'images/markers.png',
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT), // 마커 사이즈 설정
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0), // 스프라이트 이미지에서 마커의 위치 설정
    scaledSize: new naver.maps.Size(
      SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
      SCALED_MARKER_HEIGHT
    ), // 스프라이트 이미지의 크기 설정
  };
}
