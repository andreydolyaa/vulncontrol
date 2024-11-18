import React from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CustomTooltip } from "./CustomChartComponents/CustomTooltip";

export const RadarChartCustom = ({ data }) => {
  const formattedData = data.map((item) => ({
    status: item.status,
    count: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={formattedData}>
        <defs>
          <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
            <stop
              offset="20%"
              stopColor="var(--action-color-3)"
              stopOpacity={0.8}
            />
            <stop offset="80%" stopColor="var(--purple)" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <PolarGrid stroke="var(--border-color)" />
        <PolarAngleAxis
          dataKey="status"
          tick={{
            fontSize: 12,
          }}
          tickFormatter={(status) =>
            status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
          }
        />

        <Radar
          name="Scan Status"
          dataKey="count"
          stroke="var(--purple)"
          fill="url(#radarGradient)"
          fillOpacity={0.6}
          dot
        />

        <Tooltip cursor={false} content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
};
