import React from "react";
import { TbLoader2 } from "react-icons/tb";
import styled from "styled-components";

export const Empty = ({ text, loading = false }) => {
  return (
    <StyledDivEmpty $loading={loading}>
      {loading && <TbLoader2 className="icon animate-spin" />}
      <div>{text}</div>
    </StyledDivEmpty>
  );
};

const StyledDivEmpty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${({ $loading }) => ($loading ? "column" : "row")};
  align-items: center;
  justify-content: center;
  font-size:12px;
  text-transform: uppercase;
  .icon {
    margin-bottom: 5px;
    width: 22px;
    height: 22px;
    stroke-width: 1.5;
  }
`;
