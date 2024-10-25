import React, { memo } from "react";
import { Status } from "../../components/Status";

export const ScanStatus = memo(({ status }) => {
  const checkStatus = (status) => {
    return status === "done"
      ? "rgba(8, 189, 255, 0.1)"
      : status === "live"
      ? "rgba(8, 255, 139,.1)"
      : status === "aborted"
      ? "rgba(255, 8, 70, 0.1)"
      : "rgba(172, 160, 132, 0.1)";
  };

  return <Status text={status} background={checkStatus(status)} />;
});
