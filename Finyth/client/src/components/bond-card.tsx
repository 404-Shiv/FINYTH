import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Bond } from "@shared/schema";
import { calculateRealReturn } from "@/lib/financial-calculations";

interface BondCardProps {
  bond: Bond;
}

export default function BondCard({ bond }: BondCardProps) {
  const realReturn = calculateRealReturn(bond.couponRate, bond.tdsRate, bond.gstRate);

  return (
    <Card className="bg-dark-tertiary p-4 border-gray-medium" data-testid={`bond-card-${bond.id}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-white" data-testid={`bond-name-${bond.id}`}>
          {bond.name}
        </h4>
        <span className="text-teal-primary font-semibold" data-testid={`bond-return-${bond.id}`}>
          {realReturn.toFixed(1)}%
        </span>
      </div>
      <div className="text-sm text-gray-light space-y-1">
        <p data-testid={`bond-tenure-${bond.id}`}>
          Tenure: <span>{bond.maturityYears} years</span>
        </p>
        <p data-testid={`bond-min-investment-${bond.id}`}>
          Min Investment: <span>₹{bond.minInvestment.toLocaleString()}</span>
        </p>
        <p data-testid={`bond-real-return-${bond.id}`}>
          Real Return (post-inflation): <span className="text-teal-primary">{realReturn.toFixed(1)}%</span>
        </p>
      </div>
      <Button 
        className="mt-3 w-full bg-teal-primary hover:bg-teal-secondary text-dark-primary" 
        data-testid={`button-view-bond-details-${bond.id}`}
      >
        View Details
      </Button>
    </Card>
  );
}
