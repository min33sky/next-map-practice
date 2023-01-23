import React from 'react';
import Map from './Map';

export default function MapSection() {
  return (
    <Map
      onLoad={() => {
        console.log('onLoad');
      }}
    />
  );
}
