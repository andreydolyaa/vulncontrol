import React, { useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL, WS_URL } from "../../api/baseUrl";
import { Container } from "../../components/Container/Container";
import { ModuleName } from "../../components/ModuleName";
import { ScanStatus } from "./ScanStatus";
import { ascii } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { incomingScan, selectScanById } from "../../redux/nmapSlice";
import { Empty } from "../../components/Empty";
import { useWebSocket } from "../../hooks/useWebSocket";

export const ScanDetails = () => {
  const dispatch = useDispatch();
  const terminalRef = useRef(null);
  const { scanId } = useParams();
  const scan = useSelector((state) => selectScanById(state, scanId));
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const updatesRoute = `${WS_URL}/ws/nmap/${scanId}?userId=${user.id}`;
  useWebSocket(updatesRoute);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [scan]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/nmap/${scanId}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(incomingScan(data));
        setIsLoading(false);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Container>
      <ModuleName text={`SCAN ${scanId}`} enableSearch={false}>
        {scan && <ScanStatus status={scan.status} />}
      </ModuleName>

      <StyledDiv ref={terminalRef}>
        <pre>
          <div className="ascii">{ascii}</div>
          {isLoading ? (
            <Empty text="Loading Scan..." loading={true} />
          ) : (
            <>
              {scan.stdout.map((line, index) => {
                return <div key={index}>{line}</div>;
              })}
            </>
          )}
        </pre>
      </StyledDiv>
    </Container>
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
