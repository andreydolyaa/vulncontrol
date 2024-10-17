import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { getScans, startScan } from "../../redux/nmapSlice";
import { StartForm } from "./StartForm";
import { Scans } from "./Scans";
import { WS_URL } from "../../api/baseUrl";

export const Nmap = () => {
  const dispatch = useDispatch();
  const { scans, loading } = useSelector((state) => state.nmap);
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    target: "",
    args: {
      "-sn": false,
      "-sV": false,
      "-p-": false,
      "-A": false,
      "-sS": false,
      "-sU": false,
      "-T2": false,
    },
  });
  const scanSubscriptionRoute = `${WS_URL}/ws/nmap/nmap-updates`;

  useEffect(() => {
    dispatch(getScans());
  }, []);

  useEffect(() => {
    const websocket = new WebSocket(scanSubscriptionRoute);
    websocket.onmessage = (event) => {
      console.log(event.data, "message from subscription /ws/scans");
    };

    return () => {
      websocket.close();
    };
  }, []);

  const onFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in formData.args) {
      setFormData({
        ...formData,
        args: {
          ...formData.args,
          [name]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const start = async (e) => {
    e.preventDefault();
    await dispatch(startScan({ data: formData, userId: user.id })).unwrap();
    dispatch(getScans());
  };

  return (
    <Container>
      <StartForm
        start={start}
        formData={formData}
        onFormChange={onFormChange}
      />
      {loading ? <div>Loading</div> : <Scans scans={scans} />}
    </Container>
  );
};
