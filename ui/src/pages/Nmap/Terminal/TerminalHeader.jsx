import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ModuleName } from "../../../components/ModuleName";
import { NmapStatus } from "../NmapStatus";
import { TbWorldPin } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setMapCoords } from "../../../redux/geolocation/geolocationSlice";

export const TerminalHeader = ({ scan }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToMap = () => {
    dispatch(setMapCoords(scan?.geoData?.ll || []));
    navigate("/map");
  };
  return (
    <ModuleName text={scan?.target} enableSearch={false}>
      <NmapStatus status={scan?.status} />
      <button
        onClick={goToMap}
        data-tooltip-id="tooltip1"
        data-tooltip-html="View target on map"
      >
        <TbWorldPin />
      </button>
    </ModuleName>
  );
};
