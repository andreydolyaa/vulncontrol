import React from "react";
import { ListBodyDiv, ListDiv, ListHeaderDiv } from "../styles";
import { Title } from "../../../components/Title";
import { TbWorldSearch } from "react-icons/tb";
import { ScanItem } from "./ScanItem";

export const ScansList = ({ scans, handleScanSelect }) => {
  return (
    <ListDiv>
      <ListHeaderDiv>
        <Title text="Scans" icon={TbWorldSearch} />
      </ListHeaderDiv>
      <ListBodyDiv>
        {scans.map((scan) => {
          return (
            <ScanItem
              key={scan.id}
              scan={scan}
              handleScanSelect={handleScanSelect}
            />
          );
        })}
      </ListBodyDiv>
    </ListDiv>
  );
};
