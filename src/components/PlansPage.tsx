import { useState } from "react";
import { Check, Wifi, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { defaultPlans, type Plan } from "@/types/billing";
import { PurchasePlan } from "@/components/purchase/PurchasePlan";

export const PlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    macAddress: ''
  });
  const { toast } = useToast();

  const handlePurchase = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    // Simulate purchase
    toast({
      title: "Purchase Successful!",
      description: `Your ${selectedPlan.name} plan has been activated. Voucher code: TLW-${Date.now().toString().slice(-6)}`,
    });

    // Reset form
    setFormData({ username: '', phone: '', macAddress: '' });
    setSelectedPlan(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Perfect Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Flexible internet plans with loyalty rewards. 
          All plans include unlimited data with no hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {defaultPlans.map((plan, index) => (
          <Card 
            key={plan.id} 
            className={`relative shadow-card hover:shadow-primary transition-all duration-300 ${
              index === 1 ? 'ring-2 ring-primary scale-105' : ''
            }`}
          >
            {index === 1 && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                <Star className="w-3 h-3 mr-1" />
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <div className="text-4xl font-bold text-primary mt-4">
                UGX {plan.price.toLocaleString()}
              </div>
              {plan.discount > 0 && (
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  Save {plan.discount}%
                </Badge>
              )}
              <p className="text-muted-foreground mt-2">{plan.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-success" />
                  <span>Unlimited Data</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Wifi className="w-5 h-5 text-success" />
                  <span>High Speed Internet</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-success" />
                  <span>{plan.duration === 24 ? '24 Hours' : plan.duration === 168 ? '7 Days' : '30 Days'} Access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-success" />
                  <span>No Installation Fee</span>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant={index === 1 ? "premium" : "default"}
                    className="w-full mt-6"
                    onClick={() => handlePurchase(plan)}
                  >
                    Choose {plan.name}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Purchase {selectedPlan?.name}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="macAddress">MAC Address (Optional)</Label>
                      <Input
                        id="macAddress"
                        placeholder="XX:XX:XX:XX:XX:XX"
                        value={formData.macAddress}
                        onChange={(e) => setFormData(prev => ({ ...prev, macAddress: e.target.value }))}
                      />
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold">Order Summary</h4>
                      <p>Plan: {selectedPlan?.name}</p>
                      <p>Duration: {selectedPlan?.duration === 24 ? '24 Hours' : selectedPlan?.duration === 168 ? '7 Days' : '30 Days'}</p>
                      <p className="text-lg font-bold">Total: UGX {selectedPlan?.price.toLocaleString()}</p>
                    </div>
                    <Button type="submit" className="w-full" variant="premium">
                      Confirm Purchase
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Contact our support team for personalized assistance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline">
            Call: 0771712356
          </Button>
          <Button variant="outline">
            Email: katsdenzel@gmail.com
          </Button>
        </div>
      </div>

      {/* Purchase Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Purchase Your Plan</h2>
          <PurchasePlan />
        </div>
      </section>
    </div>
  );
};