import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import { customMarker } from "./customData";
import { CustomPopup } from "./CustomPopup";
import { useDispatch, useSelector } from "react-redux";
import { getGeolocationPoints } from "../../redux/geolocation/geolocationThunks";
import { MapControls } from "./MapControls";

export const Map = () => {
  const dispatch = useDispatch();
  const { geolocationPoints, coords } = useSelector((state) => state.geolocation);

  // ll: latitude and longitude
  useEffect(() => {
    dispatch(getGeolocationPoints());
  }, []);

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
      <MapControls coords={coords} />
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      {geolocationPoints.length &&
        geolocationPoints.map((point) => {
          return (
            <Marker
              key={point._id}
              position={point.data.ll}
              icon={customMarker}
            >
              <Tooltip>
                {point.target}
                <br />
                {point.ip}
              </Tooltip>
              <Popup className="custom-popup-wrapper">
                <CustomPopup title="" content="TBD" />
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};
