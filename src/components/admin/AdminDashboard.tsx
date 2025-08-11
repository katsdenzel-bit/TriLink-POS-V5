import { Users, Ticket, DollarSign, Activity, TrendingUp, Wifi } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const AdminDashboard = () => {
  // Mock dashboard data
  const stats = {
    activeUsers: 127,
    totalRevenue: 1956000,
    vouchersGenerated: 543,
    systemUptime: 99.8,
    dailyUsers: 43,
    weeklyUsers: 89,
    monthlyUsers: 127
  };

  const recentTransactions = [
    { id: '1', user: 'john_doe', plan: 'Instant Surf', amount: 1500, time: '2 mins ago' },
    { id: '2', user: 'mary_k', plan: 'Flexi Surf', amount: 9975, time: '15 mins ago' },
    { id: '3', user: 'samuel_m', plan: 'Endless Surf', amount: 40500, time: '32 mins ago' },
    { id: '4', user: 'grace_n', plan: 'Instant Surf', amount: 1500, time: '1 hour ago' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-xl text-muted-foreground">
          Welcome to TriLink Wireless Management System
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{stats.activeUsers}</p>
                <p className="text-xs text-success">+12% from yesterday</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-8 h-8 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">UGX {stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-success">+8% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Ticket className="w-8 h-8 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Vouchers Generated</p>
                <p className="text-2xl font-bold">{stats.vouchersGenerated}</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Wifi className="w-8 h-8 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold">{stats.systemUptime}%</p>
                <p className="text-xs text-success">Excellent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* User Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Plan Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Daily Users</span>
                <span className="text-sm font-semibold">{stats.dailyUsers}</span>
              </div>
              <Progress value={(stats.dailyUsers / stats.activeUsers) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Weekly Users</span>
                <span className="text-sm font-semibold">{stats.weeklyUsers}</span>
              </div>
              <Progress value={(stats.weeklyUsers / stats.activeUsers) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Monthly Users</span>
                <span className="text-sm font-semibold">{stats.monthlyUsers}</span>
              </div>
              <Progress value={(stats.monthlyUsers / stats.activeUsers) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{transaction.user}</p>
                    <p className="text-sm text-muted-foreground">{transaction.plan}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">UGX {transaction.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{transaction.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">Online</div>
              <p className="text-muted-foreground">Internet Connection</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">Normal</div>
              <p className="text-muted-foreground">Server Load</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">Active</div>
              <p className="text-muted-foreground">Billing System</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};