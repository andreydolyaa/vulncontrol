import { Container } from "../../components/Container/Container";
import { ModuleName } from "../../components/ModuleName";
import { TbWorldSearch as World } from "react-icons/tb";
import { Target } from "./Target";
import { ScanList } from "./ScanList";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { startSubfinderScan } from "../../redux/subfinder/subfinderThunks";

export const Subfinder = () => {
  const dispatch = useDispatch();
  const [domain, setDomain] = useState("");
  const { user } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setDomain(e.target.value);
  };

  const startScan = () => {
    const data = { userId: user.id, domain };
    console.log(data);

    // dispatch(startScan())
    dispatch(startSubfinderScan(data));
  };

  return (
    <Container>
      <ModuleName text="Subfinder" icon={World}></ModuleName>
      <Target startScan={startScan} handleChange={handleChange} />
      <ScanList />
    </Container>
  );
};
