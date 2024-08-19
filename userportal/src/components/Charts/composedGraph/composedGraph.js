import React from 'react';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartJSTooltip, Legend as ChartJSLegend } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartJSTooltip, ChartJSLegend);

const WeeklyOrdersAndProfitsChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <ComposedChart data={data}>
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="earnings" fill="#8884d8" stroke="#8884d8" />
      <Line type="monotone" dataKey="profit" stroke="#ff7300" />
    </ComposedChart>
  </ResponsiveContainer>
);

export default WeeklyOrdersAndProfitsChart;
