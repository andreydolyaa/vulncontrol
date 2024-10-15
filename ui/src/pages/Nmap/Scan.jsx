import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../api/baseUrl";

export const Scan = () => {
  // const dispatch = useDispatch();
  const { scanId } = useParams();
  const [scan, setScan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/api/nmap/${scanId}`)
      .then((res) => res.json())
      .then((data) => {
        setScan(data);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading scan {scanId}...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div>scan {scanId}</div>
      {scan && (
        <pre>
          {scan.scan.map((line) => {
            return <div key={line}>{line}</div>;
          })}
        </pre>
      )}
    </div>
  );
};
