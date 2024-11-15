import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../api/baseUrl";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const LineChartCustom = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/overview`)
      .then((res) => res.json())
      .then((overviewData) => {
        setData(overviewData);
      });
  }, []);

  const legendTextColor = (value) => {
    return <span style={{ color: "var(--placeholder-color)" }}>{value}</span>;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={"var(--action-color-3)"}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={"var(--action-color-3)"}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={"var(--purple)"} stopOpacity={0.8} />
            <stop offset="95%" stopColor={"var(--purple)"} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          height={30}
          dy={10}
          axisLine={false}
          tickLine={false}
          style={{ fontSize: 12, fill: "var(--placeholder-color)" }}
        />
        <YAxis
          width={30}
          dx={-10}
          axisLine={false}
          tickLine={false}
          // ticks={[0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]}
          style={{ fontSize: 12, fill: "var(--placeholder-color)" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--main-background-color)",
            border: "1px solid var(--border-color)",
            borderRadius: "10px",
            minWidth: "180px",
            fontSize: "12px",
          }}
        />
        <Legend
          align="right"
          verticalAlign="top"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "13px" }}
          formatter={legendTextColor}
        />
        <text x={60} y={20} textAnchor="start" fontSize={12} fill="white">
          Scans By Date
        </text>
        <Area
          type="natural"
          dataKey="subfinder"
          stroke={"var(--action-color-3)"}
          fillOpacity={1}
          fill="url(#colorUv)"
          strokeWidth={2}
        />
        <Area
          type="natural"
          dataKey="nmap"
          stroke={"var(--purple)"}
          fillOpacity={1}
          fill="url(#colorPv)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
