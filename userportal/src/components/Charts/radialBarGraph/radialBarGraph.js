import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const StorePerformanceChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <RadialBarChart
      cx="50%"
      cy="50%"
      innerRadius="20%"
      outerRadius="90%"
      barSize={10}
      data={data}
    >
      <RadialBar
        minAngle={15}
        clockWise
        dataKey="value"
        background
        label={{ position: 'insideStart', fill: '#fff' }}
      />
      <Legend
        iconSize={10}
        layout="vertical"
        verticalAlign="middle"
        wrapperStyle={{ top: '50%', right: '10%', transform: 'translate(0, -50%)' }}
      />
      <RechartsTooltip />
    </RadialBarChart>
  </ResponsiveContainer>
);

export default StorePerformanceChart;
