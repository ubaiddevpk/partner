import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Gift, Settings, Zap, Users, CreditCard, HelpCircle, FileText, Shield, Trash2, LogOut } from 'lucide-react';

const SettingsPage = ({ onBack, user }) => {
  const [showSection, setShowSection] = useState(null);

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  if (showSection) {
    return (
      <div className="min-h-screen bg-neutral-50 pb-20 lg:pb-6">
        <div className="bg-white border-b border-neutral-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
            <button
              onClick={() => setShowSection(null)}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-neutral-900">{showSection}</h1>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-soft mb-4 mx-auto">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">{showSection}</h3>
              <p className="text-neutral-600">Settings details will appear here</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-neutral-900">Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Business Info Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-soft">
                <span className="text-white font-bold text-3xl">
                  {user?.businessName?.charAt(0) || 'P'}
                </span>
              </div>
              <div>
                <button className="text-primary-600 hover:text-primary-700 font-semibold mb-2">
                  Edit Logo
                </button>
                <span className="mx-2 text-neutral-300">•</span>
                <button className="text-neutral-600 hover:text-neutral-700 font-semibold mb-2">
                  Delete Logo
                </button>
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">
                {user?.businessName || 'Salter Construction'}
              </h2>
            </div>
          </div>

          {/* Referral Card */}
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl border-2 border-primary-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Gift className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-1">Refer & earn gift cards</h3>
                  <p className="text-sm text-neutral-600">$100 gift cards for each referral</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-primary-600" />
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* SETTINGS */}
            <div>
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 px-2">
                SETTINGS
              </h3>
              <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden divide-y divide-neutral-200">
                <button
                  onClick={() => setShowSection('General settings')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-neutral-600 group-hover:text-primary-600 transition-colors" />
                    <span className="font-medium text-neutral-900">General settings</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                </button>

                <button
                  onClick={() => setShowSection('AI presets')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-neutral-600 group-hover:text-primary-600 transition-colors" />
                    <span className="font-medium text-neutral-900">AI presets</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                </button>

                <button
                  onClick={() => setShowSection('Manage crew members')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-neutral-600 group-hover:text-primary-600 transition-colors" />
                    <span className="font-medium text-neutral-900">Manage crew members</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                </button>

                <button
                  onClick={() => setShowSection('QuickBooks sync')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-neutral-600 group-hover:text-primary-600 transition-colors" />
                    <span className="font-medium text-neutral-900">QuickBooks sync</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                </button>

                <button
                  onClick={() => setShowSection('Finance & payments')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-neutral-600 group-hover:text-primary-600 transition-colors" />
                    <span className="font-medium text-neutral-900">Finance & payments</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                </button>
              </div>
            </div>

            {/* TEAM & ACCOUNT */}
            <div>
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 px-2">
                TEAM & ACCOUNT
              </h3>
              <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden divide-y divide-neutral-200">
                <button
                  onClick={() => setShowSection('Team users')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-neutral-600 group-hover:text-primary-600 transition-colors" />
                    <span className="font-medium text-neutral-900">Team users</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                </button>

                <button
                  onClick={() => setShowSection('Subscription')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-neutral-600 group-hover:text-primary-600 transition-colors" />
                    <span className="font-medium text-neutral-900">Subscription</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                </button>

                <button
                  onClick={() => setShowSection('Contact support')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-neutral-600 group-hover:text-primary-600 transition-colors" />
                    <span className="font-medium text-neutral-900">Contact support</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                </button>
              </div>
            </div>

            {/* LEGAL & PRIVACY */}
            <div>
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 px-2">
                LEGAL & PRIVACY
              </h3>
              <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden divide-y divide-neutral-200">
                <button
                  onClick={() => setShowSection('Terms of service')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-neutral-600 group-hover:text-primary-600 transition-colors" />
                    <span className="font-medium text-neutral-900">Terms of service</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                </button>

                <button
                  onClick={() => setShowSection('Privacy policy')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-neutral-600 group-hover:text-primary-600 transition-colors" />
                    <span className="font-medium text-neutral-900">Privacy policy</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                </button>
              </div>
            </div>

            {/* DANGER ZONE */}
            <div>
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 px-2">
                DANGER ZONE
              </h3>
              <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                <button
                  onClick={() => setShowSection('Delete account')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-red-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Trash2 className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-red-600">Delete account</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-red-400 group-hover:text-red-600 transition-colors" />
                </button>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="w-full py-4 px-6 bg-white border-2 border-neutral-200 rounded-2xl text-neutral-700 font-semibold hover:border-primary-500 hover:bg-neutral-50 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <LogOut className="w-5 h-5 text-neutral-600 group-hover:text-primary-600 transition-colors" />
              <span>Sign out</span>
            </button>

            {/* Build Version */}
            <div className="flex items-center justify-between px-2 text-sm">
              <span className="text-neutral-400">Build version 1766656440</span>
              <button className="text-primary-600 hover:text-primary-700 font-semibold">
                Check for updates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;