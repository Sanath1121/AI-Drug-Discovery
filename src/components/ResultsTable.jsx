import React, { useState, useMemo } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const ResultsTable = ({ data, loading, onSort, sortConfig }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (index) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  const getActivityColor = (activity) => {
    return activity === 'Active' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  const getToxicityColor = (toxicity) => {
    if (toxicity <= 0.3) return 'text-green-600 bg-green-100';
    if (toxicity <= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSynergyColor = (synergy) => {
    if (synergy >= 0.7) return 'text-green-600 bg-green-100';
    if (synergy >= 0.4) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    onSort({ key, direction });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 text-center">
          <div className="inline-flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-medium text-gray-700">Analyzing disease data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Results Found</h3>
          <p className="text-gray-500">Try a different disease name or check your API connection.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Disease Investigation Results</h2>
          <div className="text-blue-100 text-sm">
            {data.length} result{data.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Drug Information
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                onClick={() => handleSort('predicted_activity')}
              >
                <div className="flex items-center space-x-1">
                  <span>Activity</span>
                  {sortConfig?.key === 'predicted_activity' && (
                    sortConfig.direction === 'asc' ? 
                      <ChevronUpIcon className="w-4 h-4" /> : 
                      <ChevronDownIcon className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                onClick={() => handleSort('predicted_toxicity')}
              >
                <div className="flex items-center space-x-1">
                  <span>Toxicity</span>
                  {sortConfig?.key === 'predicted_toxicity' && (
                    sortConfig.direction === 'asc' ? 
                      <ChevronUpIcon className="w-4 h-4" /> : 
                      <ChevronDownIcon className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                onClick={() => handleSort('synergy_score')}
              >
                <div className="flex items-center space-x-1">
                  <span>Synergy</span>
                  {sortConfig?.key === 'synergy_score' && (
                    sortConfig.direction === 'asc' ? 
                      <ChevronUpIcon className="w-4 h-4" /> : 
                      <ChevronDownIcon className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((drug, index) => (
              <React.Fragment key={drug.drug_id || index}>
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {drug.name?.charAt(0) || 'D'}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {drug.name || 'Unknown Drug'}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {drug.drug_id || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActivityColor(drug.predicted_activity || 'Unknown')}`}>
                      {drug.predicted_activity || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getToxicityColor(drug.predicted_toxicity || 0)}`}>
                      {(drug.predicted_toxicity || 0).toFixed(3)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSynergyColor(drug.synergy_score || 0)}`}>
                      {(drug.synergy_score || 0).toFixed(3)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleRowExpansion(index)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
                    >
                      {expandedRows.has(index) ? 'Hide Details' : 'Show Details'}
                    </button>
                  </td>
                </tr>
                {expandedRows.has(index) && (
                  <tr className="bg-blue-50">
                    <td colSpan="5" className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Additional Information</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p><span className="font-medium">Mechanism:</span> {drug.mechanism || 'Not specified'}</p>
                            <p><span className="font-medium">Target:</span> {drug.target || 'Not specified'}</p>
                            <p><span className="font-medium">Phase:</span> {drug.phase || 'Not specified'}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Prediction Confidence</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p><span className="font-medium">Activity Confidence:</span> {((drug.activity_confidence || 0) * 100).toFixed(1)}%</p>
                            <p><span className="font-medium">Toxicity Confidence:</span> {((drug.toxicity_confidence || 0) * 100).toFixed(1)}%</p>
                            <p><span className="font-medium">Overall Score:</span> {((drug.overall_score || 0) * 100).toFixed(1)}%</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {data.filter(drug => drug.predicted_activity === 'Active').length}
            </div>
            <div className="text-gray-600">Active Candidates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {data.filter(drug => (drug.synergy_score || 0) >= 0.7).length}
            </div>
            <div className="text-gray-600">High Synergy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {data.filter(drug => (drug.predicted_toxicity || 0) <= 0.3).length}
            </div>
            <div className="text-gray-600">Low Toxicity</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;