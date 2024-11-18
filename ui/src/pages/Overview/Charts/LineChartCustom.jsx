import { CustomTooltip } from "./CustomChartComponents/CustomTooltip";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { axisStyles, textStyles } from "./sharedStyles";

export const LineChartCustom = ({ data, title, colorOne, colorTwo }) => {
  const legendTextColor = (value) => {
    return <span style={{ color: "var(--placeholder-color)" }}>{value}</span>;
  };

  const areaStyles = (dataKey, color) => {
    return {
      type: "monotone",
      dot:true,
      dataKey,
      stroke: color,
      fillOpacity: 1,
      fill: `url(#${dataKey})`,
      strokeWidth: 2,
    };
  };

  const gradient = (module, color) => {
    return (
      <linearGradient id={module} x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={color} stopOpacity={0.8} />
        <stop offset="95%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          {gradient("nmap", colorTwo)}
          {gradient("subfinder", colorOne)}
        </defs>
        <XAxis {...axisStyles("x")} dataKey="name" domain={["auto","auto"]} />
        <YAxis {...axisStyles("y")} />
        <CartesianGrid strokeDasharray="5 5"  fillOpacity={0.4} stroke="var(--border-color)" />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          align="right"
          verticalAlign="top"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "13px", textTransform: "capitalize" }}
          formatter={legendTextColor}
        />
        <text {...textStyles()}>{title}</text>
        <Area {...areaStyles("nmap", colorTwo)} />
        <Area {...areaStyles("subfinder", colorOne)} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
