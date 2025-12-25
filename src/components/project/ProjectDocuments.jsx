import React from 'react';
import { FileText } from 'lucide-react';

const ProjectDocuments = ({ project }) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-neutral-200">
        <h3 className="text-xl font-bold text-neutral-900">Documents</h3>
        <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-sm font-semibold">
          0
        </span>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 bg-gradient-to-br from-error/10 to-error/20 rounded-2xl flex items-center justify-center mb-6">
          <FileText className="w-10 h-10 text-error" strokeWidth={2} />
        </div>
        
        <h4 className="text-2xl font-bold text-neutral-900 mb-3">Project documents</h4>
        <p className="text-neutral-600 text-center text-lg mb-10 max-w-2xl">
          Create and organize project documents, contracts, and notes in one place.
        </p>
        
        <button className="px-8 py-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold rounded-xl transition-all hover:shadow-soft text-lg">
          Create document
        </button>
      </div>

      {/* Future: List of documents will appear here */}
      {/* 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map(document => (
          <DocumentCard key={document.id} document={document} />
        ))}
      </div>
      */}
    </div>
  );
};

export default ProjectDocuments;