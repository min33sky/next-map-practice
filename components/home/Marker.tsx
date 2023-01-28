import type { Marker } from '@/types/map';
import React, { useEffect } from 'react';

export default function Marker({ coordinates, icon, map, onClick }: Marker) {
  useEffect(() => {
    let marker: naver.maps.Marker | null = null;

    //* 네이버 맴 객체가 존재할 경우 주어진 위치 좌표에 해당하는 마커를 생성한다.
    if (map) {
      /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Marker.html */
      marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(...coordinates),
        map,
        icon,
      });
    }

    //* 마커를 클릭했을 때 실행할 함수가 존재할 경우 이벤트를 등록한다.
    if (onClick) {
      naver.maps.Event.addListener(marker, 'click', onClick);
    }

    return () => {
      marker?.setMap(null);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return null;
}
