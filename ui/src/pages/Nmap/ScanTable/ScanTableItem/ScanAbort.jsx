import React from "react";
import { PiStopCircleLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { abortScan } from "../../../../redux/nmap";

export const ScanAbort = ({ scan }) => {
  const dispatch = useDispatch();

  return (
    <PiStopCircleLight
      className="icon stop-icon"
      data-tooltip-id="tooltip1"
      data-tooltip-content="Abort Scan"
      onClick={() => dispatch(abortScan(scan.id))}
    />
  );
};
