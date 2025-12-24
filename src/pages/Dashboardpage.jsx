import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MoreVertical,
  Calendar,
  MapPin
} from 'lucide-react';

const DashboardPage = ({ user }) => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Mock data - replace with real API calls
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

  const recentProjects = [
    {
      id: 'PRJ-ik0ah',
      name: 'Untitled Project',
      status: 'draft',
      statusColor: 'bg-accent-yellow text-neutral-900',
      client: 'No client assigned',
      amount: '$0.00',
      date: 'Nov 29, 2025'
    },
    {
      id: 'PRJ-mw7uf',
      name: '2 marla house.',
      status: 'draft',
      statusColor: 'bg-accent-yellow text-neutral-900',
      client: 'No client assigned',
      amount: '$14,577.50',
      date: 'Nov 22, 2025'
    },
    {
      id: 'PRJ-k1ie7',
      name: 'projectnew',
      status: 'draft',
      statusColor: 'bg-accent-yellow text-neutral-900',
      client: 'No client assigned',
      amount: '$0.00',
      date: 'Nov 22, 2025'
    }
  ];

  const upcomingTasks = [
    { id: 1, title: 'Follow up with John Smith', time: '10:00 AM', priority: 'high' },
    { id: 2, title: 'Review Kitchen Remodel estimate', time: '2:30 PM', priority: 'medium' },
    { id: 3, title: 'Site visit - Oak Street', time: '4:00 PM', priority: 'high' },
    { id: 4, title: 'Submit permit application', time: 'Tomorrow', priority: 'low' }
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
          <p className="text-neutral-600 text-lg mb-6">
            {user?.businessName || 'Your Business'} Dashboard
          </p>
          
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            <Plus className="w-5 h-5" />
            <span>New Project</span>
          </button>
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

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900">Your Projects</h3>
              <button className="text-sm text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                View all
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex items-center gap-4 mt-4 overflow-x-auto pb-2">
              {['All (11)', 'Draft (11)', 'Bidding', 'Approved', 'In progress', 'Completed', 'Archived'].map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    index === 0 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-neutral-200">
            {recentProjects.map((project) => (
              <div 
                key={project.id}
                className="p-6 hover:bg-neutral-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                        {project.name}
                      </h4>
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${project.statusColor}`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 mb-1">{project.id}</p>
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <Users className="w-4 h-4" />
                      <span>{project.client}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-neutral-900 mb-1">{project.amount}</p>
                    <p className="text-xs text-neutral-500">{project.date}</p>
                  </div>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors opacity-0 group-hover:opacity-100">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-neutral-200 bg-neutral-50">
            <button className="w-full py-3 px-4 bg-white border-2 border-neutral-200 rounded-xl text-neutral-700 font-semibold hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-200">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary-600" />
              <h3 className="font-bold text-neutral-900">Today's Schedule</h3>
            </div>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div 
                  key={task.id}
                  className="p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      task.priority === 'high' 
                        ? 'bg-error' 
                        : task.priority === 'medium' 
                        ? 'bg-accent-yellow' 
                        : 'bg-neutral-300'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 group-hover:text-primary-600 transition-colors">
                        {task.title}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">{task.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100">
            <h3 className="font-bold text-neutral-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Create Estimate', icon: '📝' },
                { label: 'Add Client', icon: '👤' },
                { label: 'Schedule Visit', icon: '📍' },
                { label: 'Send Invoice', icon: '💳' }
              ].map((action, index) => (
                <button
                  key={index}
                  className="w-full p-3 bg-white rounded-xl text-left font-medium text-neutral-700 hover:bg-primary-100 hover:text-primary-700 hover:shadow-soft transition-all duration-300 flex items-center gap-3 group"
                >
                  <span className="text-xl">{action.icon}</span>
                  <span className="flex-1">{action.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;