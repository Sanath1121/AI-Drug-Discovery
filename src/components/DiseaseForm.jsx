import React, { useState } from 'react';
import { BeakerIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

const DiseaseForm = ({ type, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    diseaseName: '',
    targetProtein: '',
    sequence: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.diseaseName || formData.diseaseName.trim().length < 2) {
      newErrors.diseaseName = 'Disease name must be at least 2 characters long';
    }
    
    if (type === 'define') {
      if (!formData.targetProtein || formData.targetProtein.trim().length < 2) {
        newErrors.targetProtein = 'Target protein name is required';
      }
      
      if (!formData.sequence || formData.sequence.trim().length < 10) {
        newErrors.sequence = 'Protein/DNA sequence must be at least 10 characters long';
      }
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  const isSearchForm = type === 'search';
  const isDefineForm = type === 'define';

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className={`px-8 py-6 ${isSearchForm ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-teal-600 to-teal-700'}`}>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            {isSearchForm ? (
              <MagnifyingGlassIcon className="w-6 h-6 text-white" />
            ) : (
              <PlusIcon className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {isSearchForm ? 'Search Existing Disease' : 'Define New Disease'}
            </h2>
            <p className="text-blue-100">
              {isSearchForm 
                ? 'Enter a disease name to find existing research and drug candidates'
                : 'Submit novel disease information for AI-powered analysis'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Disease Name Input */}
          <div>
            <label htmlFor="diseaseName" className="block text-sm font-semibold text-gray-700 mb-2">
              Disease Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BeakerIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="diseaseName"
                name="diseaseName"
                value={formData.diseaseName}
                onChange={handleInputChange}
                placeholder="e.g., Alzheimer's disease, cancer, diabetes..."
                className={`block w-full pl-10 pr-3 py-4 border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.diseaseName 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
                disabled={loading}
              />
            </div>
            {errors.diseaseName && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="w-4 h-4 mr-1">⚠️</span>
                {errors.diseaseName}
              </p>
            )}
          </div>

          {/* Define Form - Additional Fields */}
          {isDefineForm && (
            <>
              {/* Target Protein Input */}
              <div>
                <label htmlFor="targetProtein" className="block text-sm font-semibold text-gray-700 mb-2">
                  Target Protein *
                </label>
                <input
                  type="text"
                  id="targetProtein"
                  name="targetProtein"
                  value={formData.targetProtein}
                  onChange={handleInputChange}
                  placeholder="e.g., p53, Amyloid-beta, Insulin Receptor..."
                  className={`block w-full px-4 py-4 border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                    errors.targetProtein 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  disabled={loading}
                />
                {errors.targetProtein && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.targetProtein}
                  </p>
                )}
              </div>

              {/* Sequence Input */}
              <div>
                <label htmlFor="sequence" className="block text-sm font-semibold text-gray-700 mb-2">
                  Protein/DNA Sequence *
                </label>
                <textarea
                  id="sequence"
                  name="sequence"
                  value={formData.sequence}
                  onChange={handleInputChange}
                  placeholder="Enter the protein or DNA sequence (minimum 10 characters)..."
                  rows={4}
                  className={`block w-full px-4 py-4 border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 resize-none ${
                    errors.sequence 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  disabled={loading}
                />
                {errors.sequence && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.sequence}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Examples */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Example diseases to try:</h4>
            <div className="flex flex-wrap gap-2">
              {['Alzheimer\'s disease', 'cancer', 'diabetes', 'hypertension', 'depression', 'asthma'].map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, diseaseName: example }))}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors duration-200"
                  disabled={loading}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !formData.diseaseName.trim()}
            className={`w-full font-semibold py-4 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
              isSearchForm 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white focus:ring-blue-500' 
                : 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white focus:ring-teal-500'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{isSearchForm ? 'Searching...' : 'Analyzing...'}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                {isSearchForm ? (
                  <>
                    <MagnifyingGlassIcon className="w-5 h-5" />
                    <span>Search Disease</span>
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-5 h-5" />
                    <span>Define Disease</span>
                  </>
                )}
              </div>
            )}
          </button>
        </form>

        {/* Info Section */}
        <div className={`mt-8 p-4 rounded-xl border ${
          isSearchForm 
            ? 'bg-blue-50 border-blue-200' 
            : 'bg-teal-50 border-teal-200'
        }`}>
          <h4 className={`text-sm font-semibold mb-2 ${
            isSearchForm ? 'text-blue-800' : 'text-teal-800'
          }`}>
            {isSearchForm ? 'What happens when you search?' : 'What happens when you define?'}
          </h4>
          <ul className={`text-sm space-y-1 ${
            isSearchForm ? 'text-blue-700' : 'text-teal-700'
          }`}>
            {isSearchForm ? (
              <>
                <li>• Our ML models will query disease-target associations</li>
                <li>• Analyze compound bioactivity and toxicity profiles</li>
                <li>• Calculate synergy scores for drug combinations</li>
                <li>• Generate a comprehensive CSV report</li>
              </>
            ) : (
              <>
                <li>• AI will analyze your disease information</li>
                <li>• Identify potential target proteins and pathways</li>
                <li>• Predict drug candidates and therapeutic approaches</li>
                <li>• Generate detailed molecular insights</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiseaseForm;