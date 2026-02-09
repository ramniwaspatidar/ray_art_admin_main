"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = "Application Submitted",
  message = "Your application has been successfully submitted. We'll review it and get back to you soon.",
}) => {
  const router = useRouter()
  if (!isOpen) return null;

  const handleCloseModal = () => {
    onClose()
    router.replace('/')
  };

  return (
    <div className="fixed inset-0 bg-overlay backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-theme-background rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Success Icon */}
        <div className="bg-success-light px-6 pt-8 pb-4 text-center">
          <div className="mx-auto w-16 h-16 bg-success-muted rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">{title}</h3>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <p className="text-neutral-600 text-center mb-6 leading-relaxed">
            {message}
          </p>

          {/* Progress Indicator */}
          {/* <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span className="font-semibold text-green-600">100% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: '100%' }}
              />
            </div>
          </div> */}

          {/* Action Button */}
          <button
            onClick={handleCloseModal}
            className="w-full btn-success font-medium py-3 px-4 rounded-lg focus-ring-success"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
