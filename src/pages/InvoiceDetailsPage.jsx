import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, Info, CheckCircle, Clock, DollarSign } from 'lucide-react';

const InvoiceDetailsPage = ({ invoice, onBack, user }) => {
  const [paymentTrackerExpanded, setPaymentTrackerExpanded] = useState(false);

  // Mock invoice details
  const invoiceDetails = {
    invoiceNumber: '10021',
    issueDate: 'Oct 24, 2025',
    dueDate: 'On completion',
    client: {
      name: invoice?.client || 'ikram',
      email: 'ikram@gmail.com',
      phone: '(747) 292-0712',
      address: 'Texas City, TX, USA'
    },
    business: {
      name: user?.businessName || 'Salter Construction',
      email: 'calebsalterhs@gmail.com',
      phone: '(269) 535-0074'
    },
    items: [
      { name: 'Labor', quantity: 10, unit: 'HR', unitCost: 50, total: 500 },
      { name: 'Materials', quantity: 1, unit: 'LOT', unitCost: 200, total: 200 }
    ],
    subtotal: 700.00,
    tax: 5,
    taxAmount: 35.00,
    total: 735.00,
    payments: [
      { date: 'Nov 15, 2025', amount: 200.00, method: 'Credit Card', status: 'completed' },
      { date: 'Nov 10, 2025', amount: 300.00, method: 'Bank Transfer', status: 'completed' }
    ],
    amountPaid: 500.00,
    amountDue: 235.00
  };

  const progress = (invoiceDetails.amountPaid / invoiceDetails.total) * 100;

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-neutral-900">Invoice details</h1>
          </div>

          <button className="w-10 h-10 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Invoice Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8">
            {/* Business & Client Info */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-soft mb-4">
                  <span className="text-white font-bold text-2xl">P</span>
                </div>
                <h3 className="font-bold text-neutral-900 text-lg mb-1">{invoiceDetails.business.name}</h3>
                <p className="text-neutral-600 text-sm">{invoiceDetails.business.email}</p>
                <p className="text-neutral-600 text-sm">{invoiceDetails.business.phone}</p>
                <p className="text-neutral-600 text-sm mt-2">Invoice #{invoiceDetails.invoiceNumber}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-neutral-900 mb-2">Bill To:</p>
                <p className="text-neutral-900 font-medium">{invoiceDetails.client.name}</p>
                <p className="text-neutral-600 text-sm">{invoiceDetails.client.email}</p>
                <p className="text-neutral-600 text-sm">{invoiceDetails.client.phone}</p>
                <p className="text-neutral-600 text-sm">{invoiceDetails.client.address}</p>
                <p className="text-neutral-600 text-sm mt-2">Issued {invoiceDetails.issueDate}</p>
              </div>
            </div>

            {/* Invoice Title */}
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">{invoice?.title || 'Untitled invoice'}</h2>

            {/* Items Table */}
            <div className="border-2 border-neutral-200 rounded-xl overflow-hidden mb-6">
              <table className="w-full">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-neutral-600">Item</th>
                    <th className="text-center px-4 py-3 text-sm font-semibold text-neutral-600">Quantity</th>
                    <th className="text-center px-4 py-3 text-sm font-semibold text-neutral-600">Unit Cost</th>
                    <th className="text-right px-4 py-3 text-sm font-semibold text-neutral-600">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceDetails.items.map((item, index) => (
                    <tr key={index} className="border-t border-neutral-200">
                      <td className="px-4 py-3 text-neutral-900">{item.name}</td>
                      <td className="px-4 py-3 text-center text-neutral-600">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="px-4 py-3 text-center text-neutral-600">
                        ${item.unitCost.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-neutral-900">
                        ${item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-full max-w-sm space-y-3">
                <div className="flex items-center justify-between text-neutral-600">
                  <span>Sub Total</span>
                  <span className="font-semibold">${invoiceDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-600">
                  <span>Tax ({invoiceDetails.tax}%)</span>
                  <span className="font-semibold">${invoiceDetails.taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-2xl font-bold text-neutral-900 pt-3 border-t-2 border-neutral-200">
                  <span>Total</span>
                  <span>${invoiceDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Tracker */}
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <button
              onClick={() => setPaymentTrackerExpanded(!paymentTrackerExpanded)}
              className="w-full p-6 flex items-center justify-between hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-neutral-900">Payment Tracker</h3>
                <button className="w-6 h-6 flex items-center justify-center rounded text-neutral-400 hover:text-neutral-600 transition-colors">
                  <Info className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-neutral-600">
                    ${invoiceDetails.amountPaid.toFixed(2)} of ${invoiceDetails.total.toFixed(2)} paid
                  </p>
                  <div className="w-48 h-2 bg-neutral-200 rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-neutral-400 transition-transform ${paymentTrackerExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {paymentTrackerExpanded && (
              <div className="border-t border-neutral-200 p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-primary-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-primary-600" />
                      <span className="text-sm font-medium text-neutral-600">Amount Paid</span>
                    </div>
                    <p className="text-2xl font-bold text-primary-600">
                      ${invoiceDetails.amountPaid.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-accent-orange/10 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-accent-orange" />
                      <span className="text-sm font-medium text-neutral-600">Amount Due</span>
                    </div>
                    <p className="text-2xl font-bold text-accent-orange">
                      ${invoiceDetails.amountDue.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-neutral-900 mb-3">Payment History</h4>
                  <div className="space-y-3">
                    {invoiceDetails.payments.map((payment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900">{payment.method}</p>
                            <p className="text-sm text-neutral-600">{payment.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-neutral-900">${payment.amount.toFixed(2)}</p>
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-primary-100 text-primary-700">
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  Record Payment
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button className="flex-1 py-3 px-4 bg-white border-2 border-neutral-200 rounded-xl text-neutral-700 font-semibold hover:border-primary-500 hover:text-primary-600 transition-all duration-300">
              Download PDF
            </button>
            <button className="flex-1 py-3 px-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              Send to Client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsPage;