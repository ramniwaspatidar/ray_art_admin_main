'use client';

import React from 'react';
import Button from './Button';
import { BUTTONS } from '@/utils/constant';

interface PaginationProps {
  currentPage: number;
  maxPageReached: number;
  onPageChange: (page: number) => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  itemsOnCurrentPage: number;
  itemsPerPage?: number;
  hasMore?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  maxPageReached,
  onPageChange,
  canGoNext,
  canGoPrev,
  itemsOnCurrentPage,
  itemsPerPage = 10,
  hasMore,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const endPage = Math.max(maxPageReached, currentPage);
    const maxVisiblePages = 5; 
    
    if (endPage <= maxVisiblePages) {
      for (let i = 1; i <= endPage; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPageRange = Math.min(endPage, currentPage + 2);
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }
      
      for (let i = startPage; i <= endPageRange; i++) {
        if (i !== 1 && i !== endPage) {
          pages.push(i);
        } else if (i === 1 || i === endPage) {
          if (!pages.includes(i)) {
            pages.push(i);
          }
        }
      }
      
      if (endPageRange < endPage) {
        if (endPageRange < endPage - 1) {
          pages.push('...');
        }
        if (!pages.includes(endPage)) {
          pages.push(endPage);
        }
      }
    }
    
    return pages;
  };

  if (itemsOnCurrentPage === 0) return null;

  const startIndex = (currentPage - 1) * itemsPerPage + 1;

  return (
    <div className={`flex items-center justify-center px-3 py-2 bg-theme-background border-t border-theme-border`}>
      <div className="flex items-center space-x-1.5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrev}
          className="px-2 py-1 h-8"
        >
          <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-xs">{BUTTONS.PREVIOUS}</span>
        </Button>
        
        <div className="flex items-center space-x-0.5">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={index} className="px-1.5 py-1 text-xs text-muted-foreground">
                ...
              </span>
            ) : (
              <Button
                key={index}
                variant={currentPage === page ? "primary" : "outline"}
                size="sm"
                onClick={() => onPageChange(page as number)}
                className="min-w-[32px] h-8 px-2 py-1 text-xs"
              >
                {page}
              </Button>
            )
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className="px-2 py-1 h-8"
        >
          <span className="text-xs">{BUTTONS.NEXT}</span>
          <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;