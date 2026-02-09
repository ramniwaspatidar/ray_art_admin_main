import React from 'react';

interface AccordionSection {
  type: string;
  icon: string;
  iconColor: string;
  title: string;
  content?: string;
  skills?: string[];
}

interface AccordionContentProps {
  sections: AccordionSection[];
}

const getIcon = (iconType: string) => {
  switch (iconType) {
    case 'document':
      return (
        <svg viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z"/>
        </svg>
      );
    case 'warning':
      return (
        <svg viewBox="0 0 16 16" fill="currentColor">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
        </svg>
      );
    case 'info':
      return (
        <svg viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
        </svg>
      );
    default:
      return null;
  }
};

const AccordionContent: React.FC<AccordionContentProps> = ({ sections }) => {
  return (
    <div className="space-y-3">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="flex items-start gap-2">
          <div className={`w-4 h-4 mt-0.5 ${section.iconColor}`}>
            {getIcon(section.icon)}
          </div>
          <div>
            <p className="text-xs font-medium text-gray-900 mb-1">{section.title}</p>
            {section.type === 'competencies' && section.skills ? (
              <div className="flex flex-wrap gap-1">
                {section.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="px-2 py-1 bg-gray-100 text-xs rounded">{skill}</span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-600">{section.content}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionContent;
export type { AccordionSection };