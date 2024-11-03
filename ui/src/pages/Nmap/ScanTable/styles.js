import styled from "styled-components";

export const TableWrapper = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background-color: #1e1e2b;
  overflow-y: auto;
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* table-layout: fixed; */
`;

export const TableRow = styled.tr`
  text-align: left;
  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
`;

export const HeaderRow = styled(TableRow)`
  border-bottom: 1px solid var(--border-color);
  background-color: #2e2e41;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const HeaderCell = styled.th`
  color: var(--brighter-color);
  height: 50px;
  padding: 0 30px;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const TableCell = styled.td`
  padding: 20px 30px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;
