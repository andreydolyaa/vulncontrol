import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Scans = ({ scans }) => {
  const navigate = useNavigate();

  const goToScan = (scanId) => {
    navigate(`/scans/${scanId}`);
  };
  return (
    <div>
      {scans.map((scan) => {
        return (
          <div
            key={scan._id}
            onClick={() => goToScan(scan._id)}
            className="border mt-5 cursor-pointer"
          >
            {scan._id}
          </div>
        );
      })}
    </div>
  );
};
