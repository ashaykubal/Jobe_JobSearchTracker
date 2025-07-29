import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Trash2, Building } from 'lucide-react';

interface ApplicationCardProps {
  id: number;
  company_name: string;
  job_title: string;
  work_location: string;
  posting_date: string;
  job_description: string;
  application_date: string;
  current_status: 'Waiting To Apply' | 'Applied' | 'Interviewing' | 'Rejected' | 'Offered' | 'Offer Accepted' | 'Offer Refused';
  isDropdownOpen: boolean;
  onStatusUpdate: (id: number, status: string) => void;
  onDelete: (id: number) => void;
  onToggleDropdown: (id: number | null) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  id,
  company_name,
  job_title,
  work_location,
  posting_date,
  job_description,
  application_date,
  current_status,
  isDropdownOpen,
  onStatusUpdate,
  onDelete,
  onToggleDropdown,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const statusButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const statusOptions = [
    'Waiting To Apply',
    'Applied',
    'Interviewing',
    'Rejected',
    'Offered',
    'Offer Accepted',
    'Offer Refused'
  ];

  useEffect(() => {
    if (isDropdownOpen && statusButtonRef.current) {
      const buttonRect = statusButtonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 250; // Estimated dropdown height
      const mobileNavHeight = 80; // Mobile navigation height
      const spaceBelow = viewportHeight - buttonRect.bottom - mobileNavHeight;
      
      if (spaceBelow < dropdownHeight) {
        setOpenUpwards(true);
      } else {
        setOpenUpwards(false);
      }
    } else {
      setOpenUpwards(false);
    }
  }, [isDropdownOpen]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target as Node)) {
        onToggleDropdown(null);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, onToggleDropdown]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Waiting To Apply':
        return 'text-gray-300 bg-gray-500/20';
      case 'Applied':
        return 'text-blue-300 bg-blue-500/20';
      case 'Interviewing':
        return 'text-yellow-300 bg-yellow-400/20';
      case 'Rejected':
        return 'text-red-300 bg-red-500/20';
      case 'Offered':
        return 'text-green-300 bg-green-500/20';
      case 'Offer Accepted':
        return 'text-emerald-300 bg-emerald-500/20';
      case 'Offer Refused':
        return 'text-orange-300 bg-orange-500/20';
      default:
        return 'text-gray-300 bg-gray-500/20';
    }
  };

  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  return (
    <div className={`bg-dark-card/70 backdrop-blur-sm rounded-lg p-6 shadow-glow-card border border-dark-border hover:shadow-glow-card-hover hover:border-primary/20 transition-all duration-300 ${isDropdownOpen ? 'relative z-10' : ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-bold text-gray-200 mb-1 truncate">{job_title}</h3>
          <p className="text-sm md:text-base text-gray-400 font-medium mb-2">{company_name}</p>
          <div className="flex flex-wrap gap-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{work_location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">{formatDaysAgo(posting_date)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 flex-shrink-0 mt-4 sm:mt-0">
          <div className="relative" ref={dropdownContainerRef}>
            <button
              ref={statusButtonRef}
              onClick={() => onToggleDropdown(isDropdownOpen ? null : id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out hover:opacity-80 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 ${getStatusColor(current_status)}`}
            >
              {current_status}
            </button>
            
            {isDropdownOpen && (
              <div className={`absolute left-0 sm:right-0 sm:left-auto w-48 bg-dark-card border border-dark-border rounded-lg shadow-xl z-50 ${
                openUpwards ? 'bottom-full mb-2' : 'top-full mt-2'
              }`}>
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      onStatusUpdate(id, status);
                      onToggleDropdown(null);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-800/50 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ease-in-out first:rounded-t-lg last:rounded-b-lg ${
                      status === current_status ? 'bg-primary/20 text-primary' : 'text-gray-300'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={() => onDelete(id)}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded-lg transition-all duration-200 ease-in-out"
          >
            <Trash2 className="w-5 h-5 transition-transform duration-200 ease-in-out hover:scale-110" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-300 text-sm leading-relaxed">
          {showFullDescription ? job_description : truncateDescription(job_description)}
          {job_description.length > 150 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="ml-2 text-primary hover:text-primary/80 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium transition-all duration-200 ease-in-out"
            >
              {showFullDescription ? 'Show Less' : 'View Details'}
            </button>
          )}
        </p>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-dark-border">
        <div className="text-sm text-gray-400">
          Applied <span className="font-medium text-gray-200">{formatDaysAgo(application_date)}</span>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;