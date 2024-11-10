import React from "react";
import { TbRefresh, TbCircleCheck, TbX, TbCircleOff } from "react-icons/tb";
import { NmapScanStatus } from "../../../constants";

export const ScanStatus = ({ status }) => {
  const setStatus = () => {
    if (status === NmapScanStatus.LIVE)
      return <TbRefresh className="animate-spin" style={{ color: "#08ff8c" }}/>;
    else if (status === NmapScanStatus.DONE)
      return <TbCircleCheck style={{ color: "var(--action-color-2)" }} />;
    else if (status === NmapScanStatus.ABORTED) return <TbCircleOff />;
    else return <TbX />;
  };
  return setStatus();
};