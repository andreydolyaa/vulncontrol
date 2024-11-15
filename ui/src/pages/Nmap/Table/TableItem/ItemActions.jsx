import React from "react";
import { ItemAbort } from "./ItemAbort";
import { ItemNavigate } from "./ItemNavigate";
import { ItemDelete } from "./ItemDelete";
import { ItemExport } from "./ItemExport";
import { ScanStatusList } from "../../../../constants";
import styles from "../Table.module.css";

export const ItemActions = ({ scan }) => {
  const isActiveScan = scan.status === ScanStatusList.LIVE;
  return (
    <div className={styles["table-actions"]}>
      {isActiveScan ? (
        <ItemAbort scan={scan} />
      ) : (
        <>
          <ItemDelete scan={scan} />
          <ItemExport scan={scan} />
        </>
      )}
      <ItemNavigate scan={scan} />
    </div>
  );
};
