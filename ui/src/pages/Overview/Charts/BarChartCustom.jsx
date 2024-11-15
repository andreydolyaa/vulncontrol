import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { axisStyles, textStyles } from "./sharedStyles";
import { CustomTooltip } from "./CustomChartComponents/CustomTooltip";

export const BarChartCustom = ({ data, title, color }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <defs>
          <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="#ff2a9f" stopOpacity={0.8} />
            <stop offset="90%" stopColor="#9a47ff" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis {...axisStyles("x")} dataKey="_id" />
        <YAxis {...axisStyles("y")} />
        <Tooltip cursor={false} content={<CustomTooltip />} />
        {/* <Legend /> */}
        <Bar
          dataKey="count"
          radius={[5, 5, 3, 3]}
          barSize={40}
          fill="url(#gradientColor)"
        />
        <text {...textStyles()}>{title}</text>
      </BarChart>
    </ResponsiveContainer>
  );
};
