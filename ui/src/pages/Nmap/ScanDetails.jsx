import styled from "styled-components";
import React, { useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useWebSocket } from "../../hooks/useWebSocket";
import { WS_URL } from "../../api/baseUrl";
import { Container } from "../../components/Container/Container";
import { ModuleName } from "../../components/ModuleName";
import { ScanStatus } from "./ScanStatus";
import { ascii } from "../../utils";
import { getScanById, selectScanById } from "../../redux/nmap";
import { Empty } from "../../components/Empty";

export const ScanDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const terminalRef = useRef(null);
  const { scanId } = useParams();
  const { loading } = useSelector((state) => state.nmap);
  const { user } = useSelector((state) => state.user);
  const scan = useSelector((state) => selectScanById(state, scanId));

  const updatesRoute = `${WS_URL}/ws/nmap/${scanId}?userId=${user.id}`;
  useWebSocket(updatesRoute);

  useEffect(() => {
    dispatch(getScanById(scanId));
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [scan]);

  useEffect(() => {
    if (!loading && !scan) {
      return navigate("/nmap"); // TODO: go to /not-found & remove 3 uE
    }
  }, [loading, scan]);

  return (
    <Container>
      <ModuleName text={`SCAN ${scanId}`} enableSearch={false}>
        {scan && <ScanStatus status={scan.status} />}
      </ModuleName>

      <StyledDiv ref={terminalRef}>
        <pre>
          <div className="ascii">{ascii}</div>
          {loading || !scan ? (
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
