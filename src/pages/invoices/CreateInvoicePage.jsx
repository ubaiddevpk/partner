import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, Plus, X, Bold, Italic, List, Upload, Trash2, UserPlus } from 'lucide-react';
import { useNavigate } from '../../utils/router';
import { useAuth } from '../../contexts/AuthContext';

const CreateInvoicePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState('invoice'); // 'invoice' or 'client'
  const [invoiceData, setInvoiceData] = useState({
    title: '',
    description: '',
    client: null,
    dueDate: 'on-completion',
    items: [{ id: 1, name: 'First Item', quantity: 1, unit: 'EA', unitCost: 0, total: 0 }],
    subtotal: 0,
    discount: 0,
    tax: 6,
    taxAmount: 0,
    total: 0,
    coverTransactionFees: false,
    attachments: [],
    termsAndConditions: ''
  });

  const [showClientSelector, setShowClientSelector] = useState(false);

  const dueDateOptions = [
    'On completion',
    'Upon receipt',
    'Net 15',
    'Net 30',
    'Net 60',
    'Custom date'
  ];

  const addItem = () => {
    const newItem = {
      id: invoiceData.items.length + 1,
      name: `Item ${invoiceData.items.length + 1}`,
      quantity: 1,
      unit: 'EA',
      unitCost: 0,
      total: 0
    };
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (id) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const updateItem = (id, field, value) => {
    setInvoiceData(prev => {
      const updatedItems = prev.items.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitCost') {
            updated.total = updated.quantity * updated.unitCost;
          }
          return updated;
        }
        return item;
      });

      const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
      const taxAmount = (subtotal * prev.tax) / 100;
      const total = subtotal + taxAmount - prev.discount;

      return {
        ...prev,
        items: updatedItems,
        subtotal,
        taxAmount,
        total
      };
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
           onClick={() => navigate('/invoices')}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-neutral-900">Invoice</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-neutral-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('invoice')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'invoice'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Invoice
              </button>
              <button
                onClick={() => setViewMode('client')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'client'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Client view
              </button>
            </div>

            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>

            <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            {viewMode === 'invoice' ? (
              <div className="p-8 space-y-8">
                {/* Business Info & Client Selector */}
                <div className="flex items-start justify-between gap-8">
                  {/* Business Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-soft flex-shrink-0">
                      <span className="text-white font-bold text-2xl">P</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 text-lg">{user?.businessName || 'Your Business'}</h3>
                      <p className="text-neutral-600 text-sm">{user?.email}</p>
                      <p className="text-neutral-600 text-sm">(269) 535-0074</p>
                    </div>
                  </div>

                  {/* Client Selector */}
                  <button
                    onClick={() => setShowClientSelector(true)}
                    className="flex-1 max-w-md min-h-32 border-2 border-dashed border-primary-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-300 flex items-center justify-center group"
                  >
                    <div className="text-center">
                      <UserPlus className="w-8 h-8 text-primary-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-primary-600 font-semibold">Add Client</span>
                    </div>
                  </button>
                </div>

                {/* Payment Details */}
                <div className="space-y-4">
                  <h3 className="font-bold text-neutral-900">Payment details</h3>
                  
                  <input
                    type="text"
                    placeholder="Title"
                    value={invoiceData.title}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                  />

                  <div className="relative">
                    <textarea
                      placeholder="Enter description"
                      value={invoiceData.description}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none resize-none transition-colors"
                      rows="3"
                    />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-neutral-100 transition-colors">
                        <Bold className="w-4 h-4 text-neutral-600" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-neutral-100 transition-colors">
                        <Italic className="w-4 h-4 text-neutral-600" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-neutral-100 transition-colors">
                        <List className="w-4 h-4 text-neutral-600" />
                      </button>
                    </div>
                  </div>

                  {/* Due Date */}
                  <div>
                    <label className="text-sm text-neutral-600 mb-2 block">Due date</label>
                    <select
                      value={invoiceData.dueDate}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors appearance-none bg-white"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '1.25rem'
                      }}
                    >
                      <option value="on-completion">On completion</option>
                      {dueDateOptions.map((option) => (
                        <option key={option} value={option.toLowerCase().replace(' ', '-')}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Items Table */}
                <div className="border-2 border-neutral-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-neutral-600">Item</th>
                        <th className="text-center px-4 py-3 text-sm font-semibold text-neutral-600">Quantity</th>
                        <th className="text-center px-4 py-3 text-sm font-semibold text-neutral-600">Unit cost</th>
                        <th className="text-right px-4 py-3 text-sm font-semibold text-neutral-600">Total</th>
                        <th className="w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData.items.map((item, index) => (
                        <tr key={item.id} className="border-t border-neutral-200">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-neutral-400 text-sm">{index + 1}</span>
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                className="flex-1 px-2 py-1 border border-neutral-200 rounded focus:border-primary-500 focus:outline-none"
                              />
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2 justify-center">
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                                className="w-16 px-2 py-1 border border-neutral-200 rounded text-center focus:border-primary-500 focus:outline-none"
                              />
                              <select
                                value={item.unit}
                                onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                                className="px-2 py-1 border border-neutral-200 rounded focus:border-primary-500 focus:outline-none"
                              >
                                <option>EA</option>
                                <option>HR</option>
                                <option>SQ FT</option>
                              </select>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <input
                              type="number"
                              value={item.unitCost}
                              onChange={(e) => updateItem(item.id, 'unitCost', parseFloat(e.target.value) || 0)}
                              className="w-24 px-2 py-1 border border-neutral-200 rounded text-center focus:border-primary-500 focus:outline-none"
                            />
                          </td>
                          <td className="px-4 py-3 text-right font-semibold">
                            ${item.total.toFixed(2)}
                          </td>
                          <td className="px-4 py-3">
                            {invoiceData.items.length > 1 && (
                              <button
                                onClick={() => removeItem(item.id)}
                                className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-50 hover:text-red-600 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="border-t border-neutral-200 p-4">
                    <button
                      onClick={addItem}
                      className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add item</span>
                    </button>
                  </div>
                </div>

                {/* Totals */}
                <div className="flex justify-end">
                  <div className="w-full max-w-sm space-y-3">
                    <div className="flex items-center justify-between text-neutral-600">
                      <span>Subtotal</span>
                      <span className="font-semibold">${invoiceData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600">
                      <span>Discount</span>
                      <button className="text-primary-600 hover:text-primary-700 font-semibold">Add</button>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600">
                      <span>Tax</span>
                      <span className="font-semibold">{invoiceData.tax}% ${invoiceData.taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xl font-bold text-neutral-900 pt-3 border-t-2 border-neutral-200">
                      <span>Total</span>
                      <span>${invoiceData.total.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <input
                        type="checkbox"
                        checked={invoiceData.coverTransactionFees}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, coverTransactionFees: e.target.checked }))}
                        className="w-5 h-5 text-primary-600 rounded"
                      />
                      <span className="text-sm text-neutral-600">Cover transaction fees</span>
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                <div className="space-y-4">
                  <h3 className="font-bold text-neutral-900">Attachments</h3>
                  <button className="w-full min-h-24 border-2 border-dashed border-primary-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-300 flex flex-col items-center justify-center gap-2 group">
                    <Upload className="w-6 h-6 text-primary-600 group-hover:scale-110 transition-transform" />
                    <span className="text-primary-600 font-semibold">Add files</span>
                  </button>
                </div>

                {/* Manual Payment */}
                <div className="text-center">
                  <button className="text-neutral-600 hover:text-neutral-900 font-medium">
                    Log manual payment
                  </button>
                </div>

                {/* Terms & Conditions */}
                <button className="w-full min-h-16 border-2 border-dashed border-primary-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-300 flex items-center justify-center group">
                  <span className="text-primary-600 font-semibold">Add terms & conditions</span>
                </button>
              </div>
            ) : (
              /* Client View */
              <div className="p-8 space-y-6 bg-neutral-50">
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">Invoice Preview</h2>
                    <p className="text-neutral-600">This is how your client will see the invoice</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-soft mb-4">
                          <span className="text-white font-bold text-2xl">P</span>
                        </div>
                        <h3 className="font-bold text-neutral-900">{user?.businessName || 'Your Business'}</h3>
                        <p className="text-neutral-600 text-sm">{user?.email}</p>
                        <p className="text-neutral-600 text-sm">(269) 535-0074</p>
                      </div>
                      {invoiceData.client && (
                        <div className="text-right">
                          <p className="font-semibold text-neutral-900 mb-1">Bill To:</p>
                          <p className="text-neutral-600">{invoiceData.client.name}</p>
                        </div>
                      )}
                    </div>

                    {invoiceData.title && (
                      <h3 className="text-xl font-bold text-neutral-900">{invoiceData.title}</h3>
                    )}

                    <div className="border-t-2 border-neutral-200 pt-4">
                      <div className="flex justify-between text-neutral-600 mb-2">
                        <span>Subtotal</span>
                        <span className="font-semibold">${invoiceData.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-neutral-600 mb-4">
                        <span>Tax ({invoiceData.tax}%)</span>
                        <span className="font-semibold">${invoiceData.taxAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-2xl font-bold text-neutral-900 pt-4 border-t-2 border-neutral-200">
                        <span>Total</span>
                        <span>${invoiceData.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoicePage;