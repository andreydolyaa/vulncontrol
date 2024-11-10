import React from "react";
import {
  ActionButton,
  ActionsDiv,
  Container,
  DomainDiv,
  ItemWrapper,
} from "../Scans/ScanItem";
import { TbExternalLink } from "react-icons/tb";

export const Subdomain = ({ subdomain }) => {
  const openLink = () => {
    const url =
      subdomain.startsWith("http://") || subdomain.startsWith("https://")
        ? subdomain
        : `http://${subdomain}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Container onClick={openLink}>
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
