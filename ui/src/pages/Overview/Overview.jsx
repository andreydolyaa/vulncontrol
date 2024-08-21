import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllScans } from "../../redux/nmapSlice";

export const Overview = () => {
  const dispatch = useDispatch();
  const { loading, scans } = useSelector((state) => state.nmap);

  useEffect(() => {
    dispatch(getAllScans());
  }, []);

  if (loading) return <div>Loading...</div>;
  console.log(scans);

  return (
    <div>
      {/* temp */}
      <h1>{scans.length} Nmap Scans</h1>
      {scans.map((scan) => (
        <div key={scan._id}>
          <div>scan id: {scan._id}</div>
        </div>
      ))}
    </div>
  );
};
