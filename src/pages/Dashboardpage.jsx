import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Users,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import ProjectsPage from '../pages/Projectspage';

const DashboardPage = ({ user, onNavigateToProjects }) => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const stats = [
    {
      label: 'Total Revenue',
      value: '$124,592',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-primary-500 to-primary-600'
    },
    {
      label: 'Active Projects',
      value: '23',
      change: '+3',
      trend: 'up',
      icon: FileText,
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      label: 'Total Clients',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'from-accent-purple to-accent-blue'
    },
    {
      label: 'Conversion Rate',
      value: '68%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
      color: 'from-accent-orange to-accent-yellow'
    }
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-2xl p-6 sm:p-8 border border-primary-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 rounded-full opacity-10 blur-3xl"></div>
        <div className="relative">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
            {greeting}, {user?.name || 'there'}! 👋
          </h2>
          <p className="text-neutral-600 text-lg">
            {user?.businessName || 'Your Business'} Dashboard
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-neutral-200 hover:shadow-medium hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-soft`}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                  stat.trend === 'up' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-error/10 text-error'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-neutral-600 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-neutral-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Projects Section - Import ProjectsPage Component */}
      <ProjectsPage onNavigateToProject={onNavigateToProjects} />
    </div>
  );
};

export default DashboardPage;