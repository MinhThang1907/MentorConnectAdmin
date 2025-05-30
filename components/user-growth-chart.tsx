"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface UserGrowthChartProps {
  data: any[];
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ fill: "#8884d8" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
