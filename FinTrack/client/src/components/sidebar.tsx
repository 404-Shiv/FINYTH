import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  TrendingUp, 
  CreditCard, 
  BarChart3, 
  User 
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Bond Suggestions", href: "/bonds", icon: TrendingUp },
  { name: "Loan Comparison", href: "/loans", icon: CreditCard },
  { name: "Expense Analysis", href: "/expenses", icon: BarChart3 },
  { name: "Profile & Settings", href: "/profile", icon: User },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-dark-secondary border-r border-gray-medium flex-shrink-0" data-testid="sidebar">
      <div className="p-6 border-b border-gray-medium">
        <h1 className="text-xl font-bold text-teal-primary" data-testid="app-logo">FINYTH</h1>
        <p className="text-sm text-gray-light mt-1" data-testid="app-subtitle">Smart Finance for India</p>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <li key={item.name}>
                <Link href={item.href} data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "text-dark-primary bg-teal-primary"
                        : "text-gray-light hover:text-white hover:bg-dark-tertiary"
                    )}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
