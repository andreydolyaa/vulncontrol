import styled, { keyframes } from "styled-components";

export const TargetWrapper = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ArgsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  height: 100%;
`;

export const ArgsToggler = styled.div`
  display: flex;
  align-items: flex-start;
  width: fit-content;
  cursor: pointer;
  .title {
    transition: all 0.3s ease-in-out;
    margin-bottom: ${({ $isOpen }) => ($isOpen ? "20px" : "0")};
  }
`;

export const ArgsTogglerIcon = styled.div`
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(-180deg)" : "rotate(0)")};
  margin-left: 8px;
  .icon-toggle {
    stroke-width: 1.5;
    width: 22px;
    height: 22px;
    color: var(--action-color-2);
  }
`;

export const ArgsWrapper = styled.div`
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  max-height: ${({ $isOpen }) => ($isOpen ? "500px" : "0")};
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  transition: all 0.3s ease-in-out;
`;

export const StartScanForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: var(--padding);
  width: 100%;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  animation: appear4 .2s ease-in-out 1;
`;

export const StartScanFormTop = styled.div`
  display: flex;
  justify-content: space-between;
  .input-label {
    width: calc(50% - 150px);
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .input-label {
      width: 100%;
      order: 1;
    }
  }
`;

export const ModeSelectButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  cursor: pointer;
  transition: all 0.3s;
  color: ${({ $active }) => ($active ? "#000" : "var(--brighter-color)")};
  background-color: ${({ $active }) =>
    $active ? "var(--action-color-2)" : "var(--main-background-color)"};
  font-weight: 500;
  .icon {
    height: 16px;
    width: 16px;
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
    background-color: ${({ $active }) =>
      $active ? "none" : "var(--background-color-hover)"};
    cursor: ${({ $active }) => ($active ? "default" : "pointer")};
  }
  @media (max-width: 570px) {
    &:first-child {
      border-radius: unset;
      border-top-left-radius: var(--radius);
      border-top-right-radius: var(--radius);
    }
    &:last-child {
      border-radius: unset;
      border-bottom-right-radius: var(--radius);
      border-bottom-left-radius: var(--radius);
    }
  }
`;

export const ModeSelectWrapper = styled.div`
  display: flex;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  background-color: var(--main-background-color);
  width: 300px;
  height: 35px;
  margin-bottom: 20px;
  margin-right: auto;
  text-transform: uppercase;
  font-size: 12px;
  pointer-events: all;
  div:first-child {
    border-right: 1px solid var(--border-color);
  }
  @media (max-width: 768px) {
    margin: 0 0 30px 0;
  }
  @media (max-width: 570px) {
    flex-direction: column;
    height: 60px;
    width: 100%;
    font-size:11px;
  }
`;

export const StartButtonWrapper = styled.div`
  height: 100%;
  display: flex;
  margin: ${({ $easyMode }) => (!$easyMode ? "0px 0 20px 0" : "0px")};
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const start = keyframes`
   0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--radius);
  background: rgb(116, 43, 225);
  box-shadow: 1px 1px 1px 1px #510a8b;
  background: linear-gradient(
    108deg,
    rgba(116, 43, 225, 1) 0%,
    rgba(177, 0, 255, 1) 100%
  );
  color: var(--brighter-color);
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  width: 150px;
  margin-left: 20px;
  transition: 0.3s;
  .icon {
    width: 18px;
    height: 18px;
    margin-right: 3px;
    stroke-width: 1.5;
  }
  &:hover {
    animation: ${start} 0.4s ease-in-out 1;
  }
  @media (max-width: 768px) {
    margin: 20px 0 0 0;
    width: 100%;
    height: 40px;
    font-size: 14px;
  }
`;
