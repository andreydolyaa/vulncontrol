import React, { useEffect } from "react";
import styled from "styled-components";
import { ScanStatus } from "./ScanStatus";
import { TbTrash, TbExternalLink } from "react-icons/tb";

export const ScanItem = ({
  scan,
  onClick,
  selected,
  handleScanSelect,
  isSubdomain = false,
}) => {
  return (
    <Container onClick={onClick} $selected={selected}>
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
      <div className="active"></div>
    </Container>
  );
};

export const Container = styled.div`
  position: relative;
  background-color: ${({ $selected }) =>
    $selected ? "var(--main-background-color)" : null};
  .active {
    display: ${({ $selected }) => ($selected ? "block" : "none")};
    height: 90%;
    width: 5px;
    background-color: var(--action-color);
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
  &:hover {
    background-color: ${({ $selected }) => ($selected ? null : "#2d35452c")};
  }
`;
export const ItemWrapper = styled.div`
  display: flex;
  padding: 15px 30px;
  gap: 8px;
  cursor: pointer;
  border-bottom: 1px dotted var(--border-color);
  transition: all 0.3s;
`;
export const IconDiv = styled.div`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  font-size: 16px;
`;

export const DomainDiv = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 15px;
`;

export const ActionsDiv = styled.div`
  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ActionButton = styled.button`
  width: 22px;
  height: 22px;
  font-size: 16px;
`;
