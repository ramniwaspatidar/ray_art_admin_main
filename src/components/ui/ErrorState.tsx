'use client';

import React from 'react';
import Button from './Button';
import Card from './Card';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryButtonText?: string;
  icon?: React.ReactNode;
  className?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Error',
  message = 'Something went wrong. Please try again.',
  onRetry,
  retryButtonText = 'Retry',
  icon,
  className = ''
}) => {
  const defaultIcon = (
    <svg
      className="w-12 h-12 mx-auto mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  return (
    <div className={`flex-1 flex items-center justify-center ${className}`}>
      <Card className="text-center py-12">
        <div className="text-error">
          {icon || defaultIcon}
          <p className="text-lg font-medium">{title}</p>
          <p className="text-sm">{message}</p>
          {onRetry && (
            <Button className="mt-4" onClick={onRetry}>
              {retryButtonText}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ErrorState;