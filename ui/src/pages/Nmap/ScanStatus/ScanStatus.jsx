import React, { memo } from "react";
import { Status } from "../../../components/Status";
import { NmapScanStatus } from "../../../constants";

export const ScanStatus = memo(({ status }) => {
  const checkStatus = (status) => {
    return status === NmapScanStatus.DONE
      ? "rgba(8, 189, 255, 0.1)"
      : status === NmapScanStatus.LIVE
      ? "rgba(8, 255, 139,.1)"
      : status === NmapScanStatus.ABORTED
      ? "rgba(255, 8, 70, 0.1)"
      : "rgba(172, 160, 132, 0.1)";
  };

  return <Status text={status} background={checkStatus(status)} />;
});
