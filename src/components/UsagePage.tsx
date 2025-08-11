import { useState } from "react";
import { Activity, Clock, Download, Wifi } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export const UsagePage = () => {
  // Mock user data
  const [userInfo] = useState({
    username: 'john_doe',
    currentPlan: 'Flexi Surf',
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    dataUsed: 15.7, // GB
    timeRemaining: 120, // hours
    macAddress: '00:1B:44:11:3A:B7',
    isActive: true
  });

  const formatTimeRemaining = (hours: number) => {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    
    if (days > 0) {
      return `${days} days, ${remainingHours} hours`;
    }
    return `${remainingHours} hours`;
  };

  const usagePercentage = (userInfo.timeRemaining / 168) * 100; // Assuming weekly plan

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">My Usage</h1>
          <p className="text-xl text-muted-foreground">
            Track your internet usage and plan details
          </p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Wifi className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-lg font-semibold">
                    <Badge variant={userInfo.isActive ? "default" : "secondary"}>
                      {userInfo.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Time Left</p>
                  <p className="text-lg font-semibold">{formatTimeRemaining(userInfo.timeRemaining)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Download className="w-8 h-8 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Data Used</p>
                  <p className="text-lg font-semibold">{userInfo.dataUsed} GB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Activity className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Current Plan</p>
                  <p className="text-lg font-semibold">{userInfo.currentPlan}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Plan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Username:</span>
                <span className="font-semibold">{userInfo.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Plan:</span>
                <span className="font-semibold">{userInfo.currentPlan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expires:</span>
                <span className="font-semibold">
                  {userInfo.expiresAt.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">MAC Address:</span>
                <span className="font-mono text-sm">{userInfo.macAddress}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Time Remaining</span>
                  <span className="text-sm font-semibold">{Math.round(usagePercentage)}%</span>
                </div>
                <Progress value={usagePercentage} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTimeRemaining(userInfo.timeRemaining)} remaining
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Data Usage Today</span>
                  <span className="text-sm font-semibold">2.3 GB</span>
                </div>
                <Progress value={23} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Average Daily Usage</span>
                  <span className="text-sm font-semibold">3.1 GB</span>
                </div>
                <Progress value={31} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-card mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '2 hours ago', event: 'Connected to TriLink WiFi', data: '1.2 GB used' },
                { time: '5 hours ago', event: 'Session ended', data: '0.8 GB used' },
                { time: '1 day ago', event: 'Plan activated', data: 'Flexi Surf (Weekly)' },
                { time: '1 day ago', event: 'Voucher redeemed', data: 'TLW-456789' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{activity.event}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.data}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};