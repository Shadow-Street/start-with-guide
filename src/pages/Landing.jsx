import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import {
  MessageSquare,
  BarChart3,
  Shield,
  Star,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Calendar,
  Crown,
  LineChart,
  Zap,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LandingFooter from "@/components/landing/LandingFooter";

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      navigate("/Dashboard");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleGetStarted = () => navigate("/Register");
  const handleLogin = () => navigate("/Login");

  const features = [
    {
      icon: MessageSquare,
      title: "Live Chat Rooms",
      description: "Real-time discussions with fellow traders on stocks, sectors, and market trends",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Community Polls",
      description: "Vote and see community sentiment on buy/sell decisions for any stock",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "SEBI Verified Advisors",
      description: "Get expert recommendations from registered investment advisors",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Star,
      title: "FinInfluencers",
      description: "Learn from top financial content creators and market experts",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Calendar,
      title: "Trading Events",
      description: "Join webinars, workshops, and live trading sessions",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: LineChart,
      title: "Portfolio Tracking",
      description: "Track your investments, profits, and get smart alerts",
      gradient: "from-teal-500 to-cyan-500",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Traders", icon: Users },
    { number: "500+", label: "Daily Discussions", icon: MessageSquare },
    { number: "50+", label: "Verified Advisors", icon: Shield },
    { number: "98%", label: "User Satisfaction", icon: Award },
  ];

  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for beginners",
      features: [
        "Join public chat rooms",
        "Participate in polls",
        "View community sentiment",
        "Basic portfolio tracking",
        "Market news & updates",
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Premium",
      price: "₹999",
      period: "/month",
      description: "For serious traders",
      features: [
        "Everything in Basic",
        "Access to advisor picks",
        "Premium chat rooms",
        "Advanced analytics",
        "Priority support",
        "Exclusive events",
      ],
      cta: "Start Premium Trial",
      popular: true,
    },
    {
      name: "VIP",
      price: "₹2,499",
      period: "/month",
      description: "Professional trading",
      features: [
        "Everything in Premium",
        "1-on-1 advisor sessions",
        "VIP-only rooms",
        "API access",
        "White-glove support",
        "Early feature access",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const testimonialQuotes = [
    {
      quote: "In investing, what is comfortable is rarely profitable.",
      author: "Robert Arnott",
      role: "Investment Strategist",
    },
    {
      quote: "The stock market is filled with individuals who know the price of everything, but the value of nothing.",
      author: "Philip Fisher",
      role: "Investment Advisor",
    },
    {
      quote: "The four most dangerous words in investing are: 'this time it's different.'",
      author: "Sir John Templeton",
      role: "Investor & Philanthropist",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68bb21f4e5ccdcab161121f6/1dc7cf9b7_FinancialNetworkingLogoProtocol.png"
              alt="Protocol Logo"
              className="w-10 h-10 rounded-lg"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Protocol
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleLogin} className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Login
            </Button>
            <Button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-6 px-4 py-2">
          <Sparkles className="w-4 h-4 mr-2" />
          India's Largest Retail Investor Community
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-700 to-purple-700 bg-clip-text text-transparent">
          Trade Smarter,
          <br />
          Together
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Join thousands of retail investors making informed decisions through real-time discussions, community polls, and expert insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-lg px-8 py-6"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}
            className="text-lg px-8 py-6 border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-4">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <Badge className="bg-blue-100 text-blue-700 mb-4">Platform Features</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-transparent">
            Everything You Need to Trade Smart
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, i) => (
            <Card key={i} className="h-full border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-center text-white">
        <Quote className="w-16 h-16 text-white/30 mx-auto mb-6" />
        <blockquote className="text-2xl md:text-3xl font-semibold mb-6 italic max-w-4xl mx-auto">
          "{testimonialQuotes[0].quote}"
        </blockquote>
        <p className="text-blue-100 text-lg">
          — {testimonialQuotes[0].author}
          <span className="text-blue-200 text-sm ml-2">({testimonialQuotes[0].role})</span>
        </p>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Join India's Top Trading Community?</h2>
        <p className="text-xl text-blue-100 mb-8">
          Over 10,000 traders are already making smarter decisions with Protocol.
        </p>
        <Button
          size="lg"
          onClick={handleGetStarted}
          className="bg-white text-purple-600 hover:bg-blue-50 text-lg px-12 py-6 shadow-2xl"
        >
          Start Trading Smarter Today
          <Zap className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-blue-100 text-sm mt-4">
          No credit card required • Free forever • Upgrade anytime
        </p>
      </section>

      <LandingFooter />
    </div>
  );
}
