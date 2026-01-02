import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MoreVertical, 
  Clock,
  MessageSquare,
  Sparkles,
  UserX,
  ChevronDown,
  Edit2,
  Check,
  X,
  Loader2,
  AlertCircle,
  Trash2
} from 'lucide-react';
import { useParams, useNavigate } from '../../utils/router';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../contexts/AuthContext';

// Import tab components
import ProjectOverview from '../../components/project/ProjectOverview';
import ProjectEstimates from '../../components/project/ProjectEstimates';
import ProjectInvoices from '../../components/project/ProjectInvoices';
import ProjectDocuments from '../../components/project/ProjectDocuments';
import ProjectFiles from '../../components/project/ProjectFiles';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [updating, setUpdating] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'estimates', label: 'Estimates' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'documents', label: 'Documents' },
    { id: 'files', label: 'Files' }
  ];

  const statuses = [
    { value: 'lead', label: 'Lead', color: 'bg-blue-100 text-blue-700' },
    { value: 'draft', label: 'Draft', color: 'bg-neutral-100 text-neutral-700' },
    { value: 'bidding', label: 'Bidding', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'approved', label: 'Approved', color: 'bg-green-100 text-green-700' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-primary-100 text-primary-700' },
    { value: 'completed', label: 'Completed', color: 'bg-emerald-100 text-emerald-700' },
    { value: 'archived', label: 'Archived', color: 'bg-neutral-100 text-neutral-500' }
  ];

  // Fetch project details
  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id, user]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('projects')
        .select(`
          *,
          clients (
            id,
            name,
            email,
            phone
          )
        `)
        .eq('id', id)
        .eq('profile_id', user.id)
        .single();

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          throw new Error('Project not found');
        }
        throw fetchError;
      }

      setProject(data);
    } catch (err) {
      console.error('Error fetching project:', err);
      setError(err.message || 'Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/projects');
  };

  const handleEditName = () => {
    setTempName(project.name);
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    if (!tempName.trim() || tempName === project.name) {
      setIsEditingName(false);
      return;
    }

    try {
      setUpdating(true);
      
      const { error: updateError } = await supabase
        .from('projects')
        .update({ 
          name: tempName.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('profile_id', user.id);

      if (updateError) throw updateError;

      setProject({ ...project, name: tempName.trim() });
      setIsEditingName(false);
    } catch (err) {
      console.error('Error updating project name:', err);
      setError('Failed to update project name');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setTempName('');
    setIsEditingName(false);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true);
      setShowStatusMenu(false);

      const { error: updateError } = await supabase
        .from('projects')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('profile_id', user.id);

      if (updateError) throw updateError;

      setProject({ ...project, status: newStatus });
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update project status');
    } finally {
      setUpdating(false);
    }
  };

  const handleCreateEstimate = () => {
    setShowCreateMenu(false);
    navigate(`/projects/${id}/estimates/create?projectName=${encodeURIComponent(project.name)}`);
  };

  const handleDeleteProject = async () => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      setUpdating(true);

      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .eq('profile_id', user.id);

      if (deleteError) throw deleteError;

      navigate('/projects');
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Failed to delete project');
      setUpdating(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProjectOverview project={project} onClick={handleCreateEstimate} />;
      case 'estimates':
        return <ProjectEstimates project={project} onClick={handleCreateEstimate} />;
      case 'invoices':
        return <ProjectInvoices project={project} />;
      case 'documents':
        return <ProjectDocuments project={project} />;
      case 'files':
        return <ProjectFiles project={project} />;
      default:
        return <ProjectOverview project={project} onClick={handleCreateEstimate} />;
    }
  };

  const getStatusInfo = () => {
    const status = statuses.find(s => s.value === (project?.status?.toLowerCase() || 'lead'));
    return status || statuses[0];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-semibold text-red-900">Error Loading Project</h3>
          </div>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo();

  return (
    <div className="space-y-6">
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
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors border border-neutral-200"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              {/* Status Badge with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowStatusMenu(!showStatusMenu)}
                  className={`px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-1 transition-all ${statusInfo.color} hover:opacity-80`}
                  disabled={updating}
                >
                  <Sparkles className="w-3 h-3" />
                  {statusInfo.label}
                  <ChevronDown className="w-3 h-3" />
                </button>

                {showStatusMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowStatusMenu(false)}
                    />
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 z-20">
                      {statuses.map((status) => (
                        <button
                          key={status.value}
                          onClick={() => handleStatusChange(status.value)}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-neutral-50 transition-colors ${
                            status.value === project?.status?.toLowerCase() ? 'bg-neutral-50 font-medium' : ''
                          }`}
                        >
                          {status.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {project?.clients ? (
                <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-sm font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {project.clients.name}
                </span>
              ) : (
                <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-sm font-medium flex items-center gap-1">
                  <UserX className="w-3 h-3" />
                  No client
                </span>
              )}
            </div>
            
            {/* Editable Project Name */}
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveName();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                  className="text-3xl font-bold text-neutral-900 border-2 border-primary-500 rounded-lg px-3 py-1 focus:outline-none"
                  autoFocus
                  disabled={updating}
                />
                <button
                  onClick={handleSaveName}
                  disabled={updating}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors disabled:opacity-50"
                >
                  {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-5 h-5" />}
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={updating}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-200 text-neutral-600 hover:bg-neutral-300 transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 group">
                <h1 className="text-3xl font-bold text-neutral-900">{project?.name}</h1>
                <button
                  onClick={handleEditName}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* More Options Menu */}
          <div className="relative">
            <button 
              className="px-4 py-2 bg-white border-2 border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:border-neutral-300 transition-all"
              onClick={handleDeleteProject}
              disabled={updating}
            >
              {updating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5 text-red-600" />
              )}
            </button>
          </div>
          
          {/* Create Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              Create
              <ChevronDown className="w-4 h-4" />
            </button>

            {showCreateMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowCreateMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 z-20">
                  <button
                    onClick={handleCreateEstimate}
                    className="w-full px-4 py-2 text-left text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    Estimate
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateMenu(false);
                      navigate(`/projects/${id}/invoices/create`);
                    }}
                    className="w-full px-4 py-2 text-left text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    Invoice
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    Document
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Project ID */}
      <div className="text-sm text-neutral-600">
        {project?.id}
      </div>

      {/* Tabs + Activity/Comments */}
      <div className="flex items-center justify-between border-b border-neutral-200">
        {/* Tabs */}
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-all relative ${
                activeTab === tab.id
                  ? 'text-primary-600'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Activity & Comments */}
        <div className="flex items-center gap-4 pb-3">
          <button className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-neutral-900 font-medium transition-colors">
            <Clock className="w-4 h-4" />
            <span>Activity</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-neutral-900 font-medium transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span>Comments</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProjectDetailsPage;