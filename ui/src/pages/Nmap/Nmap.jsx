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
import { Pagination } from "../../components/Pagination/Pagination";
import { incomingToast } from "../../redux/toastSlice";
import { Empty } from "../../components/Empty";
import { UIModes } from "../../constants";

export const Nmap = () => {
  const dispatch = useDispatch();
  const { scans, loading, uiMode } = useSelector((state) => state.nmap);
  const { user } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 2;
  const [formDataCommandMode, setFormDataCommandMode] = useState({
    command: "",
    userId: user.id,
  });
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
    dispatch(getScans({ currentPage, limit, search })) // TODO: add search to request
      .unwrap()
      .then((data) => {
        setTotalPages(data.totalPages);
      });
  }, [currentPage, search]);

  useEffect(() => {
    const websocket = new WebSocket(scanSubscriptionRoute);
    websocket.onmessage = (event) => {
      const incoming = JSON.parse(event.data);
      if (incoming?.type) {
        dispatch(incomingToast(incoming));
      } else {
        dispatch(incomingScan(incoming));
      }
    };

    return () => {
      websocket.close();
    };
  }, []);

  const isEasyMode = () => uiMode === UIModes.EASY;

  const handleSearch = (data) => {
    setSearch(data);
  };

  const onFormChangeCommand = (e) => {
    setFormDataCommandMode({
      ...formDataCommandMode,
      command: e.target.value,
      uiMode,
    });
  };

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
    await dispatch(
      startScan(isEasyMode() ? formData : formDataCommandMode)
    ).unwrap();
    dispatch(getScans());
  };

  return (
    <Container>
      <ModuleName text="Nmap" icon={Radar} onSearch={handleSearch} />
      <StartForm
        start={start}
        formData={formData}
        isEasyMode={isEasyMode()}
        onFormChange={onFormChange}
        onFormChangeCommand={onFormChangeCommand}
      />
      {loading ? (
        <Empty text="fetching data..." loading={true} />
      ) : scans.length === 0 ? (
        <Empty text={search ? "no search results" : "no scans yet"} />
      ) : (
        <>
          <Scans scans={scans} />
          <Pagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </Container>
  );
};
