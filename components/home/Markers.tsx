import { MAP_KEY } from '@/hooks/useMap';
import { STORE_KEY } from '@/hooks/useStores';
import { NaverMap } from '@/types/map';
import { Store } from '@/types/store';
import generateStoreMarkerIcon from '@/utils/generateStoreMarkerIcon';
import React from 'react';
import useSWR from 'swr';
import Marker from './Marker';

export default function Markers() {
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: stores } = useSWR<Store[]>(STORE_KEY);

  if (!map || !stores) return null;

  return (
    <>
      {stores.map((store) => (
        <Marker
          key={store.nid}
          coordinates={store.coordinates}
          map={map}
          icon={generateStoreMarkerIcon(store.season)}
        />
      ))}
    </>
  );
}
