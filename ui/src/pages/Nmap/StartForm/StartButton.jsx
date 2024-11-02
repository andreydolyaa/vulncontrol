import React from "react";
import { TbBolt } from "react-icons/tb";
import { StartButtonWrapper, Button } from "./styles";

export const StartButton = ({ easyMode }) => {
  return (
    <StartButtonWrapper $easyMode={easyMode}>
      <Button>
        <TbBolt className="icon" />
        Start
      </Button>
    </StartButtonWrapper>
  );
};
