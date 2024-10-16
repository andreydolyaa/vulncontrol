import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL, WS_URL } from "../../api/baseUrl";

export const Scan = () => {
  // const dispatch = useDispatch();
  const { scanId } = useParams();
  const [scan, setScan] = useState([]);
  const [scanByUser, setScanByUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const scanSubscriptionRoute = `${WS_URL}/ws/scan/${scanId}`;

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/api/nmap/${scanId}`)
      .then((res) => res.json())
      .then((data) => {
        setScan(data.scan);
        setScanByUser(data.byUser);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));

    const websocket = new WebSocket(scanSubscriptionRoute);
    websocket.onmessage = (event) => {
      setScan((prevScan) => [...prevScan, JSON.parse(event.data)]);
    };

    return () => {
      websocket.close();
    };
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
          {scan.map((line) => {
            return <div key={line}>{line}</div>;
          })}
        </pre>
      )}
    </div>
  );
};
