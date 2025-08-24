import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const bondGrowthData = [
  { year: 'Year 1', value: 100000 },
  { year: 'Year 2', value: 106200 },
  { year: 'Year 3', value: 112722 },
  { year: 'Year 4', value: 119593 },
  { year: 'Year 5', value: 127004 },
];

export default function BondGrowthChart() {
  return (
    <Card className="bg-dark-secondary p-6 border-gray-medium" data-testid="bond-growth-chart">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white" data-testid="bond-chart-title">
          Bond Growth Projection
        </h3>
        <span className="text-sm text-teal-primary" data-testid="bond-chart-subtitle">
          Post-inflation returns
        </span>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={bondGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="year" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={(value) => `₹${(value / 1000)}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#ffffff',
              }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Investment Value']}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#14b8a6"
              strokeWidth={3}
              dot={{ fill: '#14b8a6', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: '#14b8a6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-gray-light" data-testid="bond-chart-info">
        <p>
          Expected real return: <span className="text-teal-primary font-semibold">6.2% annually</span>
        </p>
        <p className="text-xs mt-1">*After GST, TDS, and 5% inflation adjustment</p>
      </div>
    </Card>
  );
}
