import React from 'react';
import { Search, Calendar, MapPin, Filter } from 'lucide-react';

const Searches: React.FC = () => {
  const searches = [
    {
      id: 1,
      query: 'React Frontend Developer',
      location: 'San Francisco Bay Area',
      results: 47,
      createdDate: '2 days ago',
      status: 'Active',
    },
    {
      id: 2,
      query: 'Full Stack JavaScript',
      location: 'Remote',
      results: 124,
      createdDate: '1 week ago',
      status: 'Completed',
    },
    {
      id: 3,
      query: 'Senior React Native Developer',
      location: 'New York',
      results: 23,
      createdDate: '2 weeks ago',
      status: 'Archived',
    },
  ];

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="w-full sm:w-auto text-left flex items-center">
          {/* Logo */}
          <img 
            src="/src/assets/headhunterlogo.png" 
            alt="Jobe Logo" 
            className="h-16 w-auto object-contain mr-4"
            onError={(e) => {
              // Hide logo if it fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
          
          {/* Header Text */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-200 mb-2">Saved Searches</h1>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-400">See latest jobs by running a search</p>
          </div>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/80 transition-colors duration-200 flex items-center space-x-2 shadow-lg">
        </button>
      </div>

      <div className="grid gap-6">
        {searches.map((search) => (
          <div key={search.id} className="bg-dark-card/70 backdrop-blur-sm rounded-lg p-6 shadow-glow-card border border-dark-border hover:shadow-glow-card-hover hover:border-primary/20 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-200 mb-1">{search.query}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{search.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{search.createdDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                search.status === 'Active' ? 'text-secondary bg-secondary/20' :
                search.status === 'Completed' ? 'text-primary bg-primary/20' : 'text-gray-300 bg-gray-500/20'
              }`}>
                {search.status}
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-dark-border">
              <div className="text-sm text-gray-400">
                <span className="font-medium text-gray-200">{search.results}</span> jobs found
              </div>
              <div className="flex space-x-3">
                <button className="text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200">
                </button>
                <button className="text-primary hover:text-primary/80 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium text-sm transition-all duration-200 ease-in-out">
                  View Results
                </button>
                <button className="text-gray-400 hover:text-gray-300 font-medium text-sm transition-colors duration-200">
                </button>
                <button className="text-gray-400 hover:text-gray-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500/50 font-medium text-sm transition-all duration-200 ease-in-out">
                  Run Again
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Searches;