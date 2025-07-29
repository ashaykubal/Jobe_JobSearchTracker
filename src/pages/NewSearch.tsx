import React from 'react';
import { Send, Bot } from 'lucide-react';

const NewSearch: React.FC = () => {
  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center mb-8">
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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-200 mb-2">New Job Search</h1>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-400">Let Jobe find the perfect job opportunities for you</p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-dark-card/70 backdrop-blur-sm rounded-lg shadow-glow-card border border-dark-border">
        {/* Chat Header */}
        <div className="border-b border-dark-border p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <img 
                src="/src/assets/headhunterlogo.png" 
                alt="Jobe Logo" 
                className="w-6 h-6 object-contain"
                style={{ filter: 'brightness(0) saturate(100%) invert(64%) sepia(98%) saturate(7151%) hue-rotate(258deg) brightness(102%) contrast(96%)' }}
                onError={(e) => {
                  // Fallback to Bot icon if logo fails to load
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.innerHTML = '<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>';
                  e.currentTarget.parentNode?.appendChild(fallback.firstChild!);
                }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-200">Jobe</h3>
              <p className="text-sm text-gray-400">Online</p>
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
          {/* Bot Message */}
          <div className="flex items-start space-x-3 mb-6">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <img 
                src="/src/assets/headhunterlogo.png" 
                alt="Jobe Logo" 
                className="w-5 h-5 object-contain"
                style={{ filter: 'brightness(0) saturate(100%) invert(64%) sepia(98%) saturate(7151%) hue-rotate(258deg) brightness(102%) contrast(96%)' }}
                onError={(e) => {
                  // Fallback to Bot icon if logo fails to load
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.innerHTML = '<svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>';
                  e.currentTarget.parentNode?.appendChild(fallback.firstChild!);
                }}
              />
            </div>
            <div className="flex-1">
              <div className="bg-gray-800/50 rounded-lg rounded-tl-none p-4 max-w-md">
                <p className="text-gray-200">Welcome! What kind of role are you looking for?</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">Just now</p>
            </div>
          </div>
        </div>

        {/* Chat Input Area */}
        <div className="border-t border-dark-border p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-4 py-3 bg-gray-900/50 border border-dark-border rounded-lg text-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent focus:scale-105 hover:border-primary/50 transition-all duration-200 ease-in-out resize-none"
              />
            </div>
            <button className="bg-primary text-white p-3 rounded-lg font-medium hover:bg-primary/80 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ease-in-out flex items-center justify-center shadow-glow-primary">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSearch;