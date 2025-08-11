import { useState } from "react";
import { Plus, Download, Search, Eye, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { defaultPlans, type Voucher } from "@/types/billing";

export const VouchersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const [vouchers] = useState<Voucher[]>([
    {
      id: '1',
      code: 'TLW-123456',
      planId: '1',
      isUsed: false,
      createdAt: new Date('2024-02-07'),
      expiresAt: new Date('2024-03-07')
    },
    {
      id: '2',
      code: 'TLW-789012',
      planId: '2',
      isUsed: true,
      usedBy: 'john_doe',
      usedAt: new Date('2024-02-06'),
      createdAt: new Date('2024-02-05'),
      expiresAt: new Date('2024-03-05')
    },
    {
      id: '3',
      code: 'TLW-345678',
      planId: '3',
      isUsed: false,
      createdAt: new Date('2024-02-07'),
      expiresAt: new Date('2024-03-07')
    },
    {
      id: '4',
      code: 'TLW-901234',
      planId: '1',
      isUsed: true,
      usedBy: 'mary_k',
      usedAt: new Date('2024-02-07'),
      createdAt: new Date('2024-02-06'),
      expiresAt: new Date('2024-03-06')
    }
  ]);

  const filteredVouchers = vouchers.filter(voucher =>
    voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voucher.usedBy?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateVouchers = () => {
    if (!selectedPlan || quantity < 1) {
      toast({
        title: "Invalid Input",
        description: "Please select a plan and enter a valid quantity.",
        variant: "destructive"
      });
      return;
    }

    // Simulate voucher generation
    const newVouchers = Array.from({ length: quantity }, (_, i) => ({
      code: `TLW-${Date.now().toString().slice(-6)}${i}`,
      planId: selectedPlan,
      isUsed: false,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    }));

    toast({
      title: "Vouchers Generated",
      description: `Successfully generated ${quantity} voucher(s).`,
    });

    // Reset form
    setSelectedPlan('');
    setQuantity(1);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Voucher code copied to clipboard.",
    });
  };

  const exportVouchers = () => {
    // Simulate export functionality
    toast({
      title: "Export Started",
      description: "Vouchers are being exported to CSV.",
    });
  };

  const getPlanName = (planId: string) => {
    const plan = defaultPlans.find(p => p.id === planId);
    return plan?.name || 'Unknown Plan';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Vouchers Management</h1>
          <p className="text-muted-foreground">Generate and manage vouchers</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportVouchers}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Generate Vouchers */}
      <Card className="shadow-card mb-6">
        <CardHeader>
          <CardTitle>Generate New Vouchers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="plan">Select Plan</Label>
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a plan" />
                </SelectTrigger>
                <SelectContent>
                  {defaultPlans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name} - UGX {plan.price.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-32">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="flex items-end">
              <Button variant="premium" onClick={generateVouchers}>
                <Plus className="w-4 h-4 mr-2" />
                Generate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card className="shadow-card mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search vouchers by code or user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vouchers Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Vouchers ({filteredVouchers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Used By</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVouchers.map((voucher) => (
                  <TableRow key={voucher.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <code className="font-mono">{voucher.code}</code>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => copyToClipboard(voucher.code)}
                          className="h-6 w-6"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{getPlanName(voucher.planId)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={voucher.isUsed ? "secondary" : "default"}>
                        {voucher.isUsed ? 'Used' : 'Available'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {voucher.usedBy ? (
                        <div>
                          <p className="font-medium">{voucher.usedBy}</p>
                          <p className="text-xs text-muted-foreground">
                            {voucher.usedAt?.toLocaleDateString()}
                          </p>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{voucher.createdAt.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={voucher.expiresAt < new Date() ? 'text-destructive' : ''}>
                        {voucher.expiresAt.toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Voucher Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Code</Label>
                              <div className="flex items-center space-x-2">
                                <Input value={voucher.code} readOnly className="font-mono" />
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  onClick={() => copyToClipboard(voucher.code)}
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <div>
                              <Label>Plan</Label>
                              <Input value={getPlanName(voucher.planId)} readOnly />
                            </div>
                            <div>
                              <Label>Status</Label>
                              <Input value={voucher.isUsed ? 'Used' : 'Available'} readOnly />
                            </div>
                            {voucher.usedBy && (
                              <div>
                                <Label>Used By</Label>
                                <Input value={voucher.usedBy} readOnly />
                              </div>
                            )}
                            <div>
                              <Label>Expires</Label>
                              <Input value={voucher.expiresAt.toLocaleDateString()} readOnly />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};