import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Users, Shield } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-background">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-secondary/50 backdrop-blur-sm rounded-full border border-border">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Trusted by 10,000+ investors
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
              Invest Smarter.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                Grow Together.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Join the investment community powered by real-time data, trusted advisors, 
              and collaborative decision-making. Make informed investments with confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/Register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 text-lg px-8 py-6 group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/Login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-lg px-8 py-6"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Mini Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-8">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="text-2xl font-bold text-foreground">$2.5B+</p>
                  <p className="text-xs text-muted-foreground">Assets Tracked</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="text-2xl font-bold text-foreground">10K+</p>
                  <p className="text-xs text-muted-foreground">Active Traders</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[500px] rounded-2xl bg-gradient-to-br from-secondary/50 to-secondary/20 backdrop-blur-sm border border-border overflow-hidden">
              {/* Glassmorphism Card Stack */}
              <div className="absolute top-10 left-10 w-64 h-40 bg-card/80 backdrop-blur-md rounded-xl border border-border shadow-xl p-6 transform hover:scale-105 transition-transform">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Portfolio Value</p>
                  <p className="text-3xl font-bold text-foreground">$124,580</p>
                  <p className="text-sm text-green-500">+12.5% this month</p>
                </div>
              </div>

              <div className="absolute bottom-20 right-10 w-72 h-48 bg-card/80 backdrop-blur-md rounded-xl border border-border shadow-xl p-6 transform hover:scale-105 transition-transform">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Top Advisor</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60" />
                    <div>
                      <p className="font-semibold text-foreground">Sarah Chen</p>
                      <p className="text-xs text-muted-foreground">+28% avg returns</p>
                    </div>
                  </div>
                  <div className="pt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Success Rate</span>
                      <span className="text-foreground font-medium">94%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Gradient Orbs */}
              <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-pulse delay-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
