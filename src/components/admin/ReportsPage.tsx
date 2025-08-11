import { useState } from "react";
import { Calendar, Download, TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// Charts replaced with simple display components

export const ReportsPage = () => {
  const [reportType, setReportType] = useState('revenue');
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 1, 1),
    to: new Date()
  });

  // Mock data for charts
  const revenueData = [
    { date: '2024-01-01', revenue: 45000, users: 23 },
    { date: '2024-01-02', revenue: 67500, users: 31 },
    { date: '2024-01-03', revenue: 52000, users: 28 },
    { date: '2024-01-04', revenue: 89000, users: 42 },
    { date: '2024-01-05', revenue: 71500, users: 35 },
    { date: '2024-01-06', revenue: 96000, users: 48 },
    { date: '2024-01-07', revenue: 104500, users: 53 }
  ];

  const planDistribution = [
    { name: 'Instant Surf', value: 43, color: '#3B82F6' },
    { name: 'Flexi Surf', value: 35, color: '#10B981' },
    { name: 'Endless Surf', value: 22, color: '#F59E0B' }
  ];

  const topUsers = [
    { username: 'john_doe', dataUsed: 156.7, revenue: 81000, plan: 'Endless Surf' },
    { username: 'mary_k', dataUsed: 142.3, revenue: 81000, plan: 'Endless Surf' },
    { username: 'samuel_m', dataUsed: 89.5, revenue: 39900, plan: 'Flexi Surf' },
    { username: 'grace_n', dataUsed: 78.2, revenue: 39900, plan: 'Flexi Surf' },
    { username: 'david_l', dataUsed: 67.8, revenue: 30000, plan: 'Instant Surf' }
  ];

  const handleExportReport = () => {
    // Simulate report export
    console.log('Exporting report:', reportType, dateRange);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Business insights and performance metrics</p>
        </div>
        <Button variant="outline" onClick={handleExportReport}>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-card mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue Report</SelectItem>
                  <SelectItem value="users">User Analytics</SelectItem>
                  <SelectItem value="usage">Usage Statistics</SelectItem>
                  <SelectItem value="plans">Plan Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">UGX 2,456,000</p>
                <p className="text-xs text-success">+12% from last period</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">127</p>
                <p className="text-xs text-success">+8% growth</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Data Usage</p>
                <p className="text-2xl font-bold">1.2 TB</p>
                <p className="text-xs text-success">Normal range</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">ARPU</p>
                <p className="text-2xl font-bold">UGX 19,339</p>
                <p className="text-xs text-success">+5% improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-success">Revenue Growing</h3>
              <p className="text-3xl font-bold text-primary">UGX 2,456,000</p>
              <p className="text-muted-foreground">Total this month</p>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="space-y-4">
              {planDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Usage Chart */}
      <Card className="shadow-card mb-8">
        <CardHeader>
          <CardTitle>Daily User Activity</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-secondary">User Growth</h3>
            <p className="text-3xl font-bold text-primary">127</p>
            <p className="text-muted-foreground">Active users today</p>
          </div>
        </div>
        </CardContent>
      </Card>

      {/* Top Users Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Top Users by Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Data Used</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Plan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.dataUsed} GB</TableCell>
                  <TableCell>UGX {user.revenue.toLocaleString()}</TableCell>
                  <TableCell>{user.plan}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};