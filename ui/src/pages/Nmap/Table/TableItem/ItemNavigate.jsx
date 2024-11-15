import React from "react";
import { TbAlignBoxLeftMiddle } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import styles from "../Table.module.css";

export const ItemNavigate = ({ scan }) => {
  const navigate = useNavigate();

  return (
    <TbAlignBoxLeftMiddle
      className={styles.icon}
      data-tooltip-id="tooltip1"
      data-tooltip-content="View"
      onClick={() => navigate(`/nmap/${scan.id}`)}
    />
  );
};
