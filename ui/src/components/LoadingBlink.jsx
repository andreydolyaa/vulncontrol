import React from "react";
import styled from "styled-components";

export const LoadingBlink = () => {
  return (
    <StyledLoadingBlinkDiv>
      Loading<span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
    </StyledLoadingBlinkDiv>
  );
};

const StyledLoadingBlinkDiv = styled.div`
  .dot {
    opacity: 0;
    animation: blink 1.5s infinite;
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
