import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export const RadialChart = () => {
  const data = [{ value: 50 }];
  const trackData = [{ value: 100 }];
  const number = 50;
  const text = "Found Ports";
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={trackData}
          cx="50%"
          cy="50%"
          innerRadius="65%"
          outerRadius="70%"
          startAngle={0}
          endAngle={450}
          fill="#d3d3d3"
          dataKey="value"
          stroke="none"
          cornerRadius={5}
        />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
           innerRadius="50%"
          outerRadius="60%"
          startAngle={-90}
          endAngle={150}
          fill="#ff006a"
          paddingAngle={5}
          dataKey="value"
          stroke="none"
          cornerRadius={5}
        >
          <Cell fill="#ff006a" />
        </Pie>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fontSize="32"
          fill="#ffffff"
          dy="-10"
        >
          {number}
        </text>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fontSize="22"
          fill="#4f4f4f"
          dy="20"
        >
          {text}
        </text>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};