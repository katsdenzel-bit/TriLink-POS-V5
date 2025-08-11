import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Wifi, Gift, Clock, Award } from "lucide-react";

interface Subscription {
  id: string;
  plan_id: string;
  end_date: string;
  is_active: boolean;
  amount_paid: number;
  plans: {
    name: string;
    duration_days: number;
  };
}

interface LoyaltyReward {
  id: string;
  points_required: number;
  reward_type: string;
  days_granted: number;
  is_redeemed: boolean;
}

export const CustomerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [loyaltyRewards, setLoyaltyRewards] = useState<LoyaltyReward[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCustomerData();
    }
  }, [user]);

  const fetchCustomerData = async () => {
    try {
      // Fetch active subscription
      const { data: subscriptionData } = await supabase
        .from('subscriptions')
        .select(`
          *,
          plans(name, duration_days)
        `)
        .eq('user_id', user?.id)
        .eq('is_active', true)
        .single();

      setSubscription(subscriptionData);

      // Fetch loyalty points
      const { data: profileData } = await supabase
        .from('profiles')
        .select('loyalty_points')
        .eq('id', user?.id)
        .single();

      setLoyaltyPoints(profileData?.loyalty_points || 0);

      // Fetch loyalty rewards
      const { data: rewardsData } = await supabase
        .from('loyalty_rewards')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      setLoyaltyRewards(rewardsData || []);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const redeemReward = async (rewardId: string, pointsCost: number, daysGranted: number) => {
    if (loyaltyPoints < pointsCost) {
      toast({
        title: "Insufficient Points",
        description: `You need ${pointsCost} points to redeem this reward.`,
        variant: "destructive",
      });
      return;
    }

    try {
      // Update reward as redeemed
      const { error: rewardError } = await supabase
        .from('loyalty_rewards')
        .update({ 
          is_redeemed: true, 
          redeemed_at: new Date().toISOString() 
        })
        .eq('id', rewardId);

      if (rewardError) throw rewardError;

      // Deduct points from profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          loyalty_points: loyaltyPoints - pointsCost 
        })
        .eq('id', user?.id);

      if (profileError) throw profileError;

      toast({
        title: "Reward Redeemed!",
        description: `You've received ${daysGranted} days of free internet!`,
      });

      fetchCustomerData();
    } catch (error) {
      toast({
        title: "Redemption Failed",
        description: "Failed to redeem reward. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const daysRemaining = subscription ? 
    Math.max(0, Math.ceil((new Date(subscription.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Current Plan */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscription?.plans?.name || "No Active Plan"}
            </div>
            <p className="text-xs text-muted-foreground">
              {subscription ? `${daysRemaining} days remaining` : "Purchase a plan to get started"}
            </p>
            {subscription && (
              <div className="mt-2">
                <Progress 
                  value={((subscription.plans.duration_days - daysRemaining) / subscription.plans.duration_days) * 100} 
                  className="h-2"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loyalty Points */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{loyaltyPoints}</div>
            <p className="text-xs text-muted-foreground">
              Earned from purchases • 1 point per UGX 1000
            </p>
          </CardContent>
        </Card>

        {/* Plan Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={subscription?.is_active ? "default" : "secondary"}>
              {subscription?.is_active ? "Active" : "Inactive"}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              {subscription ? `Expires: ${new Date(subscription.end_date).toLocaleDateString()}` : "No active subscription"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Loyalty Rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Loyalty Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Free Day Rewards */}
            {[50, 100, 200].map((points) => (
              <Card key={points} className="border-dashed">
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-primary">{points} Points</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    {points === 50 ? "1 Free Day" : points === 100 ? "3 Free Days" : "7 Free Days"}
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full"
                    disabled={loyaltyPoints < points}
                    onClick={() => {
                      const days = points === 50 ? 1 : points === 100 ? 3 : 7;
                      // Create reward and redeem immediately
                      supabase.from('loyalty_rewards').insert({
                        user_id: user?.id,
                        points_required: points,
                        reward_type: 'free_days',
                        days_granted: days
                      }).then(() => {
                        redeemReward('temp', points, days);
                      });
                    }}
                  >
                    Redeem
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {loyaltyRewards.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Your Rewards History</h3>
              <div className="space-y-2">
                {loyaltyRewards.map((reward) => (
                  <div key={reward.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <span className="font-medium">
                        {reward.reward_type === 'free_days' ? `${reward.days_granted} Free Days` : reward.reward_type}
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        ({reward.points_required} points)
                      </span>
                    </div>
                    <Badge variant={reward.is_redeemed ? "default" : "secondary"}>
                      {reward.is_redeemed ? "Redeemed" : "Available"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};