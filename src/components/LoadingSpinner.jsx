import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...', variant = 'primary' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const variantClasses = {
    primary: 'border-blue-500',
    secondary: 'border-teal-500',
    white: 'border-white'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} ${variantClasses[variant]} border-4 border-opacity-20 rounded-full animate-pulse`}
        />
        <div
          className={`${sizeClasses[size]} ${variantClasses[variant]} border-4 border-t-transparent rounded-full animate-spin absolute top-0 left-0`}
        />
      </div>
      {text && (
        <p className="text-gray-600 text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export const SkeletonCard = ({ className = '' }) => (
  <div className={`bg-white rounded-xl p-6 shadow-lg animate-pulse ${className}`}>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
  </div>
);

export const SkeletonTable = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="p-6 border-b border-gray-100">
      <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
    </div>
    <div className="divide-y divide-gray-100">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-6 flex space-x-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  </div>
);

export default LoadingSpinner;