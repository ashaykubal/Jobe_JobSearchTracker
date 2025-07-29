import React, { useState } from 'react';
import { Briefcase, ArrowRight, MessageSquare, Bot, BarChart3, Kanban, Mail, Lock, User, Github } from 'lucide-react';

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const features = [
    {
      icon: MessageSquare,
      title: 'Conversational Search Creation',
      description: 'A unique, quiz-like chat interface that allows users to easily define and save complex job search parameters.',
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      icon: Bot,
      title: 'Automated Job Scraping & Parsing',
      description: 'An autonomous agent that scours specified job boards, identifies matching postings, and uses AI to extract key details like job description, company name, and application URL.',
      color: 'text-secondary',
      bg: 'bg-secondary/10',
    },
    {
      icon: Kanban,
      title: 'Centralized Application Status Tracking',
      description: 'A clean, card-based interface where users can view all their discovered job opportunities and track their progress through the application lifecycle (e.g., Applied, Interviewing, Offer).',
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
    },
    {
      icon: BarChart3,
      title: 'Visual Performance Dashboard',
      description: 'A dashboard that provides users with a visual representation of their job search activity, including a waterfall chart that shows their application funnel over time.',
      color: 'text-orange-400',
      bg: 'bg-orange-400/10',
    },
  ];

  return (
    <div className="bg-dark-bg">
      {/* Hero Section */}
      <div className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-200 mb-6">
            Revolutionize Your Job Search
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            Harness the power of Jobe, your AI powered career co-pilot to search for the latest jobs and give you the edge in being the first to apply to your dream job in this crowded market.
          </p>
        </div>
      </div>

      {/* Hero Section with Auth Form */}
      <div className="pt-10 pb-20 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-dark-card/70 backdrop-blur-sm rounded-lg shadow-glow-card hover:shadow-glow-card-hover transition-all duration-300 p-8 border border-dark-border relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 shadow-glow-primary">
              <img 
                src="/src/assets/headhunterlogo.png" 
                alt="Jobe Logo" 
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  // Fallback to Briefcase icon if logo fails to load
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.innerHTML = '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8"></path></svg>';
                  e.currentTarget.parentNode.appendChild(fallback.firstChild);
                }}
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-200 mb-2">Welcome to Jobe</h1>
            <p className="text-gray-400">Your AI Powered Career Co-Pilot</p>
          </div>

          {/* Auth Toggle */}
          <div className="flex bg-gray-900/50 rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                !isSignUp
                  ? 'bg-primary text-white shadow-glow-primary'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                isSignUp
                  ? 'bg-primary text-white shadow-glow-primary'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-4">
            {/* Name Fields (Sign Up Only) */}
            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      id="firstName"
                      className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-dark-border rounded-lg text-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent focus:scale-105 hover:border-primary/50 transition-all duration-200 ease-in-out"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      id="lastName"
                      className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-dark-border rounded-lg text-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent focus:scale-105 hover:border-primary/50 transition-all duration-200 ease-in-out"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-dark-border rounded-lg text-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent focus:scale-105 hover:border-primary/50 transition-all duration-200 ease-in-out"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  id="password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-dark-border rounded-lg text-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent focus:scale-105 hover:border-primary/50 transition-all duration-200 ease-in-out"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/80 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ease-in-out flex items-center justify-center space-x-2 shadow-glow-primary hover:shadow-glow-primary"
            >
              <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-dark-border"></div>
            <span className="px-4 text-sm text-gray-500">or continue with</span>
            <div className="flex-1 border-t border-dark-border"></div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-dark-border rounded-lg text-gray-300 hover:bg-gray-900/30 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500/50 hover:border-gray-600 transition-all duration-200 ease-in-out">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            
            <button className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-dark-border rounded-lg text-gray-300 hover:bg-gray-900/30 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500/50 hover:border-gray-600 transition-all duration-200 ease-in-out">
              <Github className="w-5 h-5 transition-transform duration-200 ease-in-out hover:scale-110" />
              <span>Continue with GitHub</span>
            </button>
            
            <button className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-dark-border rounded-lg text-gray-300 hover:bg-gray-900/30 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500/50 hover:border-gray-600 transition-all duration-200 ease-in-out">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>Continue with LinkedIn</span>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-dark-card/70 backdrop-blur-sm rounded-lg p-8 shadow-glow-card border border-dark-border hover:shadow-glow-card-hover hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${feature.bg} flex-shrink-0`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-200 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 px-4 border-t border-dark-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-200 mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of professionals who have accelerated their job search with AI
          </p>
          <button
            className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/80 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ease-in-out shadow-glow-primary text-lg"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;