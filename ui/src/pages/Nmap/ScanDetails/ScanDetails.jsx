import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useWebSocket } from "../../../hooks/useWebSocket";
import { WS_URL } from "../../../api/baseUrl";
import { Container } from "../../../components/Container/Container";
import { getScanById, selectScanById } from "../../../redux/nmap";
import { ScanDetailsHeader } from "./ScanDetailsHeader";
import { ScanDetailsCommandLine } from "./ScanDetailsCommandLine";

export const ScanDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { scanId } = useParams();
  const { loading } = useSelector((state) => state.nmap);
  const { user } = useSelector((state) => state.user);
  const scan = useSelector((state) => selectScanById(state, scanId));

  const updatesRoute = `${WS_URL}/ws/nmap/${scanId}?userId=${user.id}`;
  useWebSocket(updatesRoute);

  useEffect(() => {
    dispatch(getScanById(scanId));
  }, [dispatch, scanId]);

  useEffect(() => {
    if (!loading && !scan) {
      navigate("/nmap"); // TODO: Update to /not-found
    }
  }, [loading, scan]);

  return (
    <Container>
      <ScanDetailsHeader scan={scan} />
      <ScanDetailsCommandLine scan={scan} loading={loading} />
    </Container>
  );
};
