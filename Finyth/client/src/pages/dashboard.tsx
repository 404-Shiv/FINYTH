import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import ExpenseChart from "@/components/charts/expense-chart";
import BondGrowthChart from "@/components/charts/bond-growth-chart";
import BondCard from "@/components/bond-card";
import LoanCard from "@/components/loan-card";
import TransactionItem from "@/components/transaction-item";
import { Card } from "@/components/ui/card";
import { Star, TrendingUp, PiggyBank, CreditCard } from "lucide-react";
import type { Bond, Loan, Transaction } from "@shared/schema";

export default function Dashboard() {
  const { data: bonds = [] } = useQuery<Bond[]>({
    queryKey: ["/api/bonds"],
  });

  const { data: loans = [] } = useQuery<Loan[]>({
    queryKey: ["/api/loans"],
  });

  // Mock transactions for demo - in production this would come from user's actual data
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      userId: "user-1",
      amount: -2450,
      description: "Grocery Shopping",
      category: "food",
      type: "expense",
      date: new Date("2024-12-15"),
    },
    {
      id: "2",
      userId: "user-1",
      amount: 85000,
      description: "Salary Credit",
      category: "income",
      type: "income",
      date: new Date("2024-12-01"),
    },
    {
      id: "3",
      userId: "user-1",
      amount: -15000,
      description: "Mutual Fund Investment",
      category: "investment",
      type: "expense",
      date: new Date("2024-12-14"),
    },
    {
      id: "4",
      userId: "user-1",
      amount: -499,
      description: "Netflix Subscription",
      category: "entertainment",
      type: "expense",
      date: new Date("2024-12-13"),
    },
  ];

  const topBonds = bonds.slice(0, 3);
  const topLoans = loans.slice(0, 3);

  return (
    <div data-testid="dashboard-page">
      <Header 
        title="Dashboard" 
        subtitle={`Today, ${new Date().toLocaleDateString("en-IN", { 
          year: "numeric", 
          month: "long", 
          day: "numeric" 
        })}`} 
      />

      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="stats-overview">
          <Card className="bg-dark-secondary p-6 border-gray-medium">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-light text-sm">Save Score</p>
                <p className="text-2xl font-bold text-teal-primary" data-testid="save-score">82/100</p>
              </div>
              <div className="w-12 h-12 bg-teal-primary bg-opacity-20 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-teal-primary" />
              </div>
            </div>
            <p className="text-xs text-gray-light mt-2">+3 points from last month</p>
          </Card>

          <Card className="bg-dark-secondary p-6 border-gray-medium">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-light text-sm">Monthly Savings</p>
                <p className="text-2xl font-bold text-white" data-testid="monthly-savings">₹28,500</p>
              </div>
              <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <p className="text-xs text-gray-light mt-2">+12% from last month</p>
          </Card>

          <Card className="bg-dark-secondary p-6 border-gray-medium">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-light text-sm">Active Investments</p>
                <p className="text-2xl font-bold text-white" data-testid="active-investments">₹8,75,240</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <PiggyBank className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <p className="text-xs text-gray-light mt-2">7.8% annual return</p>
          </Card>

          <Card className="bg-dark-secondary p-6 border-gray-medium">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-light text-sm">Active Loans</p>
                <p className="text-2xl font-bold text-orange-400" data-testid="active-loans">₹4,25,000</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <p className="text-xs text-gray-light mt-2">8.5% avg. interest rate</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="charts-section">
          <ExpenseChart />
          <BondGrowthChart />
        </div>

        {/* Recommendations Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="recommendations-section">
          {/* Bond Recommendations */}
          <Card className="bg-dark-secondary p-6 border-gray-medium">
            <h3 className="text-lg font-semibold text-white mb-4" data-testid="bond-recommendations-title">
              Recommended Bonds
            </h3>
            <div className="space-y-4">
              {topBonds.map((bond) => (
                <BondCard key={bond.id} bond={bond} />
              ))}
            </div>
          </Card>

          {/* Loan Recommendations */}
          <Card className="bg-dark-secondary p-6 border-gray-medium">
            <h3 className="text-lg font-semibold text-white mb-4" data-testid="loan-recommendations-title">
              Loan Recommendations
            </h3>
            <div className="space-y-4">
              {topLoans.map((loan) => (
                <LoanCard key={loan.id} loan={loan} />
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-dark-secondary p-6 border-gray-medium" data-testid="recent-transactions">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
            <button className="text-teal-primary text-sm hover:text-teal-secondary transition-colors" data-testid="button-view-all-transactions">
              View All
            </button>
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
