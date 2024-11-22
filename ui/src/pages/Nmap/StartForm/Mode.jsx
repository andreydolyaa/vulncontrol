import React, { useState } from "react";
import { TbTerminal2, TbCopyCheck } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setUiMode } from "../../../redux/nmap";
import { UIModes } from "../../../constants/index";
import { ModeSelectButton, ModeSelectWrapper } from "./styles";

export const Mode = () => {
  const dispatch = useDispatch();
  const uiMode = useSelector((state) => state.nmap.uiMode);
  const [currentMode, setCurrentMode] = useState(uiMode);

  const toggle = (selected) => {
    setCurrentMode(selected);
    dispatch(setUiMode(selected));
  };

  const selectModeButton = (mode, icon) => {
    const Icon = icon;
    return (
      <ModeSelectButton
        $active={mode === currentMode}
        onClick={() => toggle(mode)}
      >
        <Icon className="icon"/>
        <span className="mode-text">{mode} Mode</span>
      </ModeSelectButton>
    );
  };

  return (
    <ModeSelectWrapper>
      {selectModeButton(UIModes.EASY, TbCopyCheck)}
      {selectModeButton(UIModes.COMMAND, TbTerminal2)}
    </ModeSelectWrapper>
  );
};
