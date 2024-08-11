import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const PieChartComponent = ({ problemCount, totalProblems }) => {
  const data = [
    { name: "Solved", value: problemCount },
    { name: "Remaining", value: totalProblems - problemCount },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
