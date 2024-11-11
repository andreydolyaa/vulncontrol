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
            <TbExternalLink />
          </ActionButton>
        </ActionsDiv>
      </ItemWrapper>
    </Container>
  );
};
