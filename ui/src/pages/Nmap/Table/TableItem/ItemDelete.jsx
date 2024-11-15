import React from "react";
import { useDispatch } from "react-redux";
import { deleteScan } from "../../../../redux/nmap";
import { TbTrash } from "react-icons/tb";
import styles from "../Table.module.css";

export const ItemDelete = ({ scan }) => {
  const dispatch = useDispatch();

  return (
    <TbTrash
      className={styles.icon}
      data-tooltip-id="tooltip1"
      data-tooltip-content="Delete"
      onClick={() => dispatch(deleteScan(scan.id))}
    />
  );
};
