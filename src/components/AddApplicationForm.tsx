import React, { useState, useRef, useEffect } from 'react';
import { X, Save, XCircle, ChevronDown } from 'lucide-react';

interface AddApplicationFormProps {
  onSave: () => void;
  onCancel: () => void;
}

const AddApplicationForm: React.FC<AddApplicationFormProps> = ({ onSave, onCancel }) => {
  const [jobPostingUrl, setJobPostingUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [applicationStatus, setApplicationStatus] = useState('Applied');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const statusButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const statusOptions = [
    'Waiting To Apply',
    'Applied',
    'Interviewing',
    'Rejected',
    'Offered',
    'Offer Accepted',
    'Offer Refused'
  ];

  // URL validation function
  const isValidUrl = (url: string): boolean => {
    if (!url.trim()) return true; // Empty URL is valid (will be caught by required validation)
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Handle URL input change without immediate validation
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setJobPostingUrl(value);

    // Clear error immediately if field becomes empty
    if (!value.trim()) {
      setUrlError('');
    }
  };

  // Debounced URL validation effect
  useEffect(() => {
    // Clear any existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Don't validate empty URLs (handled by required validation)
    if (!jobPostingUrl.trim()) {
      return;
    }

    // Set up debounced validation
    debounceTimeoutRef.current = setTimeout(() => {
      if (jobPostingUrl.trim() && !isValidUrl(jobPostingUrl)) {
        setUrlError('Please enter a valid URL (e.g., https://example.com)');
      } else {
        setUrlError('');
      }
    }, 500); // 500ms debounce delay

    // Cleanup function
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [jobPostingUrl]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        statusButtonRef.current &&
        dropdownRef.current &&
        !statusButtonRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isDropdownOpen && statusButtonRef.current) {
      const buttonRect = statusButtonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 250; // Estimated dropdown height
      const spaceBelow = viewportHeight - buttonRect.bottom;
      
      if (spaceBelow < dropdownHeight) {
        setOpenUpwards(true);
      } else {
        setOpenUpwards(false);
      }
    } else {
      setOpenUpwards(false);
    }
  }, [isDropdownOpen]);

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

  const handleSave = () => {
    // Immediate validation on save attempt
    const trimmedUrl = jobPostingUrl.trim();
    
    if (!trimmedUrl) {
      return; // Don't save if URL is empty
    }

    // Perform immediate URL validation
    if (!isValidUrl(trimmedUrl)) {
      setUrlError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    // Clear any existing error
    setUrlError('');

    // If we have an existing urlError, don't save
    if (urlError) {
      return;
    }
    
    // Call the onSave prop to close the form
    onSave();
  };

  const handleCancel = () => {
    // Clear any pending debounce timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Reset form fields
    setJobPostingUrl('');
    setUrlError('');
    setApplicationStatus('Applied');
    onCancel();
  };

  const handleStatusSelect = (status: string) => {
    setApplicationStatus(status);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative z-50 bg-dark-card/70 backdrop-blur-sm rounded-lg shadow-glow-card border border-dark-border p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-200">Add Application</h2>
      </div>

      <form className="space-y-6">
        {/* Fields Container - Side by side on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Job Posting URL Field */}
          <div>
            <label htmlFor="jobPostingUrl" className="block text-sm font-medium text-gray-300 mb-2">
              Job Posting URL <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              id="jobPostingUrl"
              value={jobPostingUrl}
              onChange={handleUrlChange}
              placeholder="https://example.com/job-posting"
              className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-base text-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent focus:scale-105 hover:border-primary/50 transition-all duration-200 ease-in-out ${
                urlError ? 'border-red-500' : 'border-dark-border'
              }`}
              required
            />
            {urlError && (
              <p className="mt-2 text-sm text-red-400">{urlError}</p>
            )}
          </div>

          {/* Application Status Field */}
          <div>
            <label htmlFor="applicationStatus" className="block text-sm font-medium text-gray-300 mb-2">
              Application Status <span className="text-red-400">*</span>
            </label>
            <div className={`relative ${isDropdownOpen ? 'z-50' : ''}`}>
              <button
                ref={statusButtonRef}
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ease-in-out hover:opacity-80 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-between ${getStatusColor(applicationStatus)}`}
              >
                <span>{applicationStatus}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div 
                  ref={dropdownRef}
                  className={`absolute left-0 right-0 w-full bg-dark-card border border-dark-border rounded-lg shadow-xl z-[100] ${
                  openUpwards ? 'bottom-full mb-2' : 'top-full mt-2'
                }`}
                >
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => handleStatusSelect(status)}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-800/50 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ease-in-out first:rounded-t-lg last:rounded-b-lg ${
                        status === applicationStatus ? 'bg-primary/20 text-primary' : 'text-gray-300'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center sm:justify-end pt-4">
          <div className="w-full flex flex-col sm:w-auto sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={!jobPostingUrl.trim() || !!urlError}
              className="w-full sm:w-auto bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary/80 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ease-in-out flex items-center justify-center space-x-2 shadow-glow-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-primary"
            >
              <Save className="w-5 h-5" />
              <span>Save Application</span>
            </button>
            
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-auto bg-gray-700 text-gray-200 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-600 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-200 ease-in-out flex items-center justify-center space-x-2"
            >
              <XCircle className="w-5 h-5" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddApplicationForm;