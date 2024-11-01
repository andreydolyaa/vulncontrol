import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { getScans, startScan } from "../../redux/nmap";
import { StartForm } from "./StartForm/StartForm";
import { Scans } from "./Scans";
import { WS_URL } from "../../api/baseUrl";
import { scanTypes } from "../../utils";
import { ModuleName } from "../../components/ModuleName";
import { TbRadar2 as Radar } from "react-icons/tb";
import { Pagination } from "../../components/Pagination/Pagination";
import { Empty } from "../../components/Empty";
import { UIModes } from "../../constants";
import { useWebSocket } from "../../hooks/useWebSocket";

export const Nmap = () => {
  const dispatch = useDispatch();
  const { scans, loading, uiMode } = useSelector((state) => state.nmap);
  const [formData, setFormData] = useState({});
  const [selectedArgs, setSelectedArgs] = useState([]);
  const { user } = useSelector((state) => state.user);
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

  const isEasyMode = () => uiMode === UIModes.EASY;

  const handleSearch = (data) => {
    setSearch(data);
  };

  const start = async (e) => {
    e.preventDefault();
    let scanArguments = "";

    !isEasyMode()
      ? (scanArguments = formData.command
          .split(" ")
          .filter((arg) => arg !== "nmap"))
      : (scanArguments = [...selectedArgs, formData.command]);

    const scanType = scanTypes[scanArguments[0]] || scanTypes["-st"];

    dispatch(
      startScan({
        args: scanArguments,
        userId: user.id,
        scanType,
      })
    );
  };

  return (
    <Container>
      {selectedArgs}
      <ModuleName text="Nmap" icon={Radar} onSearch={handleSearch} />
      <StartForm
        start={start}
        selectedArgs={selectedArgs}
        handleCheckboxChange={handleCheckboxChange}
        isEasyMode={isEasyMode()}
        onFormChange={onFormChange}
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
