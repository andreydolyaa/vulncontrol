import React from "react";
import { useSelector } from "react-redux";
import { Pagination } from "../../components/Pagination/Pagination";
import { Table } from "./Table/Table";
import { Empty } from "../../components/Empty";
import { LoadingBlink } from "../../components/LoadingBlink";

export const NmapScan = ({
  search,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const { scans, loading } = useSelector((state) => state.nmap);

  const fetching = () => {
    return <Empty text={<LoadingBlink />} />;
  };

  const empty = () => {
    return <Empty text={search ? "no search results" : "no scans yet"} />;
  };

  if (loading) return fetching();
  else if (scans.length < 1) return empty();
  else
    return (
      <>
        <Table scans={scans} />
        <Pagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </>
    );
};
