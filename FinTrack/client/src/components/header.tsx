interface HeaderProps {
  title: string;
  subtitle?: string;
  portfolioValue?: string;
  userInitials?: string;
}

export default function Header({ 
  title, 
  subtitle, 
  portfolioValue = "₹12,45,680",
  userInitials = "S" 
}: HeaderProps) {
  return (
    <header className="bg-dark-secondary border-b border-gray-medium px-6 py-4" data-testid="header">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white" data-testid="page-title">{title}</h2>
          {subtitle && (
            <p className="text-gray-light mt-1" data-testid="page-subtitle">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-light">Total Portfolio Value</p>
            <p className="text-xl font-semibold text-teal-primary" data-testid="portfolio-value">
              {portfolioValue}
            </p>
          </div>
          <div className="w-10 h-10 bg-teal-primary rounded-full flex items-center justify-center" data-testid="user-avatar">
            <span className="text-dark-primary font-semibold">{userInitials}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
