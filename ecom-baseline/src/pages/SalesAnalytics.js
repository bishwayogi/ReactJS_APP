import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = Array.from({ length: 12 }, (_, i) => ({
  month: i + 1,
  sales: Math.round(100 + Math.random() * 400),
}));

export default function SalesAnalytics() {
  return (
    <section>
      <h2>Sales Analytics (Baseline)</h2>
      <div style={{ width: '100%', maxWidth: 700 }}>
        <LineChart width={700} height={320} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </div>
    </section>
  );
}
