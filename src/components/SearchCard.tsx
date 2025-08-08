import React, { useState } from 'react';
import { Search, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface SearchDetails {
  keywords: string[];
  experience: string;
  salary: string;
  jobType: string;
  remote: string;
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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-dark-card/70 backdrop-blur-sm rounded-lg shadow-glow-card border border-dark-border hover:shadow-glow-card-hover hover:border-primary/20 transition-all duration-300">
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
                  <span className="truncate">{location}</span>
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
            className="flex items-center justify-between w-full text-left text-primary hover:text-primary/80 font-medium text-sm transition-all duration-200 ease-in-out hover:scale-[1.02] focus:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md p-2 -m-2"
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
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-dark-border/50">
          <div className="pt-4 space-y-4">
            {/* Keywords */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {searchDetails.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Search Criteria Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-1">Experience Level</h4>
                <p className="text-sm text-gray-400">{searchDetails.experience}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-1">Salary Range</h4>
                <p className="text-sm text-gray-400">{searchDetails.salary}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-1">Job Type</h4>
                <p className="text-sm text-gray-400">{searchDetails.jobType}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-1">Work Style</h4>
                <p className="text-sm text-gray-400">{searchDetails.remote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;