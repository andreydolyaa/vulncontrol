import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const Search = ({ placeholder, onSearch, delay = 1000 }) => {
  const [searchValue, setSearchValue] = useState("");

  // when user starts typing, the debouncer waits for <delay> before
  // triggering onSearch, if the user keeps typing before the timer is over
  // it resets the timer and not firing the onSearch
  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(searchValue);
    }, delay);

    return () => clearTimeout(debounce);
  }, [searchValue]);

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <StyledInput
      className="search"
      type="text"
      placeholder={placeholder}
      onChange={handleSearchInput}
      value={searchValue}
    />
  );
};

const StyledInput = styled.input`
  height: 40px;
  min-width: 220px;
  background: none;
  font-size: 14px;
  background-color: var(--main-background-color);
  &::placeholder {
    font-size: 14px;
    color: var(--placeholder-color);
  }
`;
