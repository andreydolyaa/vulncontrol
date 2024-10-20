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
      <StyledDivCounter>{`${current}/${total}`}</StyledDivCounter>
      <StyledButtonPagination onClick={next} disabled={current === total}>
        Next
      </StyledButtonPagination>
    </StyledDivPagination>
  );
};

const StyledDivPagination = styled.div``;

const StyledDivCounter = styled.div``;

const StyledButtonPagination = styled.div``;
