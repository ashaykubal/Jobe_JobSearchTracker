import React from 'react';
import { Search, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import SearchCard from '../components/SearchCard';

const Searches: React.FC = () => {
  const searches = [
    {
      id: 1,
      title: 'React Frontend Developer',
      location: 'San Francisco Bay Area',
      createdDate: '2 days ago',
      searchDetails: {
        roles: ['React Frontend Developer', 'Senior Frontend Developer'],
        jobBoards: ['indeed.com', 'linkedin.com', 'glassdoor.com'],
        salary: '$120k - $180k',
        remote: 'Hybrid',
        locations: ['San Francisco Bay Area']
      }
    },
    {
      id: 2,
      title: 'Product Manager',
      location: 'Remote',
      createdDate: '1 week ago',
      searchDetails: {
        roles: ['Product Manager', 'Senior Product Manager'],
        jobBoards: ['linkedin.com', 'ashby.com', 'lever.co'],
        salary: '$100k - $160k',
        remote: 'Fully Remote',
        locations: ['Remote']
      }
    },
    {
      id: 3,
      title: 'Chief Product Officer',
      location: 'New York',
      createdDate: '2 weeks ago',
      searchDetails: {
        roles: ['Chief Product Officer', 'VP of Product'],
        jobBoards: ['linkedin.com', 'executive-search.com'],
        salary: '$200k - $350k',
        remote: 'In Person',
        locations: ['New York']
      }
    },
    {
      id: 4,
      title: 'Java Data Engineer',
      location: 'Austin, TX',
      createdDate: '3 weeks ago',
      searchDetails: {
        roles: ['Java Data Engineer', 'Senior Data Engineer'],
        jobBoards: ['indeed.com', 'dice.com', 'stackoverflow.com'],
        salary: '$130k - $190k',
        remote: 'Hybrid',
        locations: ['Austin, TX']
      }
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
          <SearchCard key={search.id} {...search} />
        ))}
      </div>
    </div>
  );
};

export default Searches;