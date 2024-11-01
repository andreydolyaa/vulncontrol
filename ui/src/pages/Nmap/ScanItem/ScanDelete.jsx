import React from "react";
import { useDispatch } from "react-redux";
import { deleteScan } from "../../../redux/nmap";
import { TbTrash } from "react-icons/tb";

export const ScanDelete = ({ scan }) => {
  const dispatch = useDispatch();

  return (
    <TbTrash
      className="icon"
      data-tooltip-id="tooltip1"
      data-tooltip-content="Delete"
      onClick={() => dispatch(deleteScan(scan.id))}
    />
  );
};
