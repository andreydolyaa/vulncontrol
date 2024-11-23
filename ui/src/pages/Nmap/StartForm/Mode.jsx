import React, { useState } from "react";
import { TbTerminal2, TbCopyCheck, TbSquareLetterA } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setUiMode } from "../../../redux/nmap";
import { UIModes } from "../../../constants/index";
import { ModeSelectButton, ModeSelectWrapper } from "./styles";
import { openModal } from "../../../redux/modalSlice";

export const Mode = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const uiMode = useSelector((state) => state.nmap.uiMode);
  const [currentMode, setCurrentMode] = useState(uiMode);

  const toggle = (selected) => {
    setCurrentMode(selected);
    dispatch(setUiMode(selected));
  };

  const autoScanStart = () => {
    dispatch(
      openModal({
        title: "Run auto scan",
        text: "Press confirm to auto run an Nmap port and service scan on the target - scanme.namp.org",
        confirm: {
          type: "startScan",
          payload: {
            args: ["-sV", "scanme.nmap.org"],
            scanType: "Auto Scan",
            userId: user.id,
          },
        },
      })
    );
  };

  const selectModeButton = (mode, icon, tooltip) => {
    const Icon = icon;
    const isAuto = mode === UIModes.AUTO;
    return (
      <ModeSelectButton
        $active={mode === currentMode}
        onClick={() => (isAuto ? autoScanStart() : toggle(mode))}
        data-tooltip-id="tooltip1"
        data-tooltip-html={tooltip}
      >
        <Icon className="icon" />
        <span className="mode-text">{mode}</span>
      </ModeSelectButton>
    );
  };

  return (
    <ModeSelectWrapper>
      {selectModeButton(UIModes.EASY, TbCopyCheck, "Easy mode: <br>Enter IP and select <br>arguments from the list")}
      {selectModeButton(UIModes.COMMAND, TbTerminal2, "Command mode: <br>Enter full Nmap command")}
      {selectModeButton(UIModes.AUTO, TbSquareLetterA, "Auto Mode: <br>Auto start Nmap scan")}
    </ModeSelectWrapper>
  );
};
