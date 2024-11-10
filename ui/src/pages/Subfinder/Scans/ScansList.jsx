import React, { useState } from "react";
import { ListBodyDiv, ListDiv, ListHeaderDiv } from "../styles";
import { Title } from "../../../components/Title";
import { TbWorldSearch } from "react-icons/tb";
import { ScanItem } from "./ScanItem";
import { Empty } from "../../../components/Empty";

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
      {!scans.length ? (
        <Empty customHeight text="No scans yet" />
      ) : (
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
      )}
    </ListDiv>
  );
};
