import React, { useState } from 'react';
import { Plus, Search, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import ApplicationCard from '../components/ApplicationCard';
import AddApplicationForm from '../components/AddApplicationForm';

const Applications: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [applications, setApplications] = useState([
    {
      id: 1,
      company_name: 'TechCorp Inc.',
      job_title: 'Senior Frontend Developer',
      work_location: 'San Francisco, CA',
      posting_date: '2024-01-15',
      job_description: 'We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing web applications using modern JavaScript frameworks like React, Vue, or Angular. The ideal candidate should have strong experience in HTML5, CSS3, JavaScript ES6+, and responsive design principles. You will collaborate with our design and backend teams to create seamless user experiences.',
      application_date: '2024-01-18',
      current_status: 'Interviewing' as const,
    },
    {
      id: 2,
      company_name: 'StartupXYZ',
      job_title: 'React Developer',
      work_location: 'Remote',
      posting_date: '2024-01-10',
      job_description: 'Join our fast-growing startup as a React Developer! We need someone passionate about building scalable web applications with React, Redux, and TypeScript. You will work on cutting-edge projects and have the opportunity to shape our technical architecture. Experience with Node.js and GraphQL is a plus.',
      application_date: '2024-01-12',
      current_status: 'Applied' as const,
    },
    {
      id: 3,
      company_name: 'MegaCorp',
      job_title: 'Full Stack Engineer',
      work_location: 'New York, NY',
      posting_date: '2024-01-05',
      job_description: 'MegaCorp is seeking a Full Stack Engineer to work on enterprise-level applications. You will be working with both frontend and backend technologies including React, Node.js, Python, and various databases. Strong problem-solving skills and experience with cloud platforms like AWS or Azure are required.',
      application_date: '2024-01-08',
      current_status: 'Rejected' as const,
    },
  ]);

  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const handleStatusUpdate = (id: number, newStatus: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id 
          ? { ...app, current_status: newStatus as any }
          : app
      )
    );
  };

  const handleDelete = (id: number) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const handleToggleDropdown = (id: number | null) => {
    setOpenDropdownId(id);
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Briefcase className="w-12 h-12 text-gray-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-200 mb-4">Start Searching!</h3>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        Click the button below to get Jobe to find the perfect job opportunities for you.
      </p>
      <Link
        to="/new-search"
        className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/80 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ease-in-out shadow-glow-primary"
      >
        <Search className="w-5 h-5" />
        <span>Create New Search</span>
      </Link>
    </div>
  );

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
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-200 mb-2">Application Tracker</h1>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-400">Track & update your job application status.</p>
          </div>
        </div>
        <button 
          onClick={handleShowAddForm}
          className="w-full sm:w-auto mt-6 sm:mt-0 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/80 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ease-in-out flex items-center justify-center space-x-2 shadow-glow-primary text-base"
        >
          <Plus className="w-5 h-5" />
          <span>Add Manually</span>
        </button>
      </div>

      {/* Add Application Form */}
      {showAddForm && (
        <AddApplicationForm
          onSave={handleCloseAddForm}
          onCancel={handleCloseAddForm}
        />
      )}

      {applications.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 grid-cols-1">
          {applications.map((app) => (
            <ApplicationCard
              key={app.id}
              {...app}
              isDropdownOpen={app.id === openDropdownId}
              onStatusUpdate={handleStatusUpdate}
              onDelete={handleDelete}
              onToggleDropdown={handleToggleDropdown}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;