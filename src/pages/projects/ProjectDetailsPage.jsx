import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MoreVertical, 
  Clock,
  MessageSquare,
  Sparkles,
  UserX
} from 'lucide-react';

// Import tab components
import ProjectOverview from '../../components/project/ProjectOverview';
import ProjectEstimates from '../../components/project/ProjectEstimates';
import ProjectInvoices from '../../components/project/ProjectInvoices';
import ProjectDocuments from '../../components/project/ProjectDocuments';
import ProjectFiles from '../../components/project/ProjectFiles';


const ProjectDetailsPage = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

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
        return <ProjectOverview project={project} />;
      case 'estimates':
        return <ProjectEstimates project={project} />;
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
            onClick={onBack}
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
            <h1 className="text-3xl font-bold text-neutral-900">{project?.name || 'Untitled project'}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border-2 border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:border-neutral-300 transition-all">
            <MoreVertical className="w-5 h-5" />
          </button>
          <button className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            Create ▼
          </button>
        </div>
      </div>

      {/* Project ID */}
      <div className="text-sm text-neutral-600">
        {project?.id || 'PRJ-10052'}
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