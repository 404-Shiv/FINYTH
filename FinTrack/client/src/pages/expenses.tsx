import Header from "@/components/header";
import ExpenseChart from "@/components/charts/expense-chart";
import TransactionItem from "@/components/transaction-item";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, TrendingDown } from "lucide-react";
import type { Transaction } from "@shared/schema";

export default function Expenses() {
  // Mock transactions data - in production this would come from API
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      userId: "user-1",
      amount: -2450,
      description: "Grocery Shopping - Big Bazaar",
      category: "food",
      type: "expense",
      date: new Date("2024-12-15"),
    },
    {
      id: "2",
      userId: "user-1",
      amount: -35000,
      description: "Monthly Rent Payment",
      category: "housing",
      type: "expense",
      date: new Date("2024-12-01"),
    },
    {
      id: "3",
      userId: "user-1",
      amount: -4800,
      description: "Online Shopping - Unnecessary items",
      category: "unwanted",
      type: "expense",
      date: new Date("2024-12-14"),
    },
    {
      id: "4",
      userId: "user-1",
      amount: -8200,
      description: "Petrol & Vehicle Maintenance",
      category: "transport",
      type: "expense",
      date: new Date("2024-12-13"),
    },
    {
      id: "5",
      userId: "user-1",
      amount: -1200,
      description: "Movie Tickets & Dinner",
      category: "entertainment",
      type: "expense",
      date: new Date("2024-12-12"),
    },
    {
      id: "6",
      userId: "user-1",
      amount: -3200,
      description: "Online Course Subscription",
      category: "education",
      type: "expense",
      date: new Date("2024-12-10"),
    },
  ];

  const totalExpenses = mockTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const unwantedExpenses = mockTransactions
    .filter(t => t.category === "unwanted")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const unwantedPercentage = (unwantedExpenses / totalExpenses) * 100;

  return (
    <div data-testid="expenses-page">
      <Header 
        title="Expense Analysis" 
        subtitle="Track and categorize your spending patterns" 
      />
      
      <div className="p-6 space-y-6">
        {/* Upload Bank Statement */}
        <Card className="bg-dark-secondary p-6 border-gray-medium">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2" data-testid="upload-statement-title">
                Connect Bank Statement
              </h3>
              <p className="text-gray-light text-sm">
                Upload your bank statement to automatically categorize transactions
              </p>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="border-gray-medium text-white hover:bg-dark-tertiary"
                data-testid="button-upload-statement"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Statement
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-medium text-white hover:bg-dark-tertiary"
                data-testid="button-demo-data"
              >
                <FileText className="w-4 h-4 mr-2" />
                Use Demo Data
              </Button>
            </div>
          </div>
        </Card>

        {/* Expense Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="expense-summary">
          <Card className="bg-dark-secondary p-6 border-gray-medium">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-light text-sm">Total Expenses</p>
                <p className="text-2xl font-bold text-white" data-testid="total-expenses">
                  ₹{totalExpenses.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-400" />
              </div>
            </div>
            <p className="text-xs text-gray-light mt-2">This month</p>
          </Card>

          <Card className="bg-dark-secondary p-6 border-gray-medium">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-light text-sm">Unwanted Expenses</p>
                <p className="text-2xl font-bold text-red-400" data-testid="unwanted-expenses">
                  ₹{unwantedExpenses.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-400" />
              </div>
            </div>
            <p className="text-xs text-gray-light mt-2">{unwantedPercentage.toFixed(1)}% of total</p>
          </Card>

          <Card className="bg-dark-secondary p-6 border-gray-medium">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-light text-sm">Avg Daily Spending</p>
                <p className="text-2xl font-bold text-white" data-testid="avg-daily-spending">
                  ₹{Math.round(totalExpenses / 30).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <p className="text-xs text-gray-light mt-2">Based on 30 days</p>
          </Card>
        </div>

        {/* Charts and Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense Chart */}
          <ExpenseChart />

          {/* Category Breakdown */}
          <Card className="bg-dark-secondary p-6 border-gray-medium">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white" data-testid="category-breakdown-title">
                Category Insights
              </h3>
              <Select defaultValue="this-month" data-testid="select-insight-period">
                <SelectTrigger className="w-32 bg-dark-tertiary border-gray-medium text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-tertiary border-gray-medium">
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-dark-tertiary rounded-lg border border-red-500/20">
                <h4 className="font-medium text-red-400 mb-2" data-testid="highest-spending-title">Highest Spending</h4>
                <p className="text-white">Housing: ₹35,000</p>
                <p className="text-gray-light text-sm">64% of total expenses</p>
              </div>

              <div className="p-4 bg-dark-tertiary rounded-lg border border-red-500/20">
                <h4 className="font-medium text-red-400 mb-2" data-testid="unwanted-alert-title">⚠️ Unwanted Spending Alert</h4>
                <p className="text-white">₹4,800 spent on unnecessary items</p>
                <p className="text-gray-light text-sm">8.8% of total expenses - Consider reducing</p>
              </div>

              <div className="p-4 bg-dark-tertiary rounded-lg border border-teal-500/20">
                <h4 className="font-medium text-teal-400 mb-2" data-testid="optimization-tip-title">💡 Optimization Tip</h4>
                <p className="text-white">Save ₹2,400/month by reducing unnecessary purchases</p>
                <p className="text-gray-light text-sm">This could increase your Save Score by 5 points</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-dark-secondary p-6 border-gray-medium" data-testid="recent-transactions-detailed">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Detailed Transaction History</h3>
            <div className="flex space-x-2">
              <Select defaultValue="all" data-testid="select-transaction-category">
                <SelectTrigger className="w-32 bg-dark-tertiary border-gray-medium text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-tertiary border-gray-medium">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="housing">Housing</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="unwanted">Unwanted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-3">
            {mockTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
