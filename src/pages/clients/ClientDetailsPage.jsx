import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Users, 
  FileText, 
  Activity,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Info
} from 'lucide-react';

import { useNavigate } from '../../utils/router';

const ClientDetailsPage = ({ params }) => {  // Change this line
  const navigate = useNavigate();
  
  // Add mock client data at the top
  const client = {
    id: params?.id || '1',
    name: 'Sample Client',
    phone: '(269) 626-5944',
    email: 'client@example.com',
    address: '123 Main St, City, State 12345'
  };
   const handleBack = () => {
    navigate('/clients');
  };

  // Mock data for client value and projects
  const clientValue = {
    totalEstimated: { count: 21, amount: 964288.25 },
    totalInvoiced: { count: 12, amount: 972263.35 },
    notInvoiced: { amount: 0.00 }
  };

  const projects = [
    {
      id: 1,
      name: 'Sample Project',
      amount: 964288.25,
      date: 'Sep 3',
      status: 'Draft',
      statusColor: 'bg-accent-yellow'
    },
    {
      id: 2,
      name: 'Kitchen Remodel',
      amount: 45000.00,
      date: 'Aug 15',
      status: 'In progress',
      statusColor: 'bg-secondary-500'
    }
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors border border-neutral-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">{client.name}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-neutral-700 font-semibold rounded-xl border-2 border-neutral-200 hover:border-primary-500 hover:text-primary-600 transition-all duration-300">
            <ChevronDown className="w-5 h-5" />
            <span>Create</span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-neutral-700 font-medium rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors">
          <Mail className="w-4 h-4" />
          <span>Send email</span>
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-neutral-700 font-medium rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors">
          <MapPin className="w-4 h-4" />
          <span>Get directions</span>
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-neutral-700 font-medium rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors ml-auto">
          <Activity className="w-4 h-4" />
          <span>Activity</span>
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Client Profile */}
        <div className="lg:col-span-1 space-y-6">
          {/* Client Profile Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
              <h3 className="font-bold text-neutral-900">Client profile</h3>
              <button className="text-sm text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                Edit
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-neutral-900">{client.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-neutral-900">{client.email}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-neutral-900">{client.address}</p>
                </div>
              </div>

              {/* Referral Source */}
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-neutral-500">No referral source</p>
                </div>
              </div>

              {/* Notes */}
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-neutral-500">No notes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Client Value & Projects */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Value Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
              <h3 className="font-bold text-neutral-900">Client value</h3>
              <button className="w-6 h-6 flex items-center justify-center rounded text-neutral-400 hover:text-neutral-600 transition-colors">
                <Info className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Total Estimated */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-600">Total estimated</span>
                    <span className="text-sm text-neutral-400">{clientValue.totalEstimated.count}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-neutral-900">
                      ${clientValue.totalEstimated.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <ChevronDown className="w-5 h-5 text-neutral-400" />
                  </div>
                </div>
                <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Total Invoiced */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-600">Total invoiced</span>
                    <span className="text-sm text-neutral-400">{clientValue.totalInvoiced.count}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-neutral-900">
                      ${clientValue.totalInvoiced.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <ChevronDown className="w-5 h-5 text-neutral-400" />
                  </div>
                </div>
                <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Not Invoiced */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
                <span className="text-sm text-neutral-600">Not invoiced</span>
                <span className="text-lg font-bold text-neutral-900">
                  ${clientValue.notInvoiced.amount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Projects Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-neutral-900">Projects</h3>
                <span className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center text-xs font-semibold text-neutral-600">
                  {projects.length}
                </span>
              </div>
              <button className="flex items-center gap-1 text-sm text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-neutral-200">
              {projects.map((project) => (
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
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${project.statusColor} text-white`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <span>{project.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-neutral-900">
                        ${project.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsPage;