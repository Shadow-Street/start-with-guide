import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Star } from 'lucide-react';
import LandingNavbar from '@/components/landing/LandingNavbar';
import HeroSection from '@/components/landing/HeroSection';
import FeatureSection from '@/components/landing/FeatureSection';
import LandingFooter from '@/components/landing/LandingFooter';

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/Dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Day Trader",
      content: "This platform transformed my trading. The community insights are invaluable and the real-time data keeps me ahead of the market.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Investment Advisor",
      content: "Best tool for connecting with clients and sharing market analysis. The advisor features are exactly what I needed.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Retail Investor",
      content: "Finally, a platform that makes investing accessible and social. I've learned so much from the community!",
      rating: 5
    }
  ];


  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Basic market data",
        "Community access",
        "5 chat rooms",
        "Portfolio tracking",
        "Mobile app access"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Premium",
      price: "$29",
      period: "per month",
      features: [
        "Real-time market data",
        "Unlimited chat rooms",
        "Expert advisor access",
        "Advanced analytics & charts",
        "Priority support",
        "Custom alerts"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      features: [
        "Everything in Premium",
        "1-on-1 advisor sessions",
        "Exclusive investment events",
        "API access & integrations",
        "Custom trading strategies",
        "Dedicated account manager"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  // Show loading or nothing while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only render landing if not authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div id="home" className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 dark:via-blue-950/10 to-purple-50/30 dark:to-purple-950/10">
      {/* Fixed Navbar */}
      <LandingNavbar />
      
      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20"></div>
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 dark:from-purple-950/10 via-transparent to-blue-50/40 dark:to-blue-950/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free, upgrade when you're ready
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular 
                    ? 'border-purple-400 shadow-2xl md:scale-105 bg-gradient-to-br from-card to-purple-50/50 dark:to-purple-950/20' 
                    : 'bg-card/50 hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0 shadow-md">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => navigate('/Register')}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 dark:from-blue-950/20 to-purple-50/50 dark:to-purple-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                What Our Investors
              </span>
              <br />
              <span className="text-foreground">Are Saying</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied investors worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic leading-relaxed text-foreground/80">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMThjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTE4LTE4YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDE4YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Transform Your Investing?
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
            Join 10,000+ investors who are already making smarter decisions with our platform
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/Register')}
            className="text-lg px-8 py-6 bg-white text-purple-600 hover:bg-slate-100 shadow-2xl hover:shadow-3xl transition-all font-bold hover:scale-105"
          >
            Get Started Free Today
            <CheckCircle2 className="ml-2 w-5 h-5" />
          </Button>
          <p className="mt-6 text-sm opacity-75">No credit card required • Start in 60 seconds</p>
        </div>
      </section>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default Landing;