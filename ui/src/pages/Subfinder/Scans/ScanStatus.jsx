import React from "react";
import { TbRefresh, TbCircleCheck, TbX, TbCircleOff } from "react-icons/tb";
import { NmapScanStatus } from "../../../constants";

export const ScanStatus = ({ status }) => {
  console.log(status);
  
  const setStatus = () => {
    if (status === NmapScanStatus.LIVE)
      return <TbRefresh className="animate-spin" />;
    else if (status === NmapScanStatus.DONE) return <TbCircleCheck />;
    else if (status === NmapScanStatus.ABORTED) return <TbCircleOff />;
    else return <TbX />;
  };
  return setStatus();
};
