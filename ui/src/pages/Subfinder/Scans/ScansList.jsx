import React, { useState } from "react";
import { ListBodyDiv, ListDiv, ListHeaderDiv } from "../styles";
import { Title } from "../../../components/Title";
import { TbWorldSearch } from "react-icons/tb";
import { ScanItem } from "./ScanItem";

export const ScansList = ({ scans, handleScanSelect }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const selectScanItem = (index) => {
    setSelectedItem(index);
  };

  return (
    <ListDiv>
      <ListHeaderDiv>
        <Title text="Scans" icon={TbWorldSearch} />
      </ListHeaderDiv>
      <ListBodyDiv>
        {scans.map((scan, index) => {
          return (
            <ScanItem
              key={scan.id}
              scan={scan}
              handleScanSelect={handleScanSelect}
              onClick={() => selectScanItem(index)}
              selected={selectedItem === index}
            />
          );
        })}
      </ListBodyDiv>
    </ListDiv>
  );
};
