import React, { useState, useEffect } from 'react';
import { BeakerIcon, MagnifyingGlassIcon, PlusIcon, ArrowLeftIcon, SparklesIcon } from '@heroicons/react/24/outline';
import DiseaseForm from './components/DiseaseForm';
import ResultsTable from './components/ResultsTable';
import DownloadButton from './components/DownloadButton';
import LoadingSpinner, { SkeletonTable } from './components/LoadingSpinner';
import { predictDrugCandidates, downloadResultsCSV, checkAPIHealth } from './api';

// Typing animation component
const TypingText = ({ text, speed = 100, className = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span className={className}>{displayText}<span className="animate-pulse">|</span></span>;
};

function App() {
  const [currentView, setCurrentView] = useState('home'); // home, search, define, results
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState('checking');

  // Check API health on component mount
  useEffect(() => {
    const checkHealth = async () => {
      const response = await checkAPIHealth();
      if (response.success) {
        setApiStatus('connected');
      } else {
        setApiStatus('disconnected');
      }
    };
    checkHealth();
  }, []);

  const handleSearchSubmit = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await predictDrugCandidates(formData.diseaseName);
      if (response.success) {
        setResults(response.data.drugs || []);
        setCurrentView('results');
      } else {
        setError(response.error || 'Search failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDefineSubmit = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await predictDrugCandidates(formData.diseaseName);
      if (response.success) {
        setResults(response.data.drugs || []);
        setCurrentView('results');
      } else {
        setError(response.error || 'Investigation failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (config) => {
    setSortConfig(config);
  };

  const renderHome = () => (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-6 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
            <SparklesIcon className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Advanced Disease Investigation Platform</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            🧬 Investigate Current
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-blue-700 bg-clip-text text-transparent">
              Diseases
            </span>
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            <TypingText 
              text="Unlock molecular insights and accelerate drug discovery with our cutting-edge research platform"
              speed={50}
              className="font-medium"
            />
          </div>
        </div>

        {/* Option Cards */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          {/* Search Existing Disease Card */}
          <div 
            onClick={() => setCurrentView('search')}
            className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:scale-105"
          >
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 h-full">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                  <MagnifyingGlassIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    🔍 Search Existing
                  </h3>
                  <p className="text-gray-600">Quick disease lookup</p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Instantly search our comprehensive database of known diseases and their molecular targets. Get detailed insights into established disease mechanisms and potential therapeutic compounds.
              </p>
              
              <div className="flex items-center space-x-2 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                <span>Start searching</span>
                <div className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300">→</div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
            </div>
          </div>

          {/* Define New Disease Card */}
          <div 
            onClick={() => setCurrentView('define')}
            className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:scale-105"
          >
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 h-full">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                  <PlusIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                    ➕ Define New Disease
                  </h3>
                  <p className="text-gray-600">Advanced research form</p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Submit novel disease information including target proteins and molecular sequences. Our AI-powered analysis will identify potential drug candidates and therapeutic approaches.
              </p>
              
              <div className="flex items-center space-x-2 text-teal-600 font-semibold group-hover:text-teal-700 transition-colors duration-300">
                <span>Begin investigation</span>
                <div className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300">→</div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-6 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-white/20">
            <div className="flex items-center space-x-2 text-gray-700">
              <BeakerIcon className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">AI-Powered Analysis</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center space-x-2 text-gray-700">
              <SparklesIcon className="w-5 h-5 text-teal-600" />
              <span className="text-sm font-medium">Molecular Insights</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center space-x-2 text-gray-700">
              <MagnifyingGlassIcon className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium">Drug Discovery</span>
            </div>
          </div>
        </div>

        {/* API Status */}
        <div className="text-center mt-8">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
            apiStatus === 'connected' 
              ? 'bg-green-100 text-green-800' 
              : apiStatus === 'disconnected'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              apiStatus === 'connected' 
                ? 'bg-green-500' 
                : apiStatus === 'disconnected'
                ? 'bg-red-500'
                : 'bg-yellow-500'
            }`}></div>
            <span>
              {apiStatus === 'connected' 
                ? 'API Connected' 
                : apiStatus === 'disconnected'
                ? 'API Disconnected - Check Colab'
                : 'Checking API Status...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderForm = (type) => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12 px-6">
      <div className="container mx-auto max-w-2xl">
        {/* Navigation */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentView('home')}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div>
              <p className="text-red-800 font-medium">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        <DiseaseForm
          type={type}
          onSubmit={type === 'search' ? handleSearchSubmit : handleDefineSubmit}
          loading={loading}
        />
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentView('home')}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <DownloadButton data={results} />
        </div>

        {loading ? (
          <SkeletonTable />
        ) : (
          <ResultsTable
            data={results}
            loading={loading}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="font-sans antialiased">
      {currentView === 'home' && renderHome()}
      {currentView === 'search' && renderForm('search')}
      {currentView === 'define' && renderForm('define')}
      {currentView === 'results' && renderResults()}
    </div>
  );
}

export default App;