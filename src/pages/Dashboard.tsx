import React from 'react';
import { TrendingUp, FileText, Search, Target } from 'lucide-react';
import SankeyDiagram from '../components/SankeyDiagram';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Active Applications', value: '12', icon: FileText, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Job Searches', value: '8', icon: Search, color: 'text-secondary', bg: 'bg-secondary/10' },
    { label: 'Interviews Scheduled', value: '3', icon: Target, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Success Rate', value: '24%', icon: TrendingUp, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  ];

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8 flex items-center">
        {/* Logo */}
        <img 
          src="/src/assets/headhunterlogo.png" 
          alt="Jobe Logo" 
          className="h-20 w-auto object-contain mr-4"
          onError={(e) => {
            // Hide logo if it fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
        
        {/* Header Text */}
        <div>
          <h1 className="text-4xl font-bold text-gray-200 mb-2">Welcome back to Jobe</h1>
          <p className="text-xl text-gray-400">Your AI Powered Career Co-Pilot</p>
        </div>
      </div>

      {/* Application Tracker */}
      <div className="bg-dark-card/70 backdrop-blur-sm rounded-lg p-8 shadow-glow-card border border-dark-border mb-12">
        <h2 className="text-2xl font-bold text-gray-200 mb-6">Application Tracker</h2>
        <div className="w-full">
          <SankeyDiagram />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-dark-card/70 backdrop-blur-sm rounded-lg p-6 shadow-glow-card border border-dark-border hover:shadow-glow-card-hover hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-200">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-dark-card/70 backdrop-blur-sm rounded-lg p-8 shadow-glow-card border border-dark-border">
        <h2 className="text-2xl font-bold text-gray-200 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'Applied to Software Engineer at TechCorp', time: '2 hours ago', status: 'success' },
            { action: 'AI Search completed for React Developer roles', time: '4 hours ago', status: 'info' },
            { action: 'Interview scheduled with StartupXYZ', time: '1 day ago', status: 'warning' },
            { action: 'Application updated for Frontend Developer', time: '2 days ago', status: 'info' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-800/50">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  activity.status === 'success' ? 'bg-secondary' :
                  activity.status === 'warning' ? 'bg-yellow-400' : 'bg-primary'
                }`}></div>
                <span className="font-medium text-gray-200">{activity.action}</span>
              </div>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;