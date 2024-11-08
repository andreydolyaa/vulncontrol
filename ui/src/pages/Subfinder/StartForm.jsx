import React from "react";
import { Input, TargetBody, TargetWrapper } from "./styles";
import { InputLabel } from "../../components/InputLabel";
import { Button } from "../Nmap/StartForm/styles";
import {
  TbDeviceIpadHorizontalSearch as Search,
  TbWorldSearch as World,
} from "react-icons/tb";

export const StartForm = ({ handleChange, startScan }) => {
  return (
    <TargetWrapper>
      <InputLabel text="domain name" icon={Search} />
      <TargetBody>
        <Input
          onChange={handleChange}
          placeholder="Enter domain address... (example: https://www.hackthissite.org)"
        />
        <Button onClick={startScan}>
          <World className="icon-scan" />
          Scan
        </Button>
      </TargetBody>
    </TargetWrapper>
  );
};
