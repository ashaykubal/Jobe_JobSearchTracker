import React, { useState, useRef, useEffect } from 'react';
import { Search, Calendar, MapPin, ChevronDown, ChevronUp, Edit3, X, Check } from 'lucide-react';

interface SearchDetails {
  roles: string[];
  jobBoards: string[];
  salary: string;
  remote: string;
  locations: string[];
}

interface SearchCardProps {
  id: number;
  title: string;
  location: string;
  createdDate: string;
  searchDetails: SearchDetails;
}

const SearchCard: React.FC<SearchCardProps> = ({
  id,
  title,
  location,
  createdDate,
  searchDetails,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingSalary, setEditingSalary] = useState(false);
  const [editingWorkStyle, setEditingWorkStyle] = useState(false);
  const [editingLocations, setEditingLocations] = useState(false);
  const [isWorkStyleDropdownOpen, setIsWorkStyleDropdownOpen] = useState(false);
  const [openWorkStyleUpwards, setOpenWorkStyleUpwards] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [openLocationUpwards, setOpenLocationUpwards] = useState(false);
  const [tempSalary, setTempSalary] = useState(searchDetails.salary);
  const [tempWorkStyle, setTempWorkStyle] = useState(searchDetails.remote);
  const [tempLocations, setTempLocations] = useState(searchDetails.locations);
  const [locationFilter, setLocationFilter] = useState('');

  // Refs for work style dropdown
  const workStyleButtonRef = useRef<HTMLButtonElement>(null);
  const workStyleDropdownRef = useRef<HTMLDivElement>(null);
  
  // Refs for location dropdown
  const locationInputRef = useRef<HTMLInputElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);

  // Available work style options
  const workStyleOptions = ['Hybrid', 'In Person', 'Fully Remote'];

  // Available location options (this would typically come from an API)
  const availableLocations = [
    'San Francisco Bay Area',
    'New York',
    'Los Angeles',
    'Chicago',
    'Austin, TX',
    'Seattle',
    'Boston',
    'Denver',
    'Remote',
    'Miami',
    'Portland',
    'Atlanta'
  ];

  const filteredLocations = availableLocations.filter(loc =>
    loc.toLowerCase().includes(locationFilter.toLowerCase()) &&
    !tempLocations.includes(loc)
  );

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSalarySave = () => {
    searchDetails.salary = tempSalary;
    setEditingSalary(false);
  };

  const handleSalaryCancel = () => {
    setTempSalary(searchDetails.salary);
    setEditingSalary(false);
  };

  const handleWorkStyleSave = () => {
    searchDetails.remote = tempWorkStyle;
    setEditingWorkStyle(false);
  };

  const handleWorkStyleCancel = () => {
    setTempWorkStyle(searchDetails.remote);
    setEditingWorkStyle(false);
  };

  const handleLocationsSave = () => {
    searchDetails.locations = tempLocations;
    setEditingLocations(false);
  };

  const handleLocationsCancel = () => {
    setTempLocations(searchDetails.locations);
    setLocationFilter('');
    setEditingLocations(false);
  };

  const addLocation = (location: string) => {
    if (!tempLocations.includes(location)) {
      setTempLocations([...tempLocations, location]);
    }
    setLocationFilter('');
  };

  // Handle work style dropdown positioning
  useEffect(() => {
    if (isWorkStyleDropdownOpen && workStyleButtonRef.current) {
      const buttonRect = workStyleButtonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 250; // Estimated dropdown height
      const mobileNavHeight = 80; // Mobile navigation height
      const spaceBelow = viewportHeight - buttonRect.bottom - mobileNavHeight;
      
      if (spaceBelow < dropdownHeight) {
        setOpenWorkStyleUpwards(true);
      } else {
        setOpenWorkStyleUpwards(false);
      }
    } else {
      setOpenWorkStyleUpwards(false);
    }
  }, [isWorkStyleDropdownOpen]);

  // Handle click outside work style dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isWorkStyleDropdownOpen &&
        workStyleButtonRef.current &&
        workStyleDropdownRef.current &&
        !workStyleButtonRef.current.contains(event.target as Node) &&
        !workStyleDropdownRef.current.contains(event.target as Node)
      ) {
        setIsWorkStyleDropdownOpen(false);
      }
    };

    if (isWorkStyleDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isWorkStyleDropdownOpen]);

  // Handle click outside location dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isLocationDropdownOpen &&
        locationInputRef.current &&
        locationDropdownRef.current &&
        !locationInputRef.current.contains(event.target as Node) &&
        !locationDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLocationDropdownOpen(false);
      }
    };

    if (isLocationDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLocationDropdownOpen]);

  // Handle location dropdown positioning
  useEffect(() => {
    if (isLocationDropdownOpen && locationInputRef.current) {
      const inputRect = locationInputRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 160; // max-h-40 = 160px
      const mobileNavHeight = 80; // Mobile navigation height
      const spaceBelow = viewportHeight - inputRect.bottom - mobileNavHeight;
      
      if (spaceBelow < dropdownHeight) {
        setOpenLocationUpwards(true);
      } else {
        setOpenLocationUpwards(false);
      }
    } else {
      setOpenLocationUpwards(false);
    }
  }, [isLocationDropdownOpen]);

  const removeLocation = (location: string) => {
    setTempLocations(tempLocations.filter(loc => loc !== location));
  };

  const removeRole = (role: string) => {
    searchDetails.roles = searchDetails.roles.filter(r => r !== role);
  };

  const removeJobBoard = (jobBoard: string) => {
    searchDetails.jobBoards = searchDetails.jobBoards.filter(jb => jb !== jobBoard);
  };

  const getDisplayLocation = () => {
    if (searchDetails.locations.length > 1) {
      return 'Multiple locations';
    }
    return searchDetails.locations[0] || location;
  };

  return (
    <div className={`bg-dark-card/70 backdrop-blur-sm rounded-lg shadow-glow-card border border-dark-border hover:shadow-glow-card-hover hover:border-primary/20 transition-all duration-300 ${(isWorkStyleDropdownOpen || isLocationDropdownOpen) ? 'relative z-20' : ''}`}>
      {/* Main Card Content */}
      <div className="p-4 sm:p-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          {/* Left Section - Icon and Content */}
          <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-gray-200 mb-2 break-words">
                {title}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{getDisplayLocation()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">{createdDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Action Button */}
          <div className="flex-shrink-0 w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-primary/80 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ease-in-out shadow-glow-primary text-sm sm:text-base">
              See latest jobs
            </button>
          </div>
        </div>

        {/* View Details Toggle */}
        <div className="pt-4 border-t border-dark-border">
          <button
            onClick={toggleExpanded}
            className="flex items-center justify-between w-full text-left text-primary hover:text-primary/80 font-medium text-sm transition-all duration-200 ease-in-out hover:scale-[1.02] focus:scale-[1.02] focus:outline-none rounded-md py-2 pl-2 pr-1"
          >
            <span>View Details</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 transition-transform duration-200" />
            ) : (
              <ChevronDown className="w-4 h-4 transition-transform duration-200" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Details Section */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-dark-border/50">
          <div className="pt-4 space-y-4">
            {/* Roles */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Roles</h4>
              <div className="flex flex-wrap gap-2">
                {searchDetails.roles.map((role, index) => (
                  <div
                    key={index}
                    className="flex items-center px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium group"
                  >
                    <span>{role}</span>
                    <button
                      onClick={() => removeRole(role)}
                      className="ml-2 opacity-0 group-hover:opacity-100 hover:text-primary/80 transition-opacity duration-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Boards */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Job Boards</h4>
              <div className="flex flex-wrap gap-2">
                {searchDetails.jobBoards.map((jobBoard, index) => (
                  <div
                    key={index}
                    className="flex items-center px-3 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-medium group"
                  >
                    <span>{jobBoard}</span>
                    <button
                      onClick={() => removeJobBoard(jobBoard)}
                      className="ml-2 opacity-0 group-hover:opacity-100 hover:text-secondary/80 transition-opacity duration-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Salary Range */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-300">Salary Range</h4>
                {!editingSalary && (
                  <button
                    onClick={() => setEditingSalary(true)}
                    className="text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>
              {editingSalary ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tempSalary}
                    onChange={(e) => setTempSalary(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-900/50 border border-dark-border rounded-lg text-gray-200 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., $120k - $180k"
                  />
                  <button
                    onClick={handleSalarySave}
                    className="text-green-400 hover:text-green-300 transition-colors duration-200"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleSalaryCancel}
                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-400">{searchDetails.salary}</p>
              )}
            </div>

            {/* Work Style */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-300">Work Style</h4>
                {!editingWorkStyle && (
                  <button
                    onClick={() => setEditingWorkStyle(true)}
                    className="text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>
              {editingWorkStyle ? (
                <div className="space-y-3">
                  <div className="relative">
                    <button
                      ref={workStyleButtonRef}
                      type="button"
                      onClick={() => setIsWorkStyleDropdownOpen(!isWorkStyleDropdownOpen)}
                      className="w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out hover:opacity-80 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-between text-gray-300 bg-gray-500/20"
                    >
                      <span>{tempWorkStyle}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isWorkStyleDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isWorkStyleDropdownOpen && (
                      <div 
                        ref={workStyleDropdownRef}
                        className={`absolute left-0 w-48 bg-dark-card border border-dark-border rounded-lg shadow-xl z-[100] ${
                          openWorkStyleUpwards ? 'bottom-full mb-2' : 'top-full mt-2'
                        }`}
                      >
                        {workStyleOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setTempWorkStyle(option);
                              setIsWorkStyleDropdownOpen(false);
                              searchDetails.remote = option;
                              setEditingWorkStyle(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-800/50 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ease-in-out first:rounded-t-lg last:rounded-b-lg ${
                              option === tempWorkStyle ? 'bg-primary/20 text-primary' : 'text-gray-300'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-400">{searchDetails.remote}</p>
              )}
            </div>

            {/* Locations */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-300">Location(s)</h4>
                {!editingLocations && (
                  <button
                    onClick={() => setEditingLocations(true)}
                    className="text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>
              {editingLocations ? (
                <div className="space-y-3">
                  {/* Selected Locations */}
                  {tempLocations.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tempLocations.map((loc, index) => (
                        <div
                          key={index}
                          className="flex items-center px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium"
                        >
                          <span>{loc}</span>
                          <button
                            onClick={() => removeLocation(loc)}
                            className="ml-2 hover:text-primary/80 transition-colors duration-200"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Location Search */}
                  <div className="relative">
                    <input
                      ref={locationInputRef}
                      type="text"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      onFocus={() => setIsLocationDropdownOpen(true)}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-dark-border rounded-lg text-gray-200 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Search and select locations..."
                    />
                    
                    {/* Location Dropdown */}
                    {isLocationDropdownOpen && locationFilter && filteredLocations.length > 0 && (
                      <div 
                        ref={locationDropdownRef}
                        className={`absolute left-0 right-0 w-full bg-dark-card border border-dark-border rounded-lg shadow-xl z-[100] max-h-40 overflow-y-auto ${
                          openLocationUpwards ? 'bottom-full mb-2' : 'top-full mt-2'
                        }`}
                      >
                        {filteredLocations.map((loc) => (
                          <button
                            key={loc}
                            onClick={() => {
                              addLocation(loc);
                              setIsLocationDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-primary transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleLocationsSave}
                      className="text-green-400 hover:text-green-300 transition-colors duration-200"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleLocationsCancel}
                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {searchDetails.locations.map((loc, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs font-medium"
                    >
                      {loc}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;