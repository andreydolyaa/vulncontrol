import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbWorldSearch as World } from "react-icons/tb";
import { Container } from "../../components/Container/Container";
import { ModuleName } from "../../components/ModuleName";
import { StartForm } from "./StartForm/StartForm";
import { Scans } from "./Scans/Scans";
import { useWebSocket } from "../../hooks/useWebSocket";
import { WS_URL } from "../../api/baseUrl";
import { setSelectedScan } from "../../redux/subfinder/subfinderSlice";
import {
  getScans,
  startSubfinderScan,
} from "../../redux/subfinder/subfinderThunks";

export const Subfinder = () => {
  const dispatch = useDispatch();
  const [domain, setDomain] = useState("");
  const { user } = useSelector((state) => state.user);
  const { scans } = useSelector((state) => state.subfinder);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 30;
  const updatesRoute = `${WS_URL}/ws/subfinder/updates?userId=${user.id}`;
  useWebSocket(updatesRoute);

  useEffect(() => {
    dispatch(getScans({ currentPage, limit, search }))
      .unwrap()
      .then((data) => {
        setTotalPages(data.totalPages);
      });
  }, [currentPage, search]);

  const handleChange = (e) => {
    setDomain(e.target.value);
  };

  const handleSearch = (data) => {
    setSearch(data);
  };

  const startScan = () => {
    const data = { userId: user.id, domain };
    dispatch(startSubfinderScan(data))
      .unwrap()
      .then((scan) => {
        dispatch(setSelectedScan(scan.data));
      });
  };

  return (
    <Container>
      <ModuleName text="Subfinder" icon={World} onSearch={handleSearch} />
      <StartForm startScan={startScan} handleChange={handleChange} />
      <Scans scans={scans} />
    </Container>
  );
};
