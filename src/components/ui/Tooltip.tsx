'use client';
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  width?: number; // optional width
  gap?: number;   // gap from button
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, width = 320, gap = 8 }) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const showTooltip = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const left = rect.left + rect.width / 2 - width / 2 + window.scrollX;
    const top = rect.bottom + gap + window.scrollY;
    setCoords({ top, left });
    setVisible(true);
  };

  const hideTooltip = () => setVisible(false);

  // Hide tooltip when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (
      tooltipRef.current &&
      buttonRef.current &&
      !tooltipRef.current.contains(e.target as Node) &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      hideTooltip();
    }
  };

  // Hide tooltip when clicking inside
  const handleClickInside = (e: React.MouseEvent) => {
    hideTooltip();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={buttonRef}
        onClick={showTooltip} // now opens on click
        className="inline-block relative cursor-pointer"
      >
        {children}
      </div>

      {visible &&
        createPortal(
          <div
            ref={tooltipRef}
            onClick={handleClickInside} // hide when clicking inside
            style={{ top: coords.top, left: coords.left, width }}
            className="absolute z-50 bg-theme-background border border-theme-border rounded-xl shadow-lg p-4 text-sm text-theme-foreground"
          >
            {/* Arrow */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-theme-background border-l border-t border-theme-border rotate-45"></div>

            {/* Content */}
            <div className="max-h-60 overflow-y-auto pr-1 custom-scroll">
              {content}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
