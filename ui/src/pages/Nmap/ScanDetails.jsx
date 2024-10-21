import styled from "styled-components";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL, WS_URL } from "../../api/baseUrl";
import { Container } from "../../components/Container/Container";
import { ModuleName } from "../../components/ModuleName";
import { ScanStatus } from "./ScanStatus";
import { ascii, randomNum } from "../../utils";
import { useDispatch } from "react-redux";
import { incomingToast } from "../../redux/toastSlice";

export const ScanDetails = () => {
  const terminalRef = useRef(null);
  const dispatch = useDispatch();
  const { scanId } = useParams();
  const [stdout, setStdout] = useState([]);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const scanSubscriptionRoute = `${WS_URL}/ws/scan/${scanId}`;
  // const scanSubscriptionRoute = `${WS_URL}/ws/nmap/nmap-updates_${randomNum()}`;

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [stdout]);

  const isDone = () => status === "done" || status === "failed";

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/api/nmap/${scanId}`)
      .then((res) => res.json())
      .then((data) => {
        setStdout(data.stdout);
        setStatus(data.status);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));

    const websocket = new WebSocket(scanSubscriptionRoute);
    websocket.onmessage = (event) => {
      const incoming = JSON.parse(event.data);
      if (incoming?.type) {
        dispatch(incomingToast(incoming));
      } else {
        setStdout(incoming.stdout);
        setStatus(incoming.status);
      }
    };

    return () => {
      websocket.close();
    };
  }, []);

  // if (isLoading) {
  //   return <div>Loading scan {scanId}...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <Container>
      <ModuleName text={`SCAN ${scanId}`} enableSearch={false}>
        <ScanStatus status={status} />
      </ModuleName>

      <StyledDiv ref={terminalRef}>
        <pre>
          <div className="ascii">{ascii}</div>
          {stdout.map((line, index) => {
            return <div key={index}>{line}</div>;
          })}
          {isDone() && (
            <>
              <div>
                server:{" "}
                {status == "failed" ? "Scan failed!" : "Scan completed!"}
              </div>
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
  /* border: 1px solid #191919; */
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
