import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, Users, Shield } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-purple-600 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-400 to-indigo-600 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg px-4 py-2">
              Trusted by 10,000+ Investors
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Invest Smarter.
              </span>
              <br />
              <span className="text-foreground">Grow Together.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl">
              Your investment community powered by data and people. Connect with trusted advisors, 
              join community polls, and make informed decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/Register')} 
                className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all group"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/Login')}
                className="text-lg border-2 hover:bg-accent"
              >
                Sign In
              </Button>
            </div>
            
            {/* Mini stats */}
            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-bold text-lg">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Investors</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-bold text-lg">$2M+</div>
                  <div className="text-sm text-muted-foreground">Trading Volume</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <div className="font-bold text-lg">Bank-Level</div>
                  <div className="text-sm text-muted-foreground">Security</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Illustration/Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              {/* Glassmorphism card */}
              <div className="backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  {/* Mock chart visualization */}
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium">Portfolio Growth</span>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-700 dark:text-green-300">
                        +24.5%
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      {[70, 85, 65, 90, 75, 95].map((width, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="flex-1 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg" style={{ width: `${width}%` }}></div>
                          <span className="text-xs text-muted-foreground">${(width * 100).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mock stats cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-4 backdrop-blur-sm border border-blue-500/20">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                        500+
                      </div>
                      <div className="text-xs text-muted-foreground">Active Polls</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-4 backdrop-blur-sm border border-purple-500/20">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                        150+
                      </div>
                      <div className="text-xs text-muted-foreground">Expert Advisors</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-60 blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full opacity-60 blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
