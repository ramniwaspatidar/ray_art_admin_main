'use client';

import React from 'react';

interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  inline?: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  className = '',
  size = 'lg',
  inline = false,
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (inline) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className={`animate-spin rounded-full border-b-2 border-current ${sizeClasses[size]}`}></div>
        <span className={`font-medium ${textSizeClasses[size]}`}>{message}</span>
      </div>
    );
  }

  return (
    <div className={`flex-1 flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className={`animate-spin rounded-full border-b-2 border-theme-primary mx-auto mb-4 ${sizeClasses[size]}`}></div>
        <p className={`font-medium text-neutral-600 ${textSizeClasses[size]}`}>{message}</p>
      </div>
    </div>
  );
};

export default LoadingState;
