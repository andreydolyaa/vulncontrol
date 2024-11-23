import React from "react";
import { InputLabel } from "../../../components/InputLabel";
import { Button } from "../../Nmap/StartForm/styles";
import styles from "./StartForm.module.css";
import {
  TbDeviceIpadHorizontalSearch as SearchIcon,
  TbWorldSearch as WorldIcon,
} from "react-icons/tb";

export const StartForm = ({ handleChange, startScan }) => {
  return (
    <div className={`${styles.base} ${styles.wrapper}`}>
      <InputLabel text="domain name" icon={SearchIcon} />
      <div className={styles.body}>
        <input
          className={styles.input}
          onChange={handleChange}
          placeholder="Enter domain address... (example: https://www.hackthissite.org)"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              startScan();
            }
          }}
        />
        <Button onClick={startScan}>
          <WorldIcon className="icon-scan" />
          Scan
        </Button>
      </div>
    </div>
  );
};
