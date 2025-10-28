import React from 'react';
import { TrendingUp, Users, MessageSquare, Shield } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      icon: TrendingUp,
      value: '$2.5B+',
      label: 'Assets Under Management',
    },
    {
      icon: Users,
      value: '10,000+',
      label: 'Active Investors',
    },
    {
      icon: MessageSquare,
      value: '500+',
      label: 'Daily Discussions',
    },
    {
      icon: Shield,
      value: '99.9%',
      label: 'Security Uptime',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center space-y-3 group cursor-default"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
