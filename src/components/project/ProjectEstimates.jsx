import React from 'react';
import { FileText } from 'lucide-react';

const ProjectEstimates = ({ project }) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-neutral-200">
        <h3 className="text-xl font-bold text-neutral-900">Total estimated</h3>
        <span className="text-2xl font-bold text-neutral-900">$0.00</span>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6">
          <FileText className="w-10 h-10 text-neutral-400" />
        </div>
        
        <h4 className="text-2xl font-bold text-neutral-900 mb-3">AI-powered estimates.</h4>
        <p className="text-neutral-600 text-center text-lg mb-10 max-w-2xl">
          Quickly create detailed, professional proposals and impress your customers with speed and accuracy.
        </p>
        
        <button className="px-8 py-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold rounded-xl transition-all hover:shadow-soft text-lg">
          Create estimate
        </button>
      </div>

      {/* Future: List of estimates will appear here */}
      {/* 
      <div className="space-y-4">
        {estimates.map(estimate => (
          <EstimateCard key={estimate.id} estimate={estimate} />
        ))}
      </div>
      */}
    </div>
  );
};

export default ProjectEstimates;