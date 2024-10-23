import React, { useState } from "react";
import { styled } from "styled-components";
import { TbTerminal2, TbAlignBoxRightBottom } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setUiMode } from "../../../redux/nmapSlice";
import { UIModes } from "../../../constants/index";

export const Mode = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(UIModes.EASY);

  const toggleMode = (selected) => {
    setMode(selected);
    dispatch(setUiMode(selected));
  };

  return (
    <StyledDivMode className="mode">
      {Object.values(UIModes).map((x) => {
        return (
          <StyledButtonMode
            key={x}
            $isActive={x === mode}
            onClick={() => toggleMode(x)}
          >
            {x === UIModes.EASY ? (
              <TbAlignBoxRightBottom className="icon" />
            ) : (
              <TbTerminal2 className="icon" />
            )}
            <div>{x.toUpperCase()} Mode</div>
          </StyledButtonMode>
        );
      })}
    </StyledDivMode>
  );
};

const StyledDivMode = styled.div`
  display: flex;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  background-color: var(--main-background-color);
  width: 300px;
  height: 35px;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-size: 12px;
  pointer-events: all;
  div:first-child {
    border-right: 1px solid var(--border-color);
  }
  @media (max-width: 570px) {
    flex-direction: column;
    height: 70px;
    width: 100%;
  }
`;

const StyledButtonMode = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  cursor: pointer;
  transition: all 0.3s;
  color: ${({ $isActive }) => ($isActive ? "#000" : "var(--brighter-color)")};
  background-color: ${({ $isActive }) =>
    $isActive ? "var(--action-color-2)" : "var(--main-background-color)"};
  font-weight: 500;
  .icon {
    height: 18px;
    width: 18px;
    margin-right: 5px;
    stroke-width: 1.5;
  }
  &:first-child {
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
  &:last-child {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
  &:hover {
    background-color: ${({ $isActive }) =>
      $isActive ? "none" : "var(--background-color-hover)"};
    cursor: ${({ $isActive }) => ($isActive ? "default" : "pointer")};
  }
  @media (max-width: 570px) {
    &:first-child {
      border-top-left-radius: var(--radius);
      border-top-right-radius: var(--radius);
      border-bottom-left-radius: unset;
    }
    &:last-child {
      border-bottom-right-radius: var(--radius);
      border-bottom-left-radius: var(--radius);
      border-top-right-radius: unset;
    }
  }
`;
