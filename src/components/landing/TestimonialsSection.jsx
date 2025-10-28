import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Michael Chen',
      role: 'Day Trader',
      avatar: 'MC',
      content:
        "ProtoCall has transformed how I approach investing. The community insights and expert advice have helped me make better decisions.",
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      role: 'Portfolio Manager',
      avatar: 'SJ',
      content:
        'The real-time data and analytics tools are exceptional. I can track multiple portfolios and get instant market updates.',
      rating: 5,
    },
    {
      name: 'David Rodriguez',
      role: 'Retail Investor',
      avatar: 'DR',
      content:
        'As a beginner, the advisor network and educational resources have been invaluable. Highly recommend for anyone starting out.',
      rating: 5,
    },
  ];

  return (
    <section id="community" className="py-20 sm:py-28 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Thousands of Investors
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our community members are saying about their experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border p-8 space-y-6 hover:shadow-lg transition-shadow"
            >
              {/* Rating */}
              <div className="flex space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3 pt-4 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
