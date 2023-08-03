
import React from "react";
import { RadialBarChart, RadialBar, Legend } from "recharts";

const data = [
  {
    name: "18-24",
    uv: 70,
    pv: 2400,
    fill: "#E8A0BF"
  },
  {
    name: "30-34",
    uv: 80,
    pv: 1398,
    fill: "#000"
  },
  {
    name: "50+",
    uv: 60,
    pv: 4800,
    fill: "#B1B2FF"
  },
  {
    name: "50+",
    uv: 100,
    pv: 4800,
    fill: "#fff"
  }
];

const style = {
  top: 0,
  left: 350,
  lineHeight: "24px"
};

export default function App() {
  return (
    <RadialBarChart
      width={200}
      height={200}
      cx={100}
      cy={82}
      innerRadius={25}
      outerRadius={115}
      barSize={10}
          data={data}
          
    >
      <RadialBar
        minAngle={15}
        background
        clockWise
        dataKey="uv"
      />
    </RadialBarChart>
  );
}
