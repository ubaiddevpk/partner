import React, { useState } from 'react';
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
  X
} from 'lucide-react';
import { useParams, useNavigate } from '../../utils/router';

// Import tab components
import ProjectOverview from '../../components/project/ProjectOverview';
import ProjectEstimates from '../../components/project/ProjectEstimates';
import ProjectInvoices from '../../components/project/ProjectInvoices';
import ProjectDocuments from '../../components/project/ProjectDocuments';
import ProjectFiles from '../../components/project/ProjectFiles';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [projectName, setProjectName] = useState('Untitled project');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  const project = {
    id,
    name: projectName
  };

  const handleBack = () => {
    navigate('/projects');
  };

  const handleEditName = () => {
    setTempName(projectName);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setProjectName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setTempName('');
    setIsEditingName(false);
  };

  const handleCreateEstimate = () => {
    setShowCreateMenu(false);
    // Navigate to create estimate page with project info
    navigate(`/projects/${id}/estimates/create?projectName=${encodeURIComponent(projectName)}`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'estimates', label: 'Estimates' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'documents', label: 'Documents' },
    { id: 'files', label: 'Files' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProjectOverview project={project} onClick={handleCreateEstimate}/>;
      case 'estimates':
        return <ProjectEstimates project={project} onClick={handleCreateEstimate} />;
      case 'invoices':
        return <ProjectInvoices project={project} />;
      case 'documents':
        return <ProjectDocuments project={project} />;
      case 'files':
        return <ProjectFiles project={project} />;
      default:
        return <ProjectOverview project={project} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Lead
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-sm font-medium flex items-center gap-1">
                <UserX className="w-3 h-3" />
                No teammate
              </span>
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
                />
                <button
                  onClick={handleSaveName}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-200 text-neutral-600 hover:bg-neutral-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 group">
                <h1 className="text-3xl font-bold text-neutral-900">{projectName}</h1>
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
          <button className="px-4 py-2 bg-white border-2 border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:border-neutral-300 transition-all">
            <MoreVertical className="w-5 h-5" />
          </button>
          
          {/* Create Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              Create
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
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
        {id || 'PRJ-10052'}
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