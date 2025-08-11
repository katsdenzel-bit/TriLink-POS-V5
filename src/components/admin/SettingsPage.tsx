import { useState } from "react";
import { Save, Wifi, DollarSign, Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { defaultPlans } from "@/types/billing";

export const SettingsPage = () => {
  const { toast } = useToast();
  
  const [networkSettings, setNetworkSettings] = useState({
    networkName: 'TriLink_WiFi',
    networkPassword: 'trilink2024',
    maxUsers: 100,
    bandwidthLimit: 10, // Mbps per user
    sessionTimeout: 24 // hours
  });

  const [planPricing, setPlanPricing] = useState(defaultPlans);
  
  const [systemSettings, setSystemSettings] = useState({
    autoDisconnect: true,
    macBindingRequired: true,
    notificationsEnabled: true,
    backupEnabled: true,
    maintenanceMode: false
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "All settings have been saved successfully.",
    });
  };

  const handlePlanPriceChange = (planId: string, newPrice: number) => {
    setPlanPricing(prev => 
      prev.map(plan => 
        plan.id === planId ? { ...plan, price: newPrice } : plan
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">System Settings</h1>
          <p className="text-muted-foreground">Configure your TriLink Wireless system</p>
        </div>
        <Button variant="premium" onClick={handleSaveSettings}>
          <Save className="w-4 h-4 mr-2" />
          Save All Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Network Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wifi className="w-5 h-5 mr-2" />
              Network Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="networkName">Network Name (SSID)</Label>
              <Input
                id="networkName"
                value={networkSettings.networkName}
                onChange={(e) => setNetworkSettings(prev => ({ ...prev, networkName: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="networkPassword">Network Password</Label>
              <Input
                id="networkPassword"
                type="password"
                value={networkSettings.networkPassword}
                onChange={(e) => setNetworkSettings(prev => ({ ...prev, networkPassword: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="maxUsers">Maximum Concurrent Users</Label>
              <Input
                id="maxUsers"
                type="number"
                value={networkSettings.maxUsers}
                onChange={(e) => setNetworkSettings(prev => ({ ...prev, maxUsers: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="bandwidthLimit">Bandwidth Limit per User (Mbps)</Label>
              <Input
                id="bandwidthLimit"
                type="number"
                value={networkSettings.bandwidthLimit}
                onChange={(e) => setNetworkSettings(prev => ({ ...prev, bandwidthLimit: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="sessionTimeout">Default Session Timeout (hours)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={networkSettings.sessionTimeout}
                onChange={(e) => setNetworkSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Disconnect Expired Users</Label>
                <p className="text-sm text-muted-foreground">Automatically disconnect users when their time expires</p>
              </div>
              <Switch
                checked={systemSettings.autoDisconnect}
                onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, autoDisconnect: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>MAC Address Binding Required</Label>
                <p className="text-sm text-muted-foreground">Require MAC address registration for new users</p>
              </div>
              <Switch
                checked={systemSettings.macBindingRequired}
                onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, macBindingRequired: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Notifications Enabled</Label>
                <p className="text-sm text-muted-foreground">Send notifications for system events</p>
              </div>
              <Switch
                checked={systemSettings.notificationsEnabled}
                onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, notificationsEnabled: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Automatic Backup</Label>
                <p className="text-sm text-muted-foreground">Daily backup of user data and settings</p>
              </div>
              <Switch
                checked={systemSettings.backupEnabled}
                onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, backupEnabled: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Disable new connections for maintenance</p>
              </div>
              <Switch
                checked={systemSettings.maintenanceMode}
                onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Pricing */}
      <Card className="shadow-card mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Plan Pricing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planPricing.map((plan) => (
              <div key={plan.id} className="space-y-4">
                <h4 className="font-semibold">{plan.name}</h4>
                <div>
                  <Label htmlFor={`price-${plan.id}`}>Price (UGX)</Label>
                  <Input
                    id={`price-${plan.id}`}
                    type="number"
                    value={plan.price}
                    onChange={(e) => handlePlanPriceChange(plan.id, parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor={`discount-${plan.id}`}>Discount (%)</Label>
                  <Input
                    id={`discount-${plan.id}`}
                    type="number"
                    value={plan.discount}
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor={`description-${plan.id}`}>Description</Label>
                  <Textarea
                    id={`description-${plan.id}`}
                    value={plan.description}
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Business Information */}
      <Card className="shadow-card mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Business Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" value="TriLink Wireless" />
            </div>
            <div>
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input id="contactPhone" value="0771712356" />
            </div>
            <div>
              <Label htmlFor="businessEmail">Business Email</Label>
              <Input id="businessEmail" value="katsdenzel@gmail.com" />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" value="Uganda, East Africa" />
            </div>
          </div>
          <div>
            <Label htmlFor="motto">Business Motto</Label>
            <Input id="motto" value="Affordable • Unlimited • Reliable" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};