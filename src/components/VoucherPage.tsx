import { useState } from "react";
import { Ticket, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const VoucherPage = () => {
  const [voucherCode, setVoucherCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCode.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate voucher validation
      if (voucherCode.startsWith('TLW-')) {
        toast({
          title: "Voucher Activated!",
          description: "Your internet access has been activated successfully.",
        });
        setVoucherCode('');
      } else {
        toast({
          title: "Invalid Voucher",
          description: "Please check your voucher code and try again.",
          variant: "destructive"
        });
      }
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Ticket className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Activate Your Voucher</h1>
          <p className="text-xl text-muted-foreground">
            Enter your voucher code to activate your internet access
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-center">Voucher Activation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="voucher">Voucher Code</Label>
                <Input
                  id="voucher"
                  type="text"
                  placeholder="Enter your voucher code (e.g., TLW-123456)"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  className="text-center text-lg font-mono"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                variant="premium"
                disabled={isLoading}
              >
                {isLoading ? 'Activating...' : 'Activate Voucher'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 text-success mr-2" />
                How to Use
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                1. Purchase a voucher from our shop or authorized dealers
              </p>
              <p className="text-sm text-muted-foreground">
                2. Scratch to reveal your unique voucher code
              </p>
              <p className="text-sm text-muted-foreground">
                3. Enter the code in the form above
              </p>
              <p className="text-sm text-muted-foreground">
                4. Connect to TriLink WiFi network and enjoy!
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-success">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If you're having trouble with your voucher, contact our support team:
              </p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Call: +256 700 123 456
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  WhatsApp Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Don't have a voucher? 
            <Button variant="link" className="p-0 ml-1">
              Purchase one here
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};