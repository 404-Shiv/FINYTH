import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Header from "@/components/header";
import BondCard from "@/components/bond-card";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { Bond } from "@shared/schema";

export default function Bonds() {
  const [riskTolerance, setRiskTolerance] = useState("moderate");
  const [bondType, setBondType] = useState("all");
  const [maturity, setMaturity] = useState("all");

  const { data: allBonds = [], isLoading } = useQuery<Bond[]>({
    queryKey: ["/api/bonds"],
  });

  // Filter bonds based on selected criteria
  const filteredBonds = allBonds.filter(bond => {
    let matches = true;
    
    // Filter by risk tolerance
    if (riskTolerance === "low" && !bond.riskRating.includes("AAA")) {
      matches = false;
    } else if (riskTolerance === "moderate" && !bond.riskRating.includes("AA")) {
      matches = false;
    }
    
    // Filter by bond type
    if (bondType !== "all" && bond.bondType !== bondType) {
      matches = false;
    }
    
    // Filter by maturity
    if (maturity === "short" && bond.maturityYears > 3) {
      matches = false;
    } else if (maturity === "medium" && (bond.maturityYears <= 3 || bond.maturityYears > 7)) {
      matches = false;
    } else if (maturity === "long" && bond.maturityYears <= 7) {
      matches = false;
    }
    
    return matches;
  });

  const bonds = filteredBonds;

  if (isLoading) {
    return (
      <div data-testid="bonds-page">
        <Header title="Bond Suggestions" subtitle="Invest in bonds that match your risk profile" />
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
    <div data-testid="bonds-page">
      <Header title="Bond Suggestions" subtitle="Invest in bonds that match your risk profile" />
      
      <div className="p-6 space-y-6">
        {/* Filters */}
        <Card className="bg-dark-secondary p-6 border-gray-medium">
          <div className="flex items-center space-x-4">
            <div>
              <label className="text-sm text-gray-light mb-2 block">Risk Tolerance</label>
              <Select value={riskTolerance} onValueChange={setRiskTolerance} data-testid="select-risk-tolerance">
                <SelectTrigger className="w-40 bg-dark-tertiary border-gray-medium text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-tertiary border-gray-medium">
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="moderate">Moderate Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-light mb-2 block">Bond Type</label>
              <Select value={bondType} onValueChange={setBondType} data-testid="select-bond-type">
                <SelectTrigger className="w-40 bg-dark-tertiary border-gray-medium text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-tertiary border-gray-medium">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="fd">Fixed Deposits</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-light mb-2 block">Maturity</label>
              <Select value={maturity} onValueChange={setMaturity} data-testid="select-maturity">
                <SelectTrigger className="w-40 bg-dark-tertiary border-gray-medium text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-tertiary border-gray-medium">
                  <SelectItem value="all">All Tenures</SelectItem>
                  <SelectItem value="short">1-3 Years</SelectItem>
                  <SelectItem value="medium">3-7 Years</SelectItem>
                  <SelectItem value="long">7+ Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Important Information */}
        <Card className="bg-dark-secondary p-6 border-gray-medium border-l-4 border-l-teal-primary">
          <h3 className="text-lg font-semibold text-white mb-2" data-testid="bonds-info-title">
            Important Information
          </h3>
          <div className="text-sm text-gray-light space-y-1">
            <p>• All returns shown are post-tax and post-inflation adjusted for realistic expectations</p>
            <p>• TDS of 10% is applicable on most bond investments</p>
            <p>• GST of 18% may apply on certain corporate bonds</p>
            <p>• Inflation rate of 5% annually is considered for real return calculations</p>
          </div>
        </Card>

        {/* Bonds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="bonds-grid">
          {bonds.map((bond) => (
            <BondCard key={bond.id} bond={bond} />
          ))}
        </div>

        {bonds.length === 0 && (
          <Card className="bg-dark-secondary p-12 border-gray-medium text-center">
            <h3 className="text-lg font-semibold text-white mb-2">No Bonds Found</h3>
            <p className="text-gray-light">Try adjusting your filters to see more bond options.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
