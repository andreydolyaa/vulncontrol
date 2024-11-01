import React from "react";
import { TbAlignBoxLeftMiddle } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const ScanNavigate = ({ scan }) => {
  const navigate = useNavigate();

  return (
    <TbAlignBoxLeftMiddle
      className="icon"
      data-tooltip-id="tooltip1"
      data-tooltip-content="View"
      onClick={() => navigate(`/nmap/${scan.id}`)}
    />
  );
};
