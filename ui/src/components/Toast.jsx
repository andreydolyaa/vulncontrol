import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteToast } from "../redux/toastSlice";
import { TbCircleCheck } from "react-icons/tb";

const TOAST_DURATION = 4000;
const ANIMATION_DURATION = 300;
const TYPES = {
  done: "completed",
  failed: "failed",
};

export const Toast = () => {
  const dispatch = useDispatch();
  const toastMessage = useSelector((state) => state.toast.toast);

  useEffect(() => {
    if (toastMessage) {
      const toastTimer = setTimeout(() => {
        dispatch(deleteToast());
      }, TOAST_DURATION);
      return () => clearTimeout(toastTimer);
    }
  }, [toastMessage, dispatch]);

  if (!toastMessage) return null;

  return (
    <StyledDivToast>
      {/* TODO: fix size of icon !!! */}
      <TbCircleCheck className="icon" />
      <div>
        Scan {TYPES[toastMessage.type]} for {toastMessage.scan.target}
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
  width: 280px;
  height: 80px;
  background-color: var(--background-color);
  box-shadow: 1px 1px 25px 2px #131313;
  .icon {
    stroke-width: 1.5;
    width: 46px;
    height: 46px;
    margin-right: 10px;
    color: #f69905;
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
