import React from 'react';
import { FileText, DollarSign, Users } from 'lucide-react';

const ProjectOverview = ({ project,onClick }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Client Details Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-8">
        <h3 className="text-lg font-bold text-neutral-900 mb-6">Client details</h3>
        
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6">
            <Users className="w-8 h-8 text-neutral-400" />
          </div>
          
          <h4 className="text-xl font-bold text-neutral-900 mb-2">Client details</h4>
          <p className="text-neutral-600 text-center mb-8 max-w-md">
            Add client information to keep track of who you're working with and stay organized.
          </p>
          
          <button className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold rounded-xl transition-colors">
            Add client
          </button>
        </div>
      </div>

      {/* Estimates Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-neutral-900">Estimates</h3>
          <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-sm font-semibold">
            0
          </span>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center mb-6">
            <FileText className="w-8 h-8 text-secondary-600" />
          </div>
          
          <h4 className="text-xl font-bold text-neutral-900 mb-2">AI-powered estimates</h4>
          <p className="text-neutral-600 text-center mb-8 max-w-md">
            Quickly create detailed, professional proposals and impress your customers with speed and accuracy.
          </p>
          
          <button className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold rounded-xl transition-colors"
          onClick={onClick}>
            Create Estimate
          </button>
        </div>
      </div>

      {/* Documents Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-neutral-900">Documents</h3>
          <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-sm font-semibold">
            0
          </span>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-error/10 to-error/20 rounded-2xl flex items-center justify-center mb-6">
            <FileText className="w-8 h-8 text-error" />
          </div>
          
          <h4 className="text-xl font-bold text-neutral-900 mb-2">Project documents</h4>
          <p className="text-neutral-600 text-center mb-8 max-w-md">
            Create and organize project documents, contracts, and notes in one place.
          </p>
          
          <button className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold rounded-xl transition-colors">
            Create document
          </button>
        </div>
      </div>

      {/* Invoices Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-neutral-900">Invoices</h3>
          <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-sm font-semibold">
            0
          </span>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-success/10 to-success/20 rounded-2xl flex items-center justify-center mb-6">
            <DollarSign className="w-8 h-8 text-success" />
          </div>
          
          <h4 className="text-xl font-bold text-neutral-900 mb-2">Get paid with invoices</h4>
          <p className="text-neutral-600 text-center mb-8 max-w-md">
            Send professional invoices, track payments, and make billing effortless.
          </p>
          
          <button className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold rounded-xl transition-colors">
            Create invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;