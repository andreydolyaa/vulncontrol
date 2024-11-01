import React from "react";
import { ScanActions } from "./ScanActions";
import { parseDate } from "../../../../utils";
import { ScanStatus } from "../../ScanStatus/ScanStatus";
import { TableCell as Td, TableRow } from "../styles";

export const ScanItem = ({ scan, onClick }) => {
  return (
    <TableRow key={scan.id} onClick={onClick}>
      <Td>{scan.target}</Td>
      <Td>{scan.scanType}</Td>
      <Td className="ports">{scan.openPorts.length}</Td>
      <Td>{parseDate(scan.startTime)}</Td>
      <Td>{parseDate(scan.endTime)}</Td>
      <Td>
        <ScanStatus status={scan.status} />
      </Td>
      <Td onClick={(e) => e.stopPropagation()}>
        <ScanActions scan={scan} />
      </Td>
    </TableRow>
  );
};
