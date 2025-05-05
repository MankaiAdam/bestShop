import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

// Sample data
const data = [
  { name: 'Jan', value: 599 },
  { name: 'Feb', value: 405 },
  { name: 'Mar', value: 560 },
  { name: 'Apr', value: 395 },
  { name: 'May', value: 469 },
];

const PriceGraph = ({PriceLog}) => {
  const maxValue = Math.max(...data.map(d => d.value));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
            backgroundColor: 'white',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 0 5px rgba(0,0,0,0.2)'
        }}>
            <p style={{ margin: 0,fontSize: 24, fontWeight: 600, color: '#000000' }}>{payload[0].value} DT</p>
            <p style={{ margin: 0,fontSize: 24, color: '#8884d8' }}>{label}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
        <ResponsiveContainer width={800} height={300}>
            <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis ticks={[maxValue]} domain={[300, maxValue + 40]} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    </>
  );
};

export default PriceGraph;