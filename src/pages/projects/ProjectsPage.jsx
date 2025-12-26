import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List
} from 'lucide-react';

const ProjectsPage = ({ onNavigateToProject }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all', label: 'All', count: 53 },
    { id: 'lead', label: 'Lead', count: 8 },
    { id: 'draft', label: 'Draft', count: 38 },
    { id: 'bidding', label: 'Bidding', count: 5 },
    { id: 'approved', label: 'Approved', count: 1 },
    { id: 'in-progress', label: 'In progress', count: 0 },
    { id: 'completed', label: 'Completed', count: 1 },
    { id: 'archived', label: 'Archived', count: 0 }
  ];

  const projects = [
    {
      id: 'PRJ-10055',
      name: 'Untitled project',
      status: 'Lead',
      teammate: 'No teammate',
      amount: 0.00
    },
    {
      id: 'PRJ-10054',
      name: 'Untitled project',
      status: 'Lead',
      teammate: 'No teammate',
      amount: 0.00
    },
    {
      id: 'PRJ-10053',
      name: 'Untitled project',
      status: 'Lead',
      teammate: 'No teammate',
      amount: 0.00
    },
    {
      id: 'PRJ-10052',
      name: 'Untitled project',
      status: 'Lead',
      teammate: 'No teammate',
      amount: 0.00
    },
    {
      id: 'PRJ-10051',
      name: 'Untitled project',
      status: 'Lead',
      teammate: 'No teammate',
      amount: 0.00
    }
  ];

  const scrollTabs = (direction) => {
    const container = document.getElementById('tabs-container');
    const scrollAmount = 200;
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleProjectClick = (project) => {
    if (onNavigateToProject) {
      onNavigateToProject(project);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900">Projects</h1>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none w-64"
            />
          </div>

          {/* New Project Button */}
          <button 
            onClick={() => handleProjectClick({ id: 'new', name: 'New Project' })}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>New</span>
          </button>
        </div>
      </div>

      {/* Tabs with Arrow Navigation */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-4">
        <div className="flex items-center gap-2">
          {/* Left Arrow */}
          <button
            onClick={() => scrollTabs('left')}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-600" />
          </button>

          {/* Tabs Container */}
          <div 
            id="tabs-container"
            className="flex-1 flex items-center gap-2 overflow-x-hidden scroll-smooth"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-0.5 rounded-md text-xs font-semibold ${
                  activeTab === tab.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollTabs('right')}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-neutral-600" />
          </button>

          {/* View Mode Toggle */}
          <div className="flex-shrink-0 flex items-center gap-1 ml-2 p-1 bg-neutral-100 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Next Steps Banner */}
      <div className="bg-primary-50 border border-primary-200 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-soft">
            <span className="text-primary-600 font-bold">4/5</span>
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Next steps</p>
            <p className="text-sm text-neutral-600">Complete your onboarding</p>
          </div>
        </div>
        <button className="text-sm text-primary-600 font-semibold hover:text-primary-700">
          View steps
        </button>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        {/* Project Rows - No Header */}
        <div className="divide-y divide-neutral-200">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="p-6 hover:bg-neutral-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Project Name */}
                <div className="flex-1">
                  <h4 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors mb-1">
                    {project.name}
                  </h4>
                  <p className="text-sm text-neutral-500">{project.id}</p>
                </div>

                {/* Status Badge */}
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 text-neutral-700">
                  <Sparkles className="w-3 h-3" />
                  {project.status}
                </span>

                {/* Teammate */}
                <span className="text-sm text-neutral-600 min-w-[100px] text-center">
                  {project.teammate}
                </span>

                {/* Amount */}
                <span className="text-lg font-bold text-neutral-900 min-w-[100px] text-right">
                  ${project.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>

                {/* Menu Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="px-6 py-20 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">No projects found</h3>
            <p className="text-neutral-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;