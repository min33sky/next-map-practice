import useMap from '@/hooks/useMap';
import { NaverMap } from '@/types/map';
import React, { useCallback } from 'react';
import Map from './Map';
import Markers from './Markers';

export default function MapSection() {
  const { initializeMap } = useMap();

  const onLoadMap = useCallback(
    (map: NaverMap) => {
      initializeMap(map);
    },
    [initializeMap]
  );

  return (
    <>
      <Map onLoad={onLoadMap} />;
      <Markers />
    </>
  );
}
