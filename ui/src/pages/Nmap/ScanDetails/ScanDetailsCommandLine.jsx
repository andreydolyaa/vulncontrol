import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { ascii } from "../../../utils";
import { LoadingBlink } from "../../../components/LoadingBlink";

export const ScanDetailsCommandLine = ({ scan, loading }) => {
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
    <StyledDiv ref={terminalRef}>
      <pre>
        <div className="ascii">{ascii}</div>
        {displayData()}
      </pre>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  padding: 20px;
  width: 100%;
  flex-grow: 1;
  background-color: #000000;
  border-radius: var(--radius);
  box-shadow: 1px 1px 15px 1px #0c0c0c;
  overflow-y: auto;
  scroll-behavior: smooth;
  font-size: 16px;
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-word;
  }
`;
