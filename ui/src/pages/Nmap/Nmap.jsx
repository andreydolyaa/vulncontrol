import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { getScans, incomingScan, startScan } from "../../redux/nmapSlice";
import { StartForm } from "./StartForm/StartForm";
import { Scans } from "./Scans";
import { WS_URL } from "../../api/baseUrl";
import { randomNum } from "../../utils";
import { ModuleName } from "../../components/ModuleName";
import { TbRadar2 as Radar } from "react-icons/tb";

export const Nmap = () => {
  const dispatch = useDispatch();
  const { scans, loading } = useSelector((state) => state.nmap);
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    target: "",
    userId: user.id,
    args: {
      "-sn": false,
      "-sV": false,
      "-p-": false,
      "-A": false,
      "-sS": false,
      "-sU": false,
      "-T2": false,
      "-F": false,
      "-r": false,
      "-sC": false,
      "-O": false,
      "-d": false,
      "--reason": false,
      "--packet-trace": false,
      "--iflist": false,
      "-6": false,
    },
  });
  const scanSubscriptionRoute = `${WS_URL}/ws/nmap/nmap-updates_${randomNum()}`;

  useEffect(() => {
    dispatch(getScans());
  }, []);

  useEffect(() => {
    const websocket = new WebSocket(scanSubscriptionRoute);
    websocket.onmessage = (event) => {
      dispatch(incomingScan(event.data));
    };

    return () => {
      websocket.close();
    };
  }, []);

  const onFormChange = (e) => {
    console.log(e);

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
    await dispatch(startScan(formData)).unwrap();
    dispatch(getScans());
  };

  return (
    <Container>
      <ModuleName text="Nmap" icon={Radar} />
      <StartForm
        start={start}
        formData={formData}
        onFormChange={onFormChange}
      />
      {loading ? <div>Loading</div> : <Scans scans={scans} />}
    </Container>
  );
};
