import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Header from "@/components/header";
import LoanCard from "@/components/loan-card";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Calculator } from "lucide-react";
import type { Loan } from "@shared/schema";

export default function Loans() {
  const [loanType, setLoanType] = useState("all");
  const [interestRateRange, setInterestRateRange] = useState("all");
  const [amountRange, setAmountRange] = useState("all");
  
  // EMI Calculator state
  const [loanAmount, setLoanAmount] = useState("1000000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [tenureYears, setTenureYears] = useState("20");
  const [emiResult, setEmiResult] = useState<any>(null);

  const { data: allLoans = [], isLoading } = useQuery<Loan[]>({
    queryKey: ["/api/loans"],
  });

  // Filter loans based on selected criteria
  const filteredLoans = allLoans.filter(loan => {
    let matches = true;
    
    // Filter by loan type
    if (loanType !== "all" && loan.loanType !== loanType) {
      matches = false;
    }
    
    // Filter by interest rate
    if (interestRateRange === "low" && loan.interestRate >= 10) {
      matches = false;
    } else if (interestRateRange === "medium" && (loan.interestRate < 10 || loan.interestRate > 15)) {
      matches = false;
    } else if (interestRateRange === "high" && loan.interestRate <= 15) {
      matches = false;
    }
    
    // Filter by amount range
    if (amountRange === "small" && loan.maxAmount > 500000) {
      matches = false;
    } else if (amountRange === "medium" && (loan.maxAmount <= 500000 || loan.maxAmount > 2000000)) {
      matches = false;
    } else if (amountRange === "large" && loan.maxAmount <= 2000000) {
      matches = false;
    }
    
    return matches;
  });

  const loans = filteredLoans;

  // EMI calculation mutation
  const emiMutation = useMutation({
    mutationFn: async (data: { loanAmount: number; interestRate: number; tenureYears: number }) => {
      const response = await fetch("/api/calculate/emi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to calculate EMI");
      }
      return response.json();
    },
    onSuccess: (result) => {
      setEmiResult(result);
    },
  });

  const calculateEMI = () => {
    emiMutation.mutate({
      loanAmount: parseFloat(loanAmount),
      interestRate: parseFloat(interestRate),
      tenureYears: parseInt(tenureYears),
    });
  };

  if (isLoading) {
    return (
      <div data-testid="loans-page">
        <Header title="Loan Comparison" subtitle="Find the best loan options for your needs" />
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-dark-secondary p-6 border-gray-medium">
                <Skeleton className="h-4 w-3/4 mb-2 bg-gray-medium" />
                <Skeleton className="h-3 w-1/2 mb-4 bg-gray-medium" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full bg-gray-medium" />
                  <Skeleton className="h-3 w-full bg-gray-medium" />
                  <Skeleton className="h-3 w-full bg-gray-medium" />
                </div>
                <Skeleton className="h-10 w-full mt-4 bg-gray-medium" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="loans-page">
      <Header title="Loan Comparison" subtitle="Find the best loan options for your needs" />
      
      <div className="p-6 space-y-6">
        {/* Filters */}
        <Card className="bg-dark-secondary p-6 border-gray-medium">
          <div className="flex items-center space-x-4">
            <div>
              <label className="text-sm text-gray-light mb-2 block">Loan Type</label>
              <Select value={loanType} onValueChange={setLoanType} data-testid="select-loan-type">
                <SelectTrigger className="w-40 bg-dark-tertiary border-gray-medium text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-tertiary border-gray-medium">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="home">Home Loan</SelectItem>
                  <SelectItem value="personal">Personal Loan</SelectItem>
                  <SelectItem value="education">Education Loan</SelectItem>
                  <SelectItem value="car">Car Loan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-light mb-2 block">Interest Rate</label>
              <Select value={interestRateRange} onValueChange={setInterestRateRange} data-testid="select-interest-rate">
                <SelectTrigger className="w-40 bg-dark-tertiary border-gray-medium text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-tertiary border-gray-medium">
                  <SelectItem value="all">All Rates</SelectItem>
                  <SelectItem value="low">Below 10%</SelectItem>
                  <SelectItem value="medium">10% - 15%</SelectItem>
                  <SelectItem value="high">Above 15%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-light mb-2 block">Amount Range</label>
              <Select value={amountRange} onValueChange={setAmountRange} data-testid="select-amount-range">
                <SelectTrigger className="w-40 bg-dark-tertiary border-gray-medium text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-tertiary border-gray-medium">
                  <SelectItem value="all">All Amounts</SelectItem>
                  <SelectItem value="small">Up to ₹5 Lakh</SelectItem>
                  <SelectItem value="medium">₹5L - ₹20L</SelectItem>
                  <SelectItem value="large">₹20L+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* EMI Calculator */}
        <Card className="bg-dark-secondary p-6 border-gray-medium border-l-4 border-l-teal-primary">
          <div className="flex items-center mb-4">
            <Calculator className="w-5 h-5 text-teal-primary mr-2" />
            <h3 className="text-lg font-semibold text-white" data-testid="emi-calculator-title">
              EMI Calculator
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="loan-amount" className="text-gray-light">Loan Amount (₹)</Label>
              <Input
                id="loan-amount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="mt-1 bg-dark-tertiary border-gray-medium text-white"
                data-testid="input-loan-amount"
              />
            </div>
            <div>
              <Label htmlFor="interest-rate" className="text-gray-light">Interest Rate (%)</Label>
              <Input
                id="interest-rate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="mt-1 bg-dark-tertiary border-gray-medium text-white"
                data-testid="input-interest-rate"
              />
            </div>
            <div>
              <Label htmlFor="tenure" className="text-gray-light">Tenure (Years)</Label>
              <Input
                id="tenure"
                type="number"
                value={tenureYears}
                onChange={(e) => setTenureYears(e.target.value)}
                className="mt-1 bg-dark-tertiary border-gray-medium text-white"
                data-testid="input-tenure"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={calculateEMI}
                disabled={emiMutation.isPending}
                className="w-full bg-teal-primary hover:bg-teal-secondary text-dark-primary"
                data-testid="button-calculate-emi"
              >
                {emiMutation.isPending ? "Calculating..." : "Calculate EMI"}
              </Button>
            </div>
          </div>

          {emiResult && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-dark-tertiary rounded-lg" data-testid="emi-results">
              <div className="text-center">
                <p className="text-gray-light text-sm">Monthly EMI</p>
                <p className="text-xl font-bold text-teal-primary" data-testid="emi-amount">
                  ₹{emiResult.emi.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-light text-sm">Total Amount</p>
                <p className="text-xl font-bold text-white" data-testid="total-amount">
                  ₹{emiResult.totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-light text-sm">Total Interest</p>
                <p className="text-xl font-bold text-orange-400" data-testid="total-interest">
                  ₹{emiResult.totalInterest.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Loan Comparison Tips */}
        <Card className="bg-dark-secondary p-6 border-gray-medium border-l-4 border-l-teal-primary">
          <h3 className="text-lg font-semibold text-white mb-2" data-testid="loans-tips-title">
            Loan Comparison Tips
          </h3>
          <div className="text-sm text-gray-light space-y-1">
            <p>• Compare total cost including processing fees and other charges</p>
            <p>• Consider prepayment options and penalties</p>
            <p>• Check eligibility criteria based on your income and credit score</p>
            <p>• Look for loans with flexible repayment terms</p>
          </div>
        </Card>

        {/* Loans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="loans-grid">
          {loans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </div>

        {loans.length === 0 && (
          <Card className="bg-dark-secondary p-12 border-gray-medium text-center">
            <h3 className="text-lg font-semibold text-white mb-2">No Loans Found</h3>
            <p className="text-gray-light">Try adjusting your filters to see more loan options.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
