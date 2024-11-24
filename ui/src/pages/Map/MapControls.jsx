import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet';

export const MapControls = ({ coords }) => {
  const map = useMap();
  
  useEffect(() => {
    if (coords.length) {
      map.setView(coords,7);
    }
  }, [coords]);

  return null;
};