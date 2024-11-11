import React from "react";
import styled from "styled-components";

export const LoadingBlink = ({ text = "Loading", color = null }) => {
  return (
    <StyledLoadingBlinkDiv $text={text} $color={color}>
      {text}
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
    </StyledLoadingBlinkDiv>
  );
};

const StyledLoadingBlinkDiv = styled.div`
  font-size: ${({ $text }) => !$text && "18px"};
  color: ${({ $color }) => $color && $color};
  .dot {
    opacity: 0;
    margin-right: 3px;
    animation: blink 1.5s infinite;
  }

  .dot:nth-child(1) {
    margin-left: 3px;
  }
  .dot:nth-child(2) {
    animation-delay: 0.3s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.6s;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
`;
