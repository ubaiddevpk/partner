import React, { useState } from "react";
import {
  Search,
  Download,
  Plus,
  Phone,
  MapPin,
  Mail,
  MoreVertical,
  X,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "../../utils/router";

const ClientsPage = ({ onClientClick }) => {
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    referralSource: "",
    createProject: false,
  });
  const navigate = useNavigate();

  // Mock clients data
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Caleb Salter",
      initials: "CS",
      phone: "(269) 626-5944",
      address: "123 Rivolake Rd, Three Rivers, MI 49093, USA",
      email: "caleb@example.com",
    },
    {
      id: 2,
      name: "Dustin Peckinpaugh",
      initials: "DP",
      phone: "(269) 626-5944",
      address: "55279 Buckhorn Rd, Three Rivers, MI 49093, USA",
      email: "dustin@example.com",
    },
    {
      id: 3,
      name: "Greg Brown",
      initials: "GB",
      phone: "(517) 896-4082",
      address: "809 E Webb Dr, DeWitt, MI 48820, USA",
      email: "greg@example.com",
    },
    {
      id: 4,
      name: "Heather Deforest",
      initials: "HD",
      phone: "(269) 760-7871",
      address: "No address",
      email: "heather@example.com",
    },
    {
      id: 5,
      name: "ikram",
      initials: "I",
      phone: "(747) 292-0712",
      address: "Texas City, TX, USA",
      email: "ikram@example.com",
    },
    {
      id: 6,
      name: "Joey Reiff",
      initials: "JR",
      phone: "(269) 528-1487",
      address: "Three Rivers, MI 49093, USA",
      email: "joey@example.com",
    },
  ]);

  const referralSources = [
    "Google Search",
    "Social Media",
    "Referral",
    "Website",
    "Walk-in",
    "Advertisement",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateClient = () => {
    if (!formData.name.trim()) return;

    // Create initials from name
    const initials = formData.name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newClient = {
      id: clients.length + 1,
      name: formData.name,
      initials: initials || "NC",
      phone: formData.phone,
      address: formData.address || "No address",
      email: formData.email,
    };

    setClients((prev) => [newClient, ...prev]);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      referralSource: "",
      createProject: false,
    });

    setShowNewClientModal(false);
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery) ||
      client.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRandomColor = (index) => {
    const colors = [
      "from-primary-400 to-primary-600",
      "from-secondary-400 to-secondary-600",
      "from-accent-purple to-accent-blue",
      "from-accent-orange to-accent-yellow",
      "from-primary-500 to-secondary-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-neutral-900">Clients</h1>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors border border-neutral-200">
            <Search className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors border border-neutral-200">
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowNewClientModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">New</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          placeholder="Search clients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Clients List */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="divide-y divide-neutral-200">
          {filteredClients.map((client, index) => (
            <div
              key={client.id}
             onClick={() => navigate(`/clients/${client.id}`)}
              className="p-6 hover:bg-neutral-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${getRandomColor(
                    index
                  )} rounded-full flex items-center justify-center text-white font-bold shadow-soft flex-shrink-0`}
                >
                  {client.initials}
                </div>

                {/* Client Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {client.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate max-w-xs">
                        {client.address}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-neutral-400" />
            </div>
            <p className="text-neutral-600 font-medium">No clients found</p>
            <p className="text-sm text-neutral-500 mt-1">
              Try adjusting your search
            </p>
          </div>
        )}
      </div>

      {/* New Client Modal */}
      {showNewClientModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 animate-fade-in"
            onClick={() => setShowNewClientModal(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <h2 className="text-2xl font-bold text-neutral-900">
                  New Client
                </h2>
                <button
                  onClick={() => setShowNewClientModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Address Input */}
                <div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Add address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Referral Source Dropdown */}
                <div>
                  <select
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors appearance-none bg-white text-neutral-400"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1.25rem",
                    }}
                  >
                    <option value="">Referral source</option>
                    {referralSources.map((source) => (
                      <option
                        key={source}
                        value={source}
                        className="text-neutral-900"
                      >
                        {source}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Create Project Toggle */}
                <div className="flex items-center gap-3 py-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="createProject"
                      checked={formData.createProject}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-primary-500 peer-checked:to-primary-600"></div>
                  </label>
                  <span className="text-neutral-900 font-medium">
                    Also create new project
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleCreateClient}
                  className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mt-6"
                >
                  Create client
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientsPage;
