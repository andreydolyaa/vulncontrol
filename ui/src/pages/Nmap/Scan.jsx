import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL, WS_URL } from "../../api/baseUrl";

export const Scan = () => {
  // const dispatch = useDispatch();
  const { scanId } = useParams();
  const [scan, setScan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [ws, setWs] = useState(null);
  const scanSubscriptionRoute = `${WS_URL}/ws/scan/${scanId}`;

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/api/nmap/${scanId}`)
      .then((res) => res.json())
      .then((data) => setScan(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));

    const websocket = new WebSocket(scanSubscriptionRoute);
    setWs(websocket);
    websocket.onmessage = (event) => {
      const message = event.data;
      console.log(message);
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
          {scan.scan.map((line) => {
            return <div key={line}>{line}</div>;
          })}
        </pre>
      )}
    </div>
  );
};
