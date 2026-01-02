import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from '../../utils/router';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../contexts/AuthContext';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusCounts, setStatusCounts] = useState({
    all: 0,
    lead: 0,
    draft: 0,
    bidding: 0,
    approved: 0,
    'in-progress': 0,
    completed: 0,
    archived: 0
  });

  const tabs = [
    { id: 'all', label: 'All', count: statusCounts.all },
    { id: 'lead', label: 'Lead', count: statusCounts.lead },
    { id: 'draft', label: 'Draft', count: statusCounts.draft },
    { id: 'bidding', label: 'Bidding', count: statusCounts.bidding },
    { id: 'approved', label: 'Approved', count: statusCounts.approved },
    { id: 'in-progress', label: 'In progress', count: statusCounts['in-progress'] },
    { id: 'completed', label: 'Completed', count: statusCounts.completed },
    { id: 'archived', label: 'Archived', count: statusCounts.archived }
  ];

  // Fetch projects from Supabase
  useEffect(() => {
    fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch projects with client information
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select(`
          *,
          clients (
            id,
            name,
            email
          )
        `)
        .eq('profile_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setProjects(data || []);
      
      // Calculate status counts
      const counts = {
        all: data?.length || 0,
        lead: 0,
        draft: 0,
        bidding: 0,
        approved: 0,
        'in-progress': 0,
        completed: 0,
        archived: 0
      };

      data?.forEach(project => {
        const status = project.status?.toLowerCase() || 'lead';
        if (counts.hasOwnProperty(status)) {
          counts[status]++;
        }
      });

      setStatusCounts(counts);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    try {
      // Create new project in database
      const { data: newProject, error: createError } = await supabase
        .from('projects')
        .insert({
          profile_id: user.id,
          name: 'Untitled project',
          status: 'lead',
          total_amount: 0
        })
        .select()
        .single();

      if (createError) throw createError;

      // Navigate to the new project
      navigate(`/projects/${newProject.id}`);
    } catch (err) {
      console.error('Error creating project:', err);
      setError('Failed to create project. Please try again.');
    }
  };

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
    navigate(`/projects/${project.id}`);
  };

  // Filter projects based on active tab and search
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.clients?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
      project.status?.toLowerCase() === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount || 0);
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      'lead': 'bg-blue-100 text-blue-700',
      'draft': 'bg-neutral-100 text-neutral-700',
      'bidding': 'bg-yellow-100 text-yellow-700',
      'approved': 'bg-green-100 text-green-700',
      'in-progress': 'bg-primary-100 text-primary-700',
      'completed': 'bg-emerald-100 text-emerald-700',
      'archived': 'bg-neutral-100 text-neutral-500'
    };
    return colors[status?.toLowerCase()] || 'bg-neutral-100 text-neutral-700';
  };

  if (loading) {
    return (
      <div className="max-w-5xl space-y-6 w-full">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-6 w-full overflow-x-hidden">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900">Projects</h1>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative max-w-full">
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
            onClick={handleCreateProject}
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
            <span className="text-primary-600 font-bold">
              {Math.min(projects.length, 5)}/5
            </span>
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Next steps</p>
            <p className="text-sm text-neutral-600">
              {projects.length === 0 ? 'Create your first project' : 'Keep building your business'}
            </p>
          </div>
        </div>
        <button className="text-sm text-primary-600 font-semibold hover:text-primary-700">
          View steps
        </button>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="divide-y divide-neutral-200">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="p-6 hover:bg-neutral-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Project Name & Client */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors mb-1 truncate">
                    {project.name}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <span>{project.id?.slice(0, 13)}</span>
                    {project.clients && (
                      <>
                        <span>•</span>
                        <span className="truncate">{project.clients.name}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${getStatusBadgeColor(project.status)}`}>
                  <Sparkles className="w-3 h-3" />
                  {project.status || 'Lead'}
                </span>

                {/* Amount */}
                <span className="text-lg font-bold text-neutral-900 min-w-[120px] text-right">
                  {formatCurrency(project.total_amount)}
                </span>

                {/* Menu Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add menu logic here
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
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              {searchQuery ? 'No projects found' : 'No projects yet'}
            </h3>
            <p className="text-neutral-600 mb-4">
              {searchQuery 
                ? 'Try adjusting your search or filters' 
                : 'Create your first project to get started'}
            </p>
            {!searchQuery && (
              <button
                onClick={handleCreateProject}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span>Create Project</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;