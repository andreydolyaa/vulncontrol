import styled from "styled-components";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL, WS_URL } from "../../api/baseUrl";
import { Container } from "../../components/Container/Container";
import { ModuleName } from "../../components/ModuleName";
import { ScanStatus } from "./ScanStatus";

export const ScanDetails = () => {
  const terminalRef = useRef(null);
  const { scanId } = useParams();
  const [scan, setScan] = useState([]);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const scanSubscriptionRoute = `${WS_URL}/ws/scan/${scanId}`;

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [scan]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/api/nmap/${scanId}`)
      .then((res) => res.json())
      .then((data) => {
        setScan(data.scan);
        setStatus(data.status);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));

    const websocket = new WebSocket(scanSubscriptionRoute);
    websocket.onmessage = (event) => {
      const incoming = JSON.parse(event.data);
      setScan((prevScan) => [...prevScan, incoming.stdout]);
      setStatus(incoming.status);
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
          {scan.map((line, index) => {
            return <div key={index}>{line}</div>;
          })}
        </pre>
      </StyledDiv>
    </Container>
  );
};

const StyledDiv = styled.div`
  padding: 25px;
  width: 100%;
  flex-grow: 1;
  margin: 42px 0 0 0;
  /* height: 100%; */
  /* background-color: var(--background-color); */
  background-color: #000;
  border-radius: var(--radius);
  border: 1px solid #191919;
  box-shadow: 1px 1px 15px 5px #0c0c0c;
  font-size: 15px;
  overflow-y: scroll;
  /* scroll-behavior: smooth; */
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-word;
  }
`;
