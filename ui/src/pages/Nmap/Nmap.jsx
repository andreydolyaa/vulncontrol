import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { getScans, startScan } from "../../redux/nmapSlice";
import { StartForm } from "./StartForm";
import { Scans } from "./Scans";

export const Nmap = () => {
  const dispatch = useDispatch();
  // const websocket = useWebSocket("ws://localhost:3000"); // TODO: move
  const { scans, loading } = useSelector((state) => state.nmap);
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    target: "",
  });

  useEffect(() => {
    dispatch(getScans());
  }, []);

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const start = async (e) => {
    e.preventDefault();
    await dispatch(startScan({ data: formData, userId: user.id })).unwrap();
    dispatch(getScans());
  };

  return (
    <Container>
      <StartForm start={start} onFormChange={onFormChange} />
      {loading ? <div>Loading</div> : <Scans scans={scans} />}
    </Container>
  );
};
