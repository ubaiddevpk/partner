import React, { useState } from "react";
import { Search, Plus, Users, MoreVertical } from "lucide-react";
import { useNavigate } from "../../utils/router";

const InvoicesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("draft");

  const invoices = [
    {
      id: 1,
      title: "Marsha Porter Addition",
      client: "Marsha Porter",
      date: "Dec 25, 2025",
      amount: 847618.57,
      status: "draft",
    },
    {
      id: 2,
      title: "New invoice for painting",
      client: "ikram",
      date: "Jan 24, 2026",
      amount: 1050.0,
      status: "draft",
    },
    {
      id: 3,
      title: "Untitled Invoice",
      client: "ikram",
      date: "Jan 9, 2026",
      amount: 735.0,
      status: "draft",
    },
    {
      id: 4,
      title: "Untitled Invoice",
      client: "ikram",
      date: "Jan 9, 2026",
      amount: 1010.0,
      status: "draft",
    },
    {
      id: 5,
      title: "Change Order - Vaulted Ceiling Upgrade invoice",
      client: "Marsha Porter",
      date: "Dec 25, 2025",
      amount: 0.0,
      status: "draft",
      note: "Via change order [CO-7] Ceiling U...",
    },
    {
      id: 6,
      title: "Kitchen Renovation Complete",
      client: "Greg Brown",
      date: "Nov 15, 2025",
      amount: 45000.0,
      status: "scheduled",
    },
    {
      id: 7,
      title: "Bathroom Remodel",
      client: "Joey Reiff",
      date: "Oct 30, 2025",
      amount: 28500.0,
      status: "sent",
    },
    {
      id: 8,
      title: "Deck Construction",
      client: "Caleb Salter",
      date: "Sep 12, 2025",
      amount: 15000.0,
      status: "paid",
    },
  ];

  const tabs = [
    { id: "draft", label: "Draft", count: 15 },
    { id: "scheduled", label: "Scheduled", count: 0 },
    { id: "sent", label: "Sent", count: 7 },
    { id: "paid", label: "Paid", count: 1 },
  ];

  const filteredInvoices = invoices.filter((inv) => inv.status === activeTab);

  const getStatusBadge = (status) => {
    const styles = {
      draft: "bg-neutral-100 text-neutral-600",
      scheduled: "bg-secondary-100 text-secondary-700",
      sent: "bg-accent-blue/10 text-accent-blue",
      paid: "bg-primary-100 text-primary-700",
    };
    return styles[status] || styles.draft;
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-neutral-900">Invoices</h1>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors border border-neutral-200">
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("/invoices/create")}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">New</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-primary-50 text-primary-700 shadow-sm"
                : "text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            {tab.label}{" "}
            <span className={activeTab === tab.id ? "" : "text-neutral-400"}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="divide-y divide-neutral-200">
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map((invoice) => (
              <div
                key={invoice.id}
                onClick={() => navigate(`/invoices/${invoice.id}`)}
                className="p-6 hover:bg-neutral-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {invoice.title}
                    </h3>
                    {invoice.note && (
                      <p className="text-sm text-neutral-500 mb-2">
                        {invoice.note}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Users className="w-4 h-4" />
                      <span>{invoice.client}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-neutral-500 mb-1">
                        {invoice.date}
                      </p>
                      <p className="text-xl font-bold text-neutral-900">
                        $
                        {invoice.amount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusBadge(
                          invoice.status
                        )}`}
                      >
                        {invoice.status.charAt(0).toUpperCase() +
                          invoice.status.slice(1)}
                      </span>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-neutral-400" />
              </div>
              <p className="text-neutral-600 font-medium">
                No {activeTab} invoices
              </p>
              <p className="text-sm text-neutral-500 mt-1">
                Create your first invoice to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
