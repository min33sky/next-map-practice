import type { Marker } from '@/types/map';
import React, { useEffect } from 'react';

export default function Marker({ coordinates, icon, map, onClick }: Marker) {
  useEffect(() => {
    let marker: naver.maps.Marker | null = null;

    if (map) {
      marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(...coordinates),
        map,
        icon,
      });
    }

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
