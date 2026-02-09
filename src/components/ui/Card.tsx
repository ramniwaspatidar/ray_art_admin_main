import React from 'react';
import Image from 'next/image';

interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated';
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  children,
  className = '',
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'bg-theme-background border border-theme-border shadow-sm',
    outlined: 'bg-theme-background border-2 border-theme-border',
    elevated: 'bg-theme-background border border-theme-border shadow-lg hover:shadow-xl transition-shadow duration-300',
  };

  return (
    <div className={`rounded-lg overflow-visible transition-all duration-200 ${variantClasses[variant]} ${className}`}>
      {image && (
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title || 'Card image'}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        {title && (
          <h3 className="text-xl font-semibold text-theme-foreground mb-2">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {description}
          </p>
        )}
        {children && (
          <div className={title || description ? "mt-4" : ""}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;