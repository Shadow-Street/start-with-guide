import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, MessageSquare, Shield } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Real-Time Market Insights",
      description: "Access live stock prices, advanced charts, and AI-powered market analysis to stay ahead of trends.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Trusted Advisors",
      description: "Connect with verified financial advisors and experienced traders. Learn from the best in the industry.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <MessageSquare className="w-7 h-7" />,
      title: "Community Polls",
      description: "Participate in investment polls, share insights, and make data-driven decisions with community support.",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Secure Investments",
      description: "Bank-level encryption and security protocols ensure your data and investments are always protected.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 dark:via-blue-950/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Everything You Need
            </span>
            <br />
            <span className="text-foreground">To Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed for investors of all levels
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-border/50 backdrop-blur-sm bg-card/50"
            >
              <CardHeader>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
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
  );
};

export default FeatureSection;
