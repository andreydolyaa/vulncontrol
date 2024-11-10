import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteToast } from "../redux/toastSlice";
import { TbAlertHexagon } from "react-icons/tb";

const TOAST_DURATION = 4000;
const ANIMATION_DURATION = 300;
const TYPES = {
  done: "completed",
  failed: "failed",
  aborted: "aborted",
  live: "started",
};

export const Toast = () => {
  const dispatch = useDispatch();
  const { toast, customToast } = useSelector((state) => state.toast);

  useEffect(() => {
    if (toast || customToast) {
      const toastTimer = setTimeout(() => {
        dispatch(deleteToast());
      }, TOAST_DURATION);
      return () => clearTimeout(toastTimer);
    }
  }, [toast, customToast, dispatch]);

  if (!toast && !customToast) return null;

  return (
    <StyledDivToast $customToast={customToast}>
      <div className="icon-wrapper">
        <TbAlertHexagon className="icon" />
      </div>
      <div className="text-wrapper">
        {customToast
          ? customToast
          : `Scan ${TYPES[toast.status]} for ${toast.target}`}
      </div>
    </StyledDivToast>
  );
};

const StyledDivToast = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-40%, -50%);
  padding: 10px;
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  width: 295px;
  height: 90px;
  background-color: var(--background-color);
  box-shadow: 1px 1px 25px 6px #131313;
  white-space: pre-line;
  .text-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 12px;
    text-transform: ${({ $customToast }) => !$customToast && "uppercase"};
  }
  .icon-wrapper {
    height: 100%;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      stroke-width: 1.5;
      width: 26px;
      height: 26px;
      color: var(--action-color-2);
    }
  }
  animation: toastIn ${ANIMATION_DURATION}ms ease-out forwards,
    toastOut ${ANIMATION_DURATION}ms ease-in forwards
      ${TOAST_DURATION - ANIMATION_DURATION}ms;

  @keyframes toastIn {
    from {
      opacity: 0;
      transform: translate(-40%, -100%);
    }
    to {
      opacity: 1;
      transform: translate(-40%, -50%);
    }
  }

  @keyframes toastOut {
    from {
      opacity: 1;
      transform: translate(-40%, -50%);
    }
    to {
      opacity: 0;
      transform: translate(-40%, -100%);
    }
  }
`;
