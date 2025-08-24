import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Loan } from "@shared/schema";
import { calculateEMI } from "@/lib/financial-calculations";

interface LoanCardProps {
  loan: Loan;
}

export default function LoanCard({ loan }: LoanCardProps) {
  const [showEMI, setShowEMI] = useState(false);
  
  const formatAmount = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(0)} Lakh`;
    return `₹${amount.toLocaleString()}`;
  };

  // Calculate EMI for typical loan amount (50% of max amount) and tenure
  const typicalAmount = loan.maxAmount * 0.5;
  const typicalTenure = Math.min(loan.maxTenure, 20); // Cap at 20 years for display
  const emi = calculateEMI(typicalAmount, loan.interestRate, typicalTenure);

  return (
    <Card className="bg-dark-tertiary p-4 border-gray-medium" data-testid={`loan-card-${loan.id}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-white" data-testid={`loan-name-${loan.id}`}>
          {loan.name}
        </h4>
        <span className="text-green-400 font-semibold" data-testid={`loan-interest-rate-${loan.id}`}>
          {loan.interestRate}%
        </span>
      </div>
      <div className="text-sm text-gray-light space-y-1">
        <p data-testid={`loan-type-${loan.id}`}>
          Type: <span className="capitalize">{loan.loanType} Loan</span>
        </p>
        <p data-testid={`loan-max-amount-${loan.id}`}>
          Max Amount: <span>{formatAmount(loan.maxAmount)}</span>
        </p>
        <p data-testid={`loan-processing-fee-${loan.id}`}>
          Processing Fee: <span>{loan.processingFee === 0 ? "Nil" : `${loan.processingFee}%`}</span>
        </p>
        <p data-testid={`loan-tenure-${loan.id}`}>
          Tenure: <span>Up to {loan.maxTenure} years</span>
        </p>
        {showEMI && (
          <div className="mt-2 p-2 bg-dark-secondary rounded border border-teal-primary/20">
            <p className="text-xs text-gray-light">
              EMI for {formatAmount(typicalAmount)} @ {typicalTenure} years:
            </p>
            <p className="text-teal-primary font-semibold" data-testid={`loan-emi-${loan.id}`}>
              ₹{emi.toLocaleString()}/month
            </p>
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-3">
        <Button 
          variant="outline"
          size="sm"
          onClick={() => setShowEMI(!showEMI)}
          className="border-gray-medium text-white hover:bg-dark-tertiary"
          data-testid={`button-toggle-emi-${loan.id}`}
        >
          {showEMI ? "Hide" : "Show"} EMI
        </Button>
        <Button 
          className="flex-1 bg-teal-primary hover:bg-teal-secondary text-dark-primary" 
          data-testid={`button-compare-loan-${loan.id}`}
        >
          Compare & Apply
        </Button>
      </div>
    </Card>
  );
}
