import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, MoreVertical } from 'lucide-react';
import { useNavigate, useParams } from '../../utils/router';

const CreateEstimatePage = () => {
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  
  // Get project name from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const projectName = urlParams.get('projectName') || 'Untitled project';
  
  const [estimateName, setEstimateName] = useState(`${projectName} estimate`);
  const [items, setItems] = useState([
    {
      id: 1,
      item: 'Site Preparation and Clearing',
      quantity: 1,
      unit: 'EA',
      unitCost: 5,
      costType: 'Labor + Material',
      builderCost: 500.00,
      markup: 0,
      clientCost: 500.00
    }
  ]);

  const costTypes = ['Labor + Material', 'Material', 'Labor', 'Equipment', 'Subcontractor'];
  const units = ['EA', 'CY', 'TON', 'SF', 'LF', 'SY', 'LB', 'GAL', 'HR', 'DAY'];

  const handleBack = () => {
    navigate(`/projects/${projectId}`);
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      item: '',
      quantity: 1,
      unit: 'EA',
      unitCost: 0,
      costType: 'Material',
      builderCost: 0,
      markup: 0,
      clientCost: 0
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-calculate costs
        if (['quantity', 'unitCost', 'markup'].includes(field)) {
          const qty = parseFloat(updatedItem.quantity) || 0;
          const cost = parseFloat(updatedItem.unitCost) || 0;
          const markup = parseFloat(updatedItem.markup) || 0;
          
          updatedItem.builderCost = qty * cost;
          updatedItem.clientCost = updatedItem.builderCost * (1 + markup / 100);
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const totalBuilderCost = items.reduce((sum, item) => sum + (parseFloat(item.builderCost) || 0), 0);
  const totalClientCost = items.reduce((sum, item) => sum + (parseFloat(item.clientCost) || 0), 0);

  const handleSave = () => {
    // Save estimate logic here
    console.log('Saving estimate:', {
      projectId,
      estimateName,
      items,
      totalBuilderCost,
      totalClientCost
    });
    
    // Navigate back to project
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors border border-neutral-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <input
              type="text"
              value={estimateName}
              onChange={(e) => setEstimateName(e.target.value)}
              className="text-2xl font-bold text-neutral-900 border-2 border-transparent hover:border-neutral-200 focus:border-primary-500 rounded-lg px-3 py-1 focus:outline-none transition-colors"
            />
            <p className="text-sm text-neutral-600 mt-1">{items.length} items</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border-2 border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:border-neutral-300 transition-all">
            <MoreVertical className="w-5 h-5" />
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Estimate Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-neutral-50 border-b border-neutral-200 text-sm font-semibold text-neutral-600">
          <div className="col-span-3">Item</div>
          <div className="col-span-1">Quantity</div>
          <div className="col-span-1">Unit</div>
          <div className="col-span-1">Unit cost</div>
          <div className="col-span-2">Cost type</div>
          <div className="col-span-1">Builder cost</div>
          <div className="col-span-1">Markup</div>
          <div className="col-span-1">Client cost</div>
          <div className="col-span-1"></div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-neutral-200">
          {items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-neutral-50 transition-colors group">
              {/* Item Name */}
              <div className="col-span-3">
                <input
                  type="text"
                  value={item.item}
                  onChange={(e) => handleUpdateItem(item.id, 'item', e.target.value)}
                  placeholder="Item name"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Quantity */}
              <div className="col-span-1">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleUpdateItem(item.id, 'quantity', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors text-center"
                />
              </div>

              {/* Unit */}
              <div className="col-span-1">
                <select
                  value={item.unit}
                  onChange={(e) => handleUpdateItem(item.id, 'unit', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              {/* Unit Cost */}
              <div className="col-span-1">
                <input
                  type="number"
                  value={item.unitCost}
                  onChange={(e) => handleUpdateItem(item.id, 'unitCost', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors text-center"
                />
              </div>

              {/* Cost Type */}
              <div className="col-span-2">
                <select
                  value={item.costType}
                  onChange={(e) => handleUpdateItem(item.id, 'costType', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                >
                  {costTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Builder Cost */}
              <div className="col-span-1">
                <input
                  type="text"
                  value={`$${item.builderCost.toFixed(2)}`}
                  readOnly
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-neutral-50 text-neutral-600 text-center cursor-not-allowed"
                />
              </div>

              {/* Markup */}
              <div className="col-span-1">
                <input
                  type="number"
                  value={item.markup}
                  onChange={(e) => handleUpdateItem(item.id, 'markup', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors text-center"
                />
              </div>

              {/* Client Cost */}
              <div className="col-span-1">
                <input
                  type="text"
                  value={`$${item.clientCost.toFixed(2)}`}
                  readOnly
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-neutral-50 text-neutral-600 text-center cursor-not-allowed"
                />
              </div>

              {/* Delete Button */}
              <div className="col-span-1 flex items-center justify-center">
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:bg-red-50 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Item Button */}
        <div className="p-4 border-t border-neutral-200">
          <button
            onClick={handleAddItem}
            className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>Add item</span>
          </button>
        </div>

        {/* Totals */}
        <div className="p-6 bg-neutral-50 border-t border-neutral-200">
          <div className="flex justify-end gap-12 text-sm">
            <div className="text-right">
              <p className="text-neutral-600 mb-2">Total Builder Cost</p>
              <p className="text-2xl font-bold text-neutral-900">
                ${totalBuilderCost.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-neutral-600 mb-2">Total Client Cost</p>
              <p className="text-2xl font-bold text-primary-600">
                ${totalClientCost.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEstimatePage;