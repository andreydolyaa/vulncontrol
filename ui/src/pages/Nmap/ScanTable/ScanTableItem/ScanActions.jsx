import React from "react";
import styled from "styled-components";
import { ScanAbort } from "./ScanAbort";
import { ScanNavigate } from "./ScanNavigate";
import { ScanDelete } from "./ScanDelete";
import { ScanExport } from "./ScanExport";
import { NmapScanStatus } from "../../../../constants";

export const ScanActions = ({ scan }) => {
  const isActiveScan = scan.status === NmapScanStatus.LIVE;
  return (
    <StyledActionsDiv>
      {isActiveScan ? (
        <ScanAbort scan={scan} />
      ) : (
        <>
          <ScanDelete scan={scan} />
          <ScanExport scan={scan} />
        </>
      )}
      <ScanNavigate scan={scan} />
    </StyledActionsDiv>
  );
};

const StyledActionsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  .icon {
    height: 22px;
    width: 22px;
    stroke-width: 1.2;
    margin: 0 5px;
    outline: none;
  }
  .stop-icon {
    height: 24px;
    width: 24px;
    color: rgb(249, 72, 72);
  }
`;
