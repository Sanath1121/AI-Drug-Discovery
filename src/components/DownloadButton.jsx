import React, { useState } from 'react';
import { ArrowDownTrayIcon, CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { downloadResultsCSV } from '../api';
import LoadingSpinner from './LoadingSpinner';

const DownloadButton = ({ data = [], className = '' }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState('idle'); // idle, success, error

  const handleDownload = async () => {
    if (!data || data.length === 0) {
      setDownloadStatus('error');
      setTimeout(() => setDownloadStatus('idle'), 3000);
      return;
    }

    setIsDownloading(true);
    setDownloadStatus('idle');

    try {
      let blob;
      
      // Try to download from API first
      const response = await downloadResultsCSV();
      if (response.success) {
        blob = response.data;
      } else {
        // Fallback to generating CSV from local data
        const csvContent = generateCSV(data);
        blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      }

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `disease_investigation_results_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStatus('error');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  const generateCSV = (data) => {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape commas and quotes in CSV values
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');
    
    return csvContent;
  };

  const getButtonContent = () => {
    if (isDownloading) {
      return (
        <div className="flex items-center space-x-2">
          <LoadingSpinner size="small" variant="white" text="" />
          <span>Preparing Download...</span>
        </div>
      );
    }

    if (downloadStatus === 'success') {
      return (
        <div className="flex items-center space-x-2">
          <CheckIcon className="w-5 h-5" />
          <span>Downloaded!</span>
        </div>
      );
    }

    if (downloadStatus === 'error') {
      return (
        <div className="flex items-center space-x-2">
          <ExclamationTriangleIcon className="w-5 h-5" />
          <span>Download Failed</span>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <ArrowDownTrayIcon className="w-5 h-5" />
        <span>Download CSV</span>
      </div>
    );
  };

  const getButtonStyles = () => {
    const baseStyles = "px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
    
    if (downloadStatus === 'success') {
      return `${baseStyles} bg-green-600 hover:bg-green-700 text-white`;
    }
    
    if (downloadStatus === 'error') {
      return `${baseStyles} bg-red-600 hover:bg-red-700 text-white`;
    }
    
    return `${baseStyles} bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white hover:shadow-xl`;
  };

  return (
    <>
      {/* Desktop Button */}
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`hidden md:flex items-center justify-center ${getButtonStyles()} ${className}`}
      >
        {getButtonContent()}
      </button>

      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
            downloadStatus === 'success'
              ? 'bg-green-600 hover:bg-green-700'
              : downloadStatus === 'error'
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700'
          } text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
        >
          {isDownloading ? (
            <LoadingSpinner size="small" variant="white" text="" />
          ) : downloadStatus === 'success' ? (
            <CheckIcon className="w-6 h-6" />
          ) : downloadStatus === 'error' ? (
            <ExclamationTriangleIcon className="w-6 h-6" />
          ) : (
            <ArrowDownTrayIcon className="w-6 h-6" />
          )}
        </button>
        
        {/* Tooltip */}
        <div className="absolute bottom-16 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Download Results
        </div>
      </div>
    </>
  );
};

export default DownloadButton;