import React from "react";
import styles from "./Modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../redux/modalSlice";
import { thunkDispatchers } from "../../redux/thunkDispatchers";
import { logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

export const Modal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, data, confirm } = useSelector((state) => state.modal);

  const closeModal = () => {
    dispatch(close());
  };

  const handleConfirm = () => {
    if (confirm) {
      if (confirm.type === "logout") {
        dispatch(close());
        return dispatch(logout())
          .unwrap()
          .then(() => {
            navigate("/login");
          });
      }
      const thunk = thunkDispatchers[confirm.type];
      if (thunk) {
        dispatch(thunk(confirm.payload));
      }
    }
    dispatch(close());
  };

  if (!show) return;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.text}>{data.text}</div>

        <div className={styles.buttons}>
          <button className={styles.confirm} onClick={handleConfirm}>
            Confirm
          </button>
          <button className={styles.close} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
