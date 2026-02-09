'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };

    if (typeof window !== 'undefined') {
      try {
        const encryptedUserId = document.cookie
          .split('; ')
          .find(row => row.startsWith('userId='))
          ?.split('=')[1];
        
        
      } catch (error) {
        console.error('Failed to initialize GA service in ErrorBoundary:', error);
      }
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

   
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-theme-background flex items-center justify-center">
            <div className="text-center p-8">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 text-error mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-theme-foreground mb-2">
                Something went wrong
              </h2>
              <p className="text-muted-foreground mb-6">
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary px-6 py-2 rounded-lg"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;