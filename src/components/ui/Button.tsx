import React from 'react';
import { DISABLED_STYLES } from '@/utils/constant';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 ring-theme-ring focus-visible:ring-offset-2 cursor-pointer';
  
  const variantClasses = {
    primary: 'btn-primary shadow-sm',
    secondary: 'btn-secondary shadow-sm',
    outline: 'btn-outline',
    destructive: 'btn-error shadow-sm',
    success: 'btn-success shadow-sm',
    warning: 'btn-warning shadow-sm',
  };
  
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  const isDisabled = disabled || loading;
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${!isDisabled ? variantClasses[variant] : ''} ${sizeClasses[size]} ${className} ${isDisabled ? DISABLED_STYLES.BUTTON + ' !important' : ''}`}
      onClick={onClick}
      disabled={isDisabled}
      style={isDisabled ? {
        opacity: '0.6',
        cursor: 'not-allowed',
        backgroundColor: '#e5e5e5',
        color: '#9ca3af',
        borderColor: '#d1d5db'
      } : undefined}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;