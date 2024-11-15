import React, { useEffect, useRef } from "react";
import styles from "./Terminal.module.css";
import { ascii } from "../../../utils";
import { LoadingBlink } from "../../../components/LoadingBlink";

export const TerminalWindow = ({ scan, loading }) => {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (scan && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [scan]);

  const displayData = () => {
    if (loading || !scan) {
      return <LoadingBlink />;
    }
    return scan.stdout.map((line, index) => <div key={index}>{line}</div>);
  };

  return (
    <div className={styles.terminal} ref={terminalRef}>
      <pre>
        <div className="ascii">{ascii}</div>
        {displayData()}
      </pre>
    </div>
  );
};
