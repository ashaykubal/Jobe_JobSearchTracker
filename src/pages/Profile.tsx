import React from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Award, Edit3 } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-200 mb-2">Profile</h1>
        <p className="text-xl text-gray-400">Manage your career information</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-dark-card/70 backdrop-blur-sm rounded-lg shadow-glow-card border border-dark-border p-6 text-center">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-200 mb-2">John Doe</h2>
            <p className="text-gray-400 mb-4">Frontend Developer</p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>john.doe@email.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/80 transition-colors duration-200 flex items-center justify-center space-x-2 shadow-glow-primary">
            </button>
            <button className="w-full mt-6 bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/80 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ease-in-out flex items-center justify-center space-x-2 shadow-glow-primary">
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Experience */}
          <div className="bg-dark-card/70 backdrop-blur-sm rounded-lg shadow-glow-card border border-dark-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-200 flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <span>Experience</span>
              </h3>
              <button className="text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200">
              </button>
              <button className="text-primary hover:text-primary/80 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium text-sm transition-all duration-200 ease-in-out">
                Add Experience
              </button>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: 'Senior Frontend Developer',
                  company: 'TechCorp Inc.',
                  period: '2022 - Present',
                  description: 'Leading frontend development for web applications using React, TypeScript, and modern web technologies.',
                },
                {
                  title: 'Frontend Developer',
                  company: 'StartupXYZ',
                  period: '2020 - 2022',
                  description: 'Developed responsive web applications and implemented user interfaces for various client projects.',
                },
              ].map((exp, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold text-gray-200">{exp.title}</h4>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                  <p className="text-gray-400">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-dark-card/70 backdrop-blur-sm rounded-lg shadow-glow-card border border-dark-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-200 flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Skills</span>
              </h3>
              <button className="text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200">
              </button>
              <button className="text-primary hover:text-primary/80 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium text-sm transition-all duration-200 ease-in-out">
                Edit Skills
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                'React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Node.js',
                'Tailwind CSS', 'Git', 'REST APIs', 'GraphQL', 'Redux'
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Resume */}
          <div className="bg-dark-card/70 backdrop-blur-sm rounded-lg shadow-glow-card border border-dark-border p-6">
            <h3 className="text-xl font-bold text-gray-200 mb-4">Resume</h3>
            <div className="border-2 border-dashed border-dark-border rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-gray-400 mb-4">Upload your resume to improve AI job matching</p>
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/80 transition-colors duration-200 shadow-glow-primary">
              </button>
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/80 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ease-in-out shadow-glow-primary">
                Upload Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;