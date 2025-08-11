import { Wifi, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import trilinkLogo from "@/assets/trilink-logo.png";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isAdmin?: boolean;
  onSignOut?: () => void;
  userRole?: string | null;
}

export const Header = ({ currentPage, onPageChange, isAdmin = false, onSignOut, userRole }: HeaderProps) => {
  const getNavItems = () => {
    if (isAdmin) {
      return [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'users', label: 'Users' },
        { id: 'vouchers', label: 'Vouchers' },
        { id: 'reports', label: 'Reports' },
        { id: 'settings', label: 'Settings' }
      ];
    }
    
    if (userRole === 'staff') {
      return [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'users', label: 'Users' },
        { id: 'vouchers', label: 'Vouchers' }
      ];
    }
    
    return [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'plans', label: 'Plans' },
      { id: 'voucher', label: 'Use Voucher' },
      { id: 'usage', label: 'My Usage' }
    ];
  };

  const navItems = getNavItems();

  return (
    <header className="bg-card shadow-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={trilinkLogo} alt="TriLink Wireless" className="h-10 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-foreground">TriLink Wireless</h1>
              <p className="text-sm text-muted-foreground">High-Speed Internet Access</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === item.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              variant="outline" 
              size="sm"
              onClick={onSignOut}
            >
              <User className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`text-left text-lg font-medium transition-colors hover:text-primary ${
                      currentPage === item.id ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};