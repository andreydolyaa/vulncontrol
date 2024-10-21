import React from "react";
import { Status } from "../../components/Status";

export const ScanStatus = ({ status }) => {
  const checkStatus = (status) => {
    return status === "done"
      ? "rgba(8, 189, 255, 0.1)"
      : status === "live"
      ? "rgba(8, 255, 139,.1)"
      : "rgba(255, 8, 115, 0.1)";
  };

  return (
    <Status
      text={status}
      background={checkStatus(status)}
      spin={status === "live" ? true : false}
    />
  );
};
