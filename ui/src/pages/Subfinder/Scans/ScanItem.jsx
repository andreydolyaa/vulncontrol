import React from "react";
import styled from "styled-components";
import { ScanStatus } from "./ScanStatus";
import { TbTrash, TbExternalLink } from "react-icons/tb";

export const ScanItem = ({ scan, handleScanSelect }) => {
  return (
    <Container>
      <ItemWrapper onClick={() => handleScanSelect(scan)}>
        <IconDiv>
          <ScanStatus status={scan.status} />
        </IconDiv>
        <DomainDiv>{scan.domain}</DomainDiv>
        <ActionsDiv>
          <ActionButton>
            <TbTrash />
          </ActionButton>
          <ActionButton>
            <TbExternalLink />
          </ActionButton>
        </ActionsDiv>
      </ItemWrapper>
    </Container>
  );
};

const Container = styled.div`
  &:hover {
    background-color: #2d35452c;
  }
`;
const ItemWrapper = styled.div`
  display: flex;
  padding: 20px 30px;
  gap: 8px;
  cursor: pointer;
  border-bottom: 1px dotted var(--border-color);
  transition: all 0.3s;
`;
const IconDiv = styled.div`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const DomainDiv = styled.div`
  flex: 1;
`;

const ActionsDiv = styled.div`
  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ActionButton = styled.button`
  width: 22px;
  height: 22px;
  font-size: 16px;
`;
