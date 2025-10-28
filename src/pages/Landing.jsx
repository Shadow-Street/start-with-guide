import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  Shield, 
  MessageSquare, 
  BarChart3, 
  Zap,
  CheckCircle2,
  ArrowRight,
  Star
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/Dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Real-Time Market Data",
      description: "Access live stock prices, charts, and market trends to make informed decisions."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Insights",
      description: "Connect with 10K+ traders sharing strategies, tips, and market analysis."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Expert Chat Rooms",
      description: "Join 500+ active discussions with advisors and experienced traders."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Portfolio Tracking",
      description: "Monitor your investments with advanced analytics and performance metrics."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Platform",
      description: "Bank-level security to protect your data and transactions."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Alerts",
      description: "Get notified about market movements and trading opportunities instantly."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Create Account",
      description: "Sign up in seconds and join our trading community."
    },
    {
      number: "02",
      title: "Connect & Learn",
      description: "Follow experts, join discussions, and build your strategy."
    },
    {
      number: "03",
      title: "Trade Smarter",
      description: "Execute trades with confidence backed by community insights."
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
        "3 chat rooms",
        "Portfolio tracking"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Premium",
      price: "$29",
      period: "per month",
      features: [
        "Real-time data",
        "Unlimited chat rooms",
        "Expert advisors",
        "Advanced analytics",
        "Priority support"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "VIP",
      price: "$99",
      period: "per month",
      features: [
        "Everything in Premium",
        "1-on-1 advisor sessions",
        "Exclusive events",
        "API access",
        "Custom strategies"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Day Trader",
      content: "This platform transformed my trading. The community insights are invaluable!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Investment Advisor",
      content: "Best tool for connecting with clients and sharing market analysis in real-time.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Retail Investor",
      content: "Finally, a platform that makes trading accessible and social. Love it!",
      rating: 5
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-indigo-600 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400 to-cyan-600 opacity-20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg">
              Trusted by 10,000+ Traders
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trade Smarter, Together
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the community-powered trading platform where insights meet action. 
              Connect, learn, and trade with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/Register')} 
                className="text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => scrollToSection('features')} 
                className="text-lg border-2 border-purple-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
              >
                Learn More
              </Button>
            </div>
            
            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-lg border border-blue-100">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">10K+</div>
                <div className="text-slate-600 font-medium">Active Traders</div>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-white to-purple-50 shadow-lg border border-purple-100">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">500+</div>
                <div className="text-slate-600 font-medium">Daily Discussions</div>
              </div>
              <div className="col-span-2 md:col-span-1 p-6 rounded-xl bg-gradient-to-br from-white to-indigo-50 shadow-lg border border-indigo-100">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">$2M+</div>
                <div className="text-slate-600 font-medium">Trading Volume</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed for traders of all levels
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-br from-white to-slate-50 border-slate-200">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mb-4 shadow-md">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="text-6xl font-bold bg-gradient-to-br from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-800">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 via-transparent to-blue-50/40"></div>
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
                className={`relative ${plan.popular ? 'border-purple-300 shadow-xl scale-105 bg-gradient-to-br from-white to-purple-50' : 'bg-gradient-to-br from-white to-slate-50'}`}
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
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-md' : ''}`}
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
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              What Our Traders Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied traders
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-purple-500 text-purple-500" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMThjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTE4LTE4YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDE4YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join 10,000+ traders who are already trading smarter with our platform
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/Register')}
            className="text-lg bg-white text-purple-600 hover:bg-slate-100 shadow-2xl hover:shadow-3xl transition-all font-bold"
          >
            Get Started Free Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Product</h3>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/Dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-slate-300">
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/Feedback" className="hover:text-white transition-colors">Feedback</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Resources</h3>
              <ul className="space-y-2 text-slate-300">
                <li><a href="/Advisors" className="hover:text-white transition-colors">Advisors</a></li>
                <li><a href="/News" className="hover:text-white transition-colors">News</a></li>
                <li><a href="/Events" className="hover:text-white transition-colors">Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Legal</h3>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>&copy; 2025 TradingPlatform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;