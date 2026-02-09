import React, { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  labelStyle?: string;
  extraclass?: string;
  searchable?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  required = false,
  error,
  disabled = false,
  className = '',
  labelStyle = 'block  text-sm font-medium text-theme-foreground',
  extraclass,
  searchable = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find(option => option.value === value);

  // Filter options based on search term
  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen && searchable) {
        // Focus search input when opening
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest(`[data-dropdown="${name}"]`)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, name]);

  // Clear search when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  return (
    <div className={`space-y-2 ${className}`} data-dropdown={name}>
      <label
        htmlFor={name}
        className={labelStyle}
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          className={`
           z-0 w-full px-3 py-2 border rounded-md transition-colors text-left cursor-pointer disabled:cursor-not-allowed ${extraclass}
            bg-theme-background text-theme-foreground
            border-theme-border
            ${error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}
            ${isOpen ? 'border-theme-primary ring-2 ring-theme-primary/20' : ''}
          `}
        >
          <span className={selectedOption ? 'text-theme-foreground' : 'text-muted-foreground'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setIsOpen(false)}
            />
            {/* Dropdown Menu */}
            <div className="absolute z-[9999] w-full mt-1 bg-theme-background border border-theme-border rounded-md shadow-lg max-h-60 overflow-hidden">
              {searchable && (
                <div className="p-2 border-b border-theme-border">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-3 py-2 text-sm border border-theme-border rounded-md bg-theme-background text-theme-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-theme-primary/20 focus:border-theme-primary"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
              <div className="max-h-48 overflow-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <button
                      key={`${option.label}${option.value}`}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className={`
                        w-full px-3 py-2 text-left hover:bg-muted transition-colors cursor-pointer
                        ${value === option.value ? 'bg-secondary text-theme-primary font-medium' : 'text-theme-foreground'}
                      `}
                    >
                      {option.label}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-muted-foreground text-sm">
                    No options found
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default Dropdown;