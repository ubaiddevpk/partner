import React from 'react';
import { DollarSign } from 'lucide-react';

const ProjectInvoices = ({ project }) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-12">
      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 bg-gradient-to-br from-success/10 to-success/20 rounded-2xl flex items-center justify-center mb-6">
          <DollarSign className="w-10 h-10 text-success" strokeWidth={2} />
        </div>
        
        <h4 className="text-2xl font-bold text-neutral-900 mb-3">Get paid with invoices.</h4>
        <p className="text-neutral-600 text-center text-lg mb-10 max-w-2xl">
          Send professional invoices, track payments, and make billing effortless.
        </p>
        
        <button className="px-8 py-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold rounded-xl transition-all hover:shadow-soft text-lg">
          Create invoice
        </button>
      </div>

      {/* Future: List of invoices will appear here */}
      {/* 
      <div className="space-y-4">
        {invoices.map(invoice => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>
      */}
    </div>
  );
};

export default ProjectInvoices;