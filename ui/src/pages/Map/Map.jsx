import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { customMarker } from "./customData";
import { CustomPopup } from "./CustomPopup";

export const Map = () => {
  const position = [55.505, -0.09];

  return (
    <MapContainer
      center={[20, 0]}
      zoom={3}
      minZoom={3}
      maxZoom={18}
      style={{ height: "100%", width: "100%" }}
      maxBoundsViscosity={1.0}
      zoomControl={false}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      <Marker position={position} icon={customMarker} >
        <Popup className="custom-popup-wrapper" >
          <CustomPopup title="X" content="X" />
        </Popup>
      </Marker>
    </MapContainer>
  );
};
