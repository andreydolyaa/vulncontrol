import React from "react";
import { styled } from "styled-components";

export const Pagination = ({ current, total, onPageChange }) => {
  const next = () => {
    if (current < total) {
      onPageChange(current + 1);
    }
  };

  const previous = () => {
    if (current > 1) {
      onPageChange(current - 1);
    }
  };

  return (
    <StyledDivPagination>
      <StyledButtonPagination onClick={previous} disabled={current === 1}>
        Previous
      </StyledButtonPagination>
      <StyledDivCounter>{`${current} / ${total}`}</StyledDivCounter>
      <StyledButtonPagination onClick={next} disabled={current === total}>
        Next
      </StyledButtonPagination>
    </StyledDivPagination>
  );
};

const StyledDivPagination = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  background-color: var(--background-color);
  width: 320px;
  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    font-weight: 500;
  }
`;

const StyledDivCounter = styled.div`
  flex-grow: 1;
  border-left: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
`;

const StyledButtonPagination = styled.button`
  width: 100px;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--brighter-color);
  border: none;
  &:first-child {
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
  &:last-child {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
  &:hover {
    background-color: var(--background-color-hover);
  }
`;
