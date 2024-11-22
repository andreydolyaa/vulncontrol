import React from "react";
import {
  ActionButton,
  ActionsDiv,
  Container,
  DomainDiv,
  ItemWrapper,
} from "../Scans/ScanItem";
import { TbExternalLink } from "react-icons/tb";
import { openLink } from "../../../utils";

export const Subdomain = ({ subdomain }) => {
  return (
    <Container onClick={() => openLink(subdomain)}>
      <ItemWrapper>
        <DomainDiv>{subdomain}</DomainDiv>
        <ActionsDiv>
          <ActionButton>
            <TbExternalLink data-tooltip-id="tooltip1"
              data-tooltip-content="Open in a new tab"/>
          </ActionButton>
        </ActionsDiv>
      </ItemWrapper>
    </Container>
  );
};
