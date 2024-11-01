import React from "react";
import { ScansTableHeader } from "./ScanTableHeader";
import { ScansTableBody } from "./ScanTableBody";
import { Table, TableWrapper } from "./styles";

export const ScanTable = ({ scans }) => {
  return (
    <TableWrapper>
      <Table>
        <ScansTableHeader />
        <ScansTableBody scans={scans} />
      </Table>
    </TableWrapper>
  );
};
