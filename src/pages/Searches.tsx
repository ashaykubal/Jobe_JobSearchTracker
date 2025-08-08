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
        keywords: ['React', 'Frontend', 'JavaScript', 'TypeScript'],
        experience: 'Senior Level',
        salary: '$120k - $180k',
        jobType: 'Full-time',
        remote: 'Hybrid'
      }
    },
    {
      id: 2,
      title: 'Product Manager',
      location: 'Remote',
      createdDate: '1 week ago',
      searchDetails: {
        keywords: ['Product Management', 'Strategy', 'Analytics'],
        experience: 'Mid to Senior Level',
        salary: '$100k - $160k',
        jobType: 'Full-time',
        remote: 'Remote'
      }
    },
    {
      id: 3,
      title: 'Chief Product Officer',
      location: 'New York',
      createdDate: '2 weeks ago',
      searchDetails: {
        keywords: ['CPO', 'Product Strategy', 'Leadership', 'Vision'],
        experience: 'Executive Level',
        salary: '$200k - $350k',
        jobType: 'Full-time',
        remote: 'On-site'
      }
    },
    {
      id: 4,
      title: 'Java Data Engineer',
      location: 'Austin, TX',
      createdDate: '3 weeks ago',
      searchDetails: {
        keywords: ['Java', 'Data Engineering', 'ETL', 'Big Data'],
        experience: 'Senior Level',
        salary: '$130k - $190k',
        jobType: 'Full-time',
        remote: 'Hybrid'
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
          <div key={search.id} className="bg-dark-card/70 backdrop-blur-sm rounded-lg p-6 shadow-glow-card border border-dark-border hover:shadow-glow-card-hover hover:border-primary/20 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
          <SearchCard key={search.id} {...search} />
        ))}
      </div>
    </div>
  );
};

export default Searches;