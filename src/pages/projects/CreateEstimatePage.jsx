import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, MoreVertical, Loader2, AlertCircle, X } from 'lucide-react';
import { useNavigate, useParams } from '../../utils/router';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../contexts/AuthContext';

const CreateEstimatePage = () => {
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const { user } = useAuth();
  
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
      unitCost: 500,
      costType: 'Labor + Material',
      builderCost: 500.00,
      markup: 0,
      clientCost: 500.00
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const costTypes = ['Labor + Material', 'Material', 'Labor', 'Equipment', 'Subcontractor'];
  const units = ['EA', 'CY', 'TON', 'SF', 'LF', 'SY', 'LB', 'GAL', 'HR', 'DAY'];

  // Verify project exists on mount
  useEffect(() => {
    verifyProject();
  }, [projectId, user]);

  const verifyProject = async () => {
    try {
      setLoading(true);
      
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('id, name')
        .eq('id', projectId)
        .eq('profile_id', user.id)
        .single();

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          throw new Error('Project not found');
        }
        throw fetchError;
      }
    } catch (err) {
      console.error('Error verifying project:', err);
      setError(err.message || 'Failed to load project');
    } finally {
      setLoading(false);
    }
  };

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
    if (items.length === 1) {
      setError('You must have at least one item in the estimate');
      return;
    }
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

  const validateEstimate = () => {
    if (!estimateName.trim()) {
      throw new Error('Please enter an estimate name');
    }

    const hasValidItem = items.some(item => item.item.trim() !== '');
    if (!hasValidItem) {
      throw new Error('Please add at least one item with a name');
    }

    return true;
  };

  const handleSave = async () => {
    try {
      // Validate
      validateEstimate();

      setSaving(true);
      setError(null);

      // 1. Create the estimate
      const { data: estimate, error: estimateError } = await supabase
        .from('estimates')
        .insert({
          project_id: projectId,
          profile_id: user.id,
          name: estimateName.trim(),
          total_builder_cost: totalBuilderCost,
          total_client_cost: totalClientCost
        })
        .select()
        .single();

      if (estimateError) throw estimateError;

      // 2. Create estimate items
      const itemsToInsert = items
        .filter(item => item.item.trim() !== '') // Only save items with names
        .map(item => ({
          estimate_id: estimate.id,
          item: item.item.trim(),
          quantity: parseFloat(item.quantity) || 0,
          unit: item.unit,
          unit_cost: parseFloat(item.unitCost) || 0,
          cost_type: item.costType,
          builder_cost: parseFloat(item.builderCost) || 0,
          markup: parseFloat(item.markup) || 0,
          client_cost: parseFloat(item.clientCost) || 0
        }));

      if (itemsToInsert.length > 0) {
        const { error: itemsError } = await supabase
          .from('estimate_items')
          .insert(itemsToInsert);

        if (itemsError) throw itemsError;
      }

      // 3. Update project total_amount
      const { error: updateError } = await supabase
        .from('projects')
        .update({ 
          total_amount: totalClientCost,
          updated_at: new Date().toISOString()
        })
        .eq('id', projectId)
        .eq('profile_id', user.id);

      if (updateError) throw updateError;

      // Success - navigate back
      navigate(`/projects/${projectId}?tab=estimates`);
    } catch (err) {
      console.error('Error saving estimate:', err);
      setError(err.message || 'Failed to save estimate. Please try again.');
      setSaving(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700 flex-1">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            disabled={saving}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors border border-neutral-200 disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <input
              type="text"
              value={estimateName}
              onChange={(e) => setEstimateName(e.target.value)}
              disabled={saving}
              className="text-2xl font-bold text-neutral-900 border-2 border-transparent hover:border-neutral-200 focus:border-primary-500 rounded-lg px-3 py-1 focus:outline-none transition-colors disabled:opacity-50"
              placeholder="Estimate name"
            />
            <p className="text-sm text-neutral-600 mt-1">{items.length} items</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleBack}
            disabled={saving}
            className="px-4 py-2 bg-white border-2 border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:border-neutral-300 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>Save Estimate</span>
            )}
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
          <div className="col-span-1">Markup %</div>
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
                  disabled={saving}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors disabled:opacity-50"
                />
              </div>

              {/* Quantity */}
              <div className="col-span-1">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleUpdateItem(item.id, 'quantity', e.target.value)}
                  min="0"
                  step="0.01"
                  disabled={saving}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors text-center disabled:opacity-50"
                />
              </div>

              {/* Unit */}
              <div className="col-span-1">
                <select
                  value={item.unit}
                  onChange={(e) => handleUpdateItem(item.id, 'unit', e.target.value)}
                  disabled={saving}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors disabled:opacity-50"
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
                  min="0"
                  step="0.01"
                  disabled={saving}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors text-center disabled:opacity-50"
                />
              </div>

              {/* Cost Type */}
              <div className="col-span-2">
                <select
                  value={item.costType}
                  onChange={(e) => handleUpdateItem(item.id, 'costType', e.target.value)}
                  disabled={saving}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors disabled:opacity-50"
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
                  value={formatCurrency(item.builderCost)}
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
                  min="0"
                  step="1"
                  disabled={saving}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors text-center disabled:opacity-50"
                />
              </div>

              {/* Client Cost */}
              <div className="col-span-1">
                <input
                  type="text"
                  value={formatCurrency(item.clientCost)}
                  readOnly
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-neutral-50 text-neutral-600 text-center cursor-not-allowed"
                />
              </div>

              {/* Delete Button */}
              <div className="col-span-1 flex items-center justify-center">
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  disabled={saving || items.length === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:bg-red-50 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  title={items.length === 1 ? 'Cannot delete the last item' : 'Delete item'}
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
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors font-medium disabled:opacity-50"
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
                {formatCurrency(totalBuilderCost)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-neutral-600 mb-2">Total Client Cost</p>
              <p className="text-2xl font-bold text-primary-600">
                {formatCurrency(totalClientCost)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Reminder */}
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
          <p className="text-sm text-primary-900">
            Remember to save your estimate before leaving this page
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-sm text-primary-600 font-semibold hover:text-primary-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save now'}
        </button>
      </div>
    </div>
  );
};

export default CreateEstimatePage;