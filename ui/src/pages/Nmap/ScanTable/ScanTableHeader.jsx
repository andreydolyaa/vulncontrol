import React from "react";
import { HeaderCell, HeaderRow } from "./styles";

export const ScansTableHeader = () => {
  const tableItems = [
    "Target",
    "Scan Type",
    "Open Ports",
    "Start Time",
    "End Time",
    "Status",
    "Actions",
  ];

  return (
    <thead>
      <HeaderRow>
        {tableItems.map((item) => (
          <HeaderCell key={item}>{item}</HeaderCell>
        ))}
      </HeaderRow>
    </thead>
  );
};
