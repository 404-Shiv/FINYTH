export function calculateRealReturn(
  couponRate: number,
  tdsRate: number = 10,
  gstRate: number = 0,
  inflationRate: number = 5
): number {
  // Calculate returns after tax deductions
  const afterTax = couponRate * (1 - tdsRate / 100);
  const afterGST = afterTax * (1 - gstRate / 100);
  
  // Adjust for inflation to get real returns
  const realReturn = afterGST - inflationRate;
  
  return Math.max(0, realReturn); // Ensure non-negative returns
}

export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureYears: number
): number {
  const monthlyRate = annualRate / (12 * 100);
  const numberOfPayments = tenureYears * 12;
  
  if (monthlyRate === 0) {
    return Math.round(principal / numberOfPayments);
  }
  
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
             (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
             
  return Math.round(emi);
}

export function calculateSaveScore(
  totalIncome: number,
  totalExpenses: number,
  unwantedExpenses: number
): number {
  if (totalIncome === 0) return 0;
  
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
  const unwantedRate = totalExpenses > 0 ? (unwantedExpenses / totalExpenses) * 100 : 0;
  
  // Base score of 50, bonus for savings above 20%, penalty for unwanted expenses
  let saveScore = 50;
  saveScore += (savingsRate - 20);
  saveScore -= unwantedRate;
  
  // Clamp between 0 and 100
  return Math.max(0, Math.min(100, saveScore));
}

export function projectBondGrowth(
  initialAmount: number,
  annualReturn: number,
  years: number
): { year: number; value: number }[] {
  const projections = [];
  let currentValue = initialAmount;
  
  for (let year = 1; year <= years; year++) {
    currentValue *= (1 + annualReturn / 100);
    projections.push({
      year,
      value: Math.round(currentValue)
    });
  }
  
  return projections;
}
