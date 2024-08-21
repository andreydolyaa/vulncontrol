import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, getLastScan, startScan } from "../../redux/nmapSlice";
import { useWebSocket } from "../../hooks/useWebSocket";
import { useNavigate } from "react-router-dom";
import { Scan } from "./Scan";
import { StartForm } from "./StartForm";

export const Nmap = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const websocket = useWebSocket("ws://localhost:3000"); // TODO: move
  const { messages } = useSelector((state) => state.nmap);
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    target: "",
  });

  useEffect(() => {
    dispatch(getLastScan());
  }, []);

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const start = (e) => {
    e.preventDefault();
    dispatch(clearMessages());
    dispatch(startScan({ data: formData, userId: user.id }))
      .unwrap()
      .then((data) => {
        navigate(`/nmap/${data.scanId}`);
      });
  };

  return (
    <Container>
      <StartForm start={start} onFormChange={onFormChange} />
      <Scan messages={messages} />
    </Container>
  );
};
