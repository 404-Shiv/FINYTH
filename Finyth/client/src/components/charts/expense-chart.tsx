import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const expenseData = [
  { name: 'Housing', value: 35000, color: '#14b8a6' },
  { name: 'Food', value: 12500, color: '#3b82f6' },
  { name: 'Transport', value: 8200, color: '#10b981' },
  { name: 'Entertainment', value: 6500, color: '#8b5cf6' },
  { name: 'Unwanted', value: 4800, color: '#ef4444' },
  { name: 'Savings', value: 28500, color: '#f59e0b' },
];

export default function ExpenseChart() {
  return (
    <Card className="bg-dark-secondary p-6 border-gray-medium" data-testid="expense-chart">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white" data-testid="expense-chart-title">
          Expense Breakdown
        </h3>
        <Select defaultValue="this-month" data-testid="select-expense-period">
          <SelectTrigger className="w-40 bg-dark-tertiary border-gray-medium text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-dark-tertiary border-gray-medium">
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-3-months">Last 3 Months</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#ffffff',
              }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        {expenseData.map((item) => (
          <div key={item.name} className="flex items-center" data-testid={`expense-${item.name.toLowerCase()}`}>
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-light">
              {item.name}: ₹{item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
