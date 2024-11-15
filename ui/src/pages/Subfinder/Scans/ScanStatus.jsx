import React from "react";
import { TbRefresh, TbCircleCheck, TbX, TbCircleOff } from "react-icons/tb";
import { ScanStatusList as list } from "../../../constants";

export const ScanStatus = ({ status }) => {
  const setStatus = () => {
    if (status === list.LIVE)
      return (
        <TbRefresh className="animate-spin" style={{ color: "#08ff8c" }} />
      );
    else if (status === list.DONE)
      return <TbCircleCheck style={{ color: "var(--action-color-2)" }} />;
    else if (status === list.ABORTED) return <TbCircleOff />;
    else return <TbX />;
  };
  return setStatus();
};
