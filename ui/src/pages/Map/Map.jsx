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
import { setMapCoords } from "../../redux/geolocation/geolocationSlice";
import { TooltipData } from "./TooltipData";
import api from "../../api/index";
import { MODULE_TYPE } from "../../constants/index";

export const Map = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scan, setScan] = useState({});
  const { geolocationPoints, coords } = useSelector(
    (state) => state.geolocation
  );

  // ll: latitude and longitude
  useEffect(() => {
    dispatch(getGeolocationPoints());
  }, []);

  const customFetch = async (scanType, scanId) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/${scanType}/${scanId}`);
      setScan(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerClick = async (point) => {
    dispatch(setMapCoords(point.data?.ll || []));
    if (point.scanModel === "Nmap") {
      customFetch(MODULE_TYPE.NMAP, point.scanId);
    }
    if (point.scanModel === "Subfinder") {
      customFetch(MODULE_TYPE.SUBFINDER, point.scanId);
    }
  };

  return (
    <MapContainer
      center={[20, 0]}
      zoom={3}
      minZoom={3}
      maxZoom={18}
      style={{ height: "100%", width: "100%" }}
      maxBoundsViscosity={1.0}
      zoomControl={false}
      attributionControl={false}
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
              eventHandlers={{
                click: () => handleMarkerClick(point),
              }}
            >
              <Tooltip>
                <TooltipData point={point} />
              </Tooltip>
              <Popup className="custom-popup-wrapper">
                <CustomPopup point={scan} loading={loading} error={error} />
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};
