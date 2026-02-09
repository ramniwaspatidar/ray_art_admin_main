'use client';

import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50">
      <div className={`bg-theme-background rounded-xl shadow-lg p-6 relative w-full ${className || ''}`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover-text-neutral cursor-pointer"
        >
          ✕
        </button>

        {title && <h2 className="text-xl font-semibold mb-4 text-theme-foreground">{title}</h2>}

        <div className="mb-4">{children}</div>

        {footer && <div className="flex justify-end space-x-2">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
