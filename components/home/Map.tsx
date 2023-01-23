import { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMap';
import { NaverMap } from '@/types/map';
import { Coordinates } from '@/types/store';
import Script from 'next/script';
import React, { useEffect, useRef } from 'react';

interface Props {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: any) => void;
}

export default function Map({
  mapId = 'map',
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad,
}: Props) {
  const mapRef = useRef<NaverMap | null>(null);

  //? Script 컴포넌트의 onReady가 없는 Next.js 12.2.4 이전 버전일 경우,
  //? useEffect를 이용하여 mount 될 때마다 직접 initialzeMap 함수를 실행해야합니다.
  //* onReady를 사용해도 production build 시에 다시 script를 불러오는 것을 확인할 수 있다.
  //* 개발모드에서 확인하려면 next.config.js에서 reactStrictMode: false로 설정해야한다.
  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 9,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };

    /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Getting-Started.html */
    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    if (onLoad) {
      onLoad(map);
    }
  };

  useEffect(() => {
    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        onReady={initializeMap}
      />
      <div id={mapId} style={{ width: '100%', height: '100%' }} />
    </>
  );
}
