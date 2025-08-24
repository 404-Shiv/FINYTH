import type { Transaction } from "@shared/schema";
import { 
  ShoppingCart, 
  Wallet, 
  TrendingDown, 
  Monitor,
  ArrowUpDown,
  Home,
  Car,
  GraduationCap
} from "lucide-react";

interface TransactionItemProps {
  transaction: Transaction;
}

const categoryIcons = {
  food: ShoppingCart,
  income: Wallet,
  investment: TrendingDown,
  entertainment: Monitor,
  housing: Home,
  transport: Car,
  education: GraduationCap,
  default: ArrowUpDown,
};

const categoryColors = {
  food: "bg-red-500 text-red-400",
  income: "bg-green-500 text-green-400", 
  investment: "bg-orange-500 text-orange-400",
  entertainment: "bg-purple-500 text-purple-400",
  housing: "bg-blue-500 text-blue-400",
  transport: "bg-yellow-500 text-yellow-400",
  education: "bg-indigo-500 text-indigo-400",
  default: "bg-gray-500 text-gray-400",
};

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const Icon = categoryIcons[transaction.category as keyof typeof categoryIcons] || categoryIcons.default;
  const colorClass = categoryColors[transaction.category as keyof typeof categoryColors] || categoryColors.default;
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-IN", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  const isPositive = transaction.amount > 0;
  const amountColor = isPositive ? "text-green-400" : "text-red-400";
  const amountPrefix = isPositive ? "+" : "";

  return (
    <div 
      className="flex items-center justify-between py-3 border-b border-gray-medium last:border-b-0" 
      data-testid={`transaction-${transaction.id}`}
    >
      <div className="flex items-center">
        <div className={`w-10 h-10 ${colorClass} bg-opacity-20 rounded-lg flex items-center justify-center mr-3`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-white font-medium" data-testid={`transaction-description-${transaction.id}`}>
            {transaction.description}
          </p>
          <p className="text-gray-light text-sm" data-testid={`transaction-category-${transaction.id}`}>
            <span className="capitalize">{transaction.category}</span> • {formatDate(transaction.date!)}
          </p>
        </div>
      </div>
      <span 
        className={`${amountColor} font-medium`} 
        data-testid={`transaction-amount-${transaction.id}`}
      >
        {amountPrefix}₹{Math.abs(transaction.amount).toLocaleString()}
      </span>
    </div>
  );
}
