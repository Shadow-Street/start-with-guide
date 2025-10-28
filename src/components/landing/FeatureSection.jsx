import React from 'react';
import {
  TrendingUp,
  Users,
  Vote,
  Shield,
  MessageSquare,
  BarChart3,
} from 'lucide-react';

export default function FeatureSection() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Real-Time Market Insights',
      description:
        'Access live market data, stock prices, and trends powered by advanced analytics and AI.',
    },
    {
      icon: Users,
      title: 'Expert Advisors',
      description:
        'Connect with verified financial advisors and influencers to guide your investment decisions.',
    },
    {
      icon: Vote,
      title: 'Community Polls',
      description:
        'Participate in investment polls and see what the community thinks about market trends.',
    },
    {
      icon: MessageSquare,
      title: 'Discussion Rooms',
      description:
        'Join topic-based chat rooms to discuss strategies, share insights, and learn from peers.',
    },
    {
      icon: BarChart3,
      title: 'Portfolio Analytics',
      description:
        'Track your investments with detailed analytics, performance metrics, and projections.',
    },
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description:
        'Bank-level security with encrypted data, secure authentication, and privacy protection.',
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Invest Smarter
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed to help you make informed investment decisions
            and grow your wealth with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
