import React from "react";
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid } from "recharts";

export const LineChartCustom = () => {
  const data = [
    { name: "Scan 1", nmap: 1, subfinder: 0 },
    { name: "Scan 2", nmap: 1, subfinder: 1 },
    { name: "Scan 3", nmap: 2, subfinder: 1 },
    { name: "Scan 4", nmap: 3, subfinder: 2 },
    { name: "Scan 5", nmap: 3, subfinder: 3 },
  ];
  return (
    <LineChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="pv" stroke="#8884d8" />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  );
};
