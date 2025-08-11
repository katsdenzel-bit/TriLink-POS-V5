import { Wifi, Shield, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { defaultPlans } from "@/types/billing";

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export const HomePage = ({ onPageChange }: HomePageProps) => {
  const features = [
    {
      icon: Wifi,
      title: "Unlimited Access",
      description: "True unlimited internet with no data caps or fair usage policies"
    },
    {
      icon: Shield,
      title: "Secure Connection",
      description: "Protected network with MAC address binding and secure authentication"
    },
    {
      icon: Clock,
      title: "Flexible Plans",
      description: "Daily, weekly, and monthly plans to suit your needs and budget"
    },
    {
      icon: Users,
      title: "Customer Support",
      description: "24/7 customer support with SMS alerts and real-time notifications"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Welcome to TriLink Wireless
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Affordable • Unlimited • Reliable • Secure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => onPageChange('plans')}
              className="text-lg px-8 py-4"
            >
              View Plans
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onPageChange('voucher')}
              className="text-lg px-8 py-4 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
            >
              Use Voucher
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TriLink?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-primary transition-all duration-300">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto text-primary mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {defaultPlans.map((plan, index) => (
              <Card key={plan.id} className={`shadow-card hover:shadow-primary transition-all duration-300 ${index === 1 ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">
                    UGX {plan.price.toLocaleString()}
                    {plan.discount > 0 && (
                      <span className="text-sm text-success ml-2">
                        {plan.discount}% off
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    variant={index === 1 ? "premium" : "default"}
                    onClick={() => onPageChange('plans')}
                    className="w-full"
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-secondary-foreground mb-6">
            Ready to Get Connected?
          </h2>
          <p className="text-xl text-secondary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers enjoying fast, affordable internet access with loyalty rewards.
          </p>
          <Button 
            variant="outline"
            size="lg"
            onClick={() => onPageChange('plans')}
            className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/20"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};