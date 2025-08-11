import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { defaultPlans } from "@/types/billing";

export const PurchasePlan = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    if (!selectedPlanId || !paymentMethod) {
      toast({
        title: "Missing Information",
        description: "Please select a plan and payment method.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const selectedPlan = defaultPlans.find(p => p.id === selectedPlanId);
      if (!selectedPlan) throw new Error("Plan not found");

      // Create subscription
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + selectedPlan.duration / 24); // Convert hours to days

      const { data: subscription, error: subscriptionError } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user?.id,
          plan_id: selectedPlanId,
          end_date: endDate.toISOString(),
          amount_paid: selectedPlan.price,
          payment_method: paymentMethod,
          is_active: true
        })
        .select()
        .single();

      if (subscriptionError) throw subscriptionError;

      // Create payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user?.id,
          subscription_id: subscription.id,
          amount: selectedPlan.price,
          payment_method: paymentMethod,
          payment_status: 'completed'
        });

      if (paymentError) throw paymentError;

      // Award loyalty points (1 point per 1000 UGX)
      const pointsEarned = Math.floor(selectedPlan.price / 1000);
      
      // Get current profile data
      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('loyalty_points, total_spent')
        .eq('id', user?.id)
        .single();
      
      const { error: pointsError } = await supabase
        .from('profiles')
        .update({ 
          loyalty_points: (currentProfile?.loyalty_points || 0) + pointsEarned,
          total_spent: (currentProfile?.total_spent || 0) + selectedPlan.price
        })
        .eq('id', user?.id);

      if (pointsError) throw pointsError;

      // Send SMS notification
      const { data: profileData } = await supabase
        .from('profiles')
        .select('phone_number')
        .eq('id', user?.id)
        .single();

      if (profileData?.phone_number) {
        const message = `TriLink Wireless: Your ${selectedPlan.name} plan has been activated! Valid until ${endDate.toLocaleDateString()}. You earned ${pointsEarned} loyalty points!`;
        
        await supabase.functions.invoke('send-sms', {
          body: {
            phoneNumber: profileData.phone_number,
            message: message,
            type: 'plan_purchase'
          }
        });
      }

      toast({
        title: "Plan Purchased!",
        description: `${selectedPlan.name} activated successfully. You earned ${pointsEarned} loyalty points!`,
      });

      // Reset form
      setSelectedPlanId("");
      setPaymentMethod("");
      
    } catch (error) {
      console.error('Purchase error:', error);
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Purchase Internet Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Plan</label>
          <Select value={selectedPlanId} onValueChange={setSelectedPlanId}>
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

        <div className="space-y-2">
          <label className="text-sm font-medium">Payment Method</label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Choose payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mobile_money">Mobile Money</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="voucher">Voucher</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedPlanId && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-sm">
              <strong>Plan Details:</strong>
              {(() => {
                const plan = defaultPlans.find(p => p.id === selectedPlanId);
                return plan ? (
                  <div className="mt-1">
                    <p>Duration: {plan.duration / 24} days</p>
                    <p>Price: UGX {plan.price.toLocaleString()}</p>
                    <p>Loyalty Points: {Math.floor(plan.price / 1000)} points</p>
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        )}

        <Button 
          onClick={handlePurchase} 
          className="w-full" 
          disabled={isLoading || !selectedPlanId || !paymentMethod}
        >
          {isLoading ? "Processing..." : "Purchase Plan"}
        </Button>
      </CardContent>
    </Card>
  );
};