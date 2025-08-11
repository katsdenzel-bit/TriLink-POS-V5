import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomePage } from "@/components/HomePage";
import { PlansPage } from "@/components/PlansPage";
import { VoucherPage } from "@/components/VoucherPage";
import { UsagePage } from "@/components/UsagePage";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { UsersManagement } from "@/components/admin/UsersManagement";
import { VouchersManagement } from "@/components/admin/VouchersManagement";
import { TokensPage } from "@/components/admin/TokensPage";
import { ReportsPage } from "@/components/admin/ReportsPage";
import { SettingsPage } from "@/components/admin/SettingsPage";
import { AuthPage } from "@/components/auth/AuthPage";
import { CustomerDashboard } from "@/components/customer/CustomerDashboard";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

const IndexContent = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { user, userRole, loading, signOut } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <AuthPage onAuthSuccess={() => setCurrentPage('dashboard')} />;
  }

  const isAdmin = userRole === 'admin';
  const isStaff = userRole === 'staff' || isAdmin;

  const renderPage = () => {
    if (isAdmin) {
      switch (currentPage) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'users':
          return <UsersManagement />;
        case 'vouchers':
          return <VouchersManagement />;
        case 'tokens':
          return <TokensPage />;
        case 'reports':
          return <ReportsPage />;
        case 'settings':
          return <SettingsPage />;
        default:
          return <AdminDashboard />;
      }
    }

    if (isStaff) {
      switch (currentPage) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'users':
          return <UsersManagement />;
        case 'vouchers':
          return <VouchersManagement />;
        case 'tokens':
          return <TokensPage />;
        default:
          return <AdminDashboard />;
      }
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'plans':
        return <PlansPage />;
      case 'voucher':
        return <VoucherPage />;
      case 'usage':
        return <UsagePage />;
      case 'dashboard':
        return <CustomerDashboard />;
      default:
        return <CustomerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        isAdmin={isAdmin}
        onSignOut={signOut}
        userRole={userRole}
      />
      <main className="flex-1">
        {renderPage()}
      </main>
      {!isAdmin && !isStaff && <Footer />}
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <IndexContent />
    </AuthProvider>
  );
};

export default Index;
