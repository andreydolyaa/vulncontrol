import React from "react";
import { TbFileDownload } from "react-icons/tb";
import { downloadBlob } from "../../../../utils";
import styles from "../Table.module.css";

export const ItemExport = ({ scan }) => {
  const handleExport = (scan) => {
    const fileName = `scan_${scan.id}_${scan.startTime}.txt`;
    const content =
      `Scan ID: ${scan.id}\n` +
      `Target: ${scan.target}\n` +
      `Command: nmap ${scan.command} -v\n` +
      `Ports Detected: ${scan.openPorts.length ? scan.openPorts : "None"}\n` +
      `Status: ${scan.status}\n` +
      `Started: ${scan.startTime}\n` +
      `Ended: ${scan.endTime}\n` +
      `Executed By: ${scan.userId}\n` +
      `\nstdout:\n\n${scan.stdout.join("")}`;
    downloadBlob(content, fileName);
  };

  return (
    <TbFileDownload
      className={styles.icon}
      data-tooltip-id="tooltip1"
      data-tooltip-content="Export"
      onClick={() => handleExport(scan)}
    />
  );
};
