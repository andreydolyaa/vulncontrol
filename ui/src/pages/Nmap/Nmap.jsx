import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { getScans, startScan } from "../../redux/nmap";
import { StartForm } from "./StartForm/StartForm";
import { WS_URL } from "../../api/baseUrl";
import { isValidIPOrDomain, scanTypes } from "../../utils";
import { ModuleName } from "../../components/ModuleName";
import { TbRadar2 as Radar } from "react-icons/tb";
import { UIModes } from "../../constants";
import { useWebSocket } from "../../hooks/useWebSocket";
import { NmapScan } from "./NmapScan";
import { incomingCustomToast } from "../../redux/toastSlice";

export const Nmap = () => {
  const dispatch = useDispatch();
  const { uiMode } = useSelector((state) => state.nmap);
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [selectedArgs, setSelectedArgs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const updatesRoute = `${WS_URL}/ws/nmap/updates?userId=${user.id}`;
  useWebSocket(updatesRoute);

  useEffect(() => {
    dispatch(getScans({ currentPage, limit, search }))
      .unwrap()
      .then((data) => {
        setTotalPages(data.totalPages);
      });
  }, [currentPage, search]);

  const easyMode = uiMode === UIModes.EASY;

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (option) => {
    setSelectedArgs((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const handleSearch = (data) => {
    setSearch(data);
  };

  const start = async (e) => {
    e.preventDefault();

    if (easyMode && !isValidIPOrDomain(formData.command)) {
      const message = {
        data: `Invalid Address: ${formData.command}\nEnter valid IPv4, IPv6 or Domain Address`,
      };
      dispatch(incomingCustomToast(message));
      return;
    }

    const args = easyMode
      ? [...selectedArgs, formData.command]
      : formData.command.split(" ").filter((arg) => arg !== "nmap");

    const scanType = scanTypes[args[0]] ?? scanTypes["default"];
    const data = { args, userId: user.id, scanType };


    // TODO: clear http/s from target
    
    dispatch(startScan(data))
      .unwrap()
      .then(() => {
        setFormData({});
        setSelectedArgs([]);
      });
  };

  return (
    <Container>
      <ModuleName text="Nmap" icon={Radar} onSearch={handleSearch} />
      <StartForm
        start={start}
        selectedArgs={selectedArgs}
        handleCheckboxChange={handleCheckboxChange}
        easyMode={easyMode}
        onFormChange={onFormChange}
        formData={formData}
      />
      <NmapScan
        search={search}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};
