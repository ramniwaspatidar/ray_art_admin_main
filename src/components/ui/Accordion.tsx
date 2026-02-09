import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  fitPercentage?: string;
  fitType?: 'high' | 'medium' | 'low';
}

interface AccordionProps {
  items: AccordionItemProps[];
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onToggle,
  fitPercentage,
  fitType = 'medium'
}) => {
  const getFitColor = (type: string) => {
    switch (type) {
      case 'high':
        return 'text-green-600';
      case 'low':
        return 'text-red-600';
      default:
        return 'text-orange-600';
    }
  };

  const getChevronRotation = () => {
    return isOpen ? 'rotate-180' : 'rotate-0';
  };

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between w-full">
          <span className="text-sm font-medium text-gray-900">{title}</span>
          <div className="flex items-center gap-2">
            {fitPercentage && (
              <span className={`text-xs font-medium ${getFitColor(fitType)}`}>
                {fitPercentage}
              </span>
            )}
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${getChevronRotation()}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
};

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openItems.includes(index)}
          onToggle={() => toggleItem(index)}
          fitPercentage={item.fitPercentage}
          fitType={item.fitType}
        >
          {item.children}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;