import React from "react";
import { useDispatch } from "react-redux";
import { TbTrash } from "react-icons/tb";
import { openModal } from "../../../../redux/modalSlice";
import styles from "../Table.module.css";

export const ItemDelete = ({ scan }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      openModal({
        title: "Delete item?",
        text: "You are about to delete this scan permanently, are you sure?",
        confirm: {
          type: "deleteScan",
          payload: scan.id,
        },
      })
    );
  };

  return (
    <TbTrash
      className={styles.icon}
      data-tooltip-id="tooltip1"
      data-tooltip-content="Delete"
      onClick={handleClick}
    />
  );
};
