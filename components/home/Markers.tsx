import useCurrentStore, { CURRENT_STORE_KEY } from '@/hooks/useCurrentStore';
import { MAP_KEY } from '@/hooks/useMap';
import { STORE_KEY } from '@/hooks/useStores';
import { NaverMap } from '@/types/map';
import type { Store } from '@/types/store';
import generateStoreMarkerIcon from '@/utils/generateStoreMarkerIcon';
import React from 'react';
import useSWR from 'swr';
import Marker from './Marker';

export default function Markers() {
  const { data: map } = useSWR<NaverMap>(MAP_KEY); // 네이버 지도 객체
  const { data: stores } = useSWR<Store[]>(STORE_KEY); // 검색된 가게 목록

  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY); // 현재 선택한 가게
  const { clearCurrentStore, setCurrentStore } = useCurrentStore(); // 현재 선택한 가게 상태 관리

  if (!map || !stores) return null;

  return (
    <>
      {
        // 검색한 가게들에 대한 마커 랜더링
        stores.map((store) => (
          <Marker
            key={store.nid}
            coordinates={store.coordinates}
            map={map}
            icon={generateStoreMarkerIcon(store.season, false)}
            onClick={() => {
              setCurrentStore(store);
            }}
          />
        ))
      }

      {
        //? 현재 선택한 가게가 존재할 경우 마커를 덮어씌운다.
        //? 네이버 지도 마커는 아래부터 순서대로 쌓이기 때문에 나중에 생긴 마커가 위에 위치하게 된다.
        currentStore && (
          <Marker
            coordinates={currentStore.coordinates}
            map={map}
            icon={generateStoreMarkerIcon(currentStore.season, true)}
            onClick={clearCurrentStore}
          />
        )
      }
    </>
  );
}
