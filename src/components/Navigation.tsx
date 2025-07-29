import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart3, Bookmark, Search, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navigation: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { to: '/applications', icon: Home, label: 'Applications' },
    { to: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { to: '/searches', icon: Bookmark, label: 'Searches' },
  ];

  return (
    <>
      {/* Desktop Navigation - Floating Vertical Toolbar */}
      <div className="hidden lg:flex fixed left-6 top-1/2 transform -translate-y-1/2 z-50 bg-dark-card/70 backdrop-blur-md rounded-2xl shadow-glow-card border border-dark-border p-4 flex-col items-center w-20 gap-6">
        {/* Middle Section - Navigation Items and New Search */}
        <div className="flex flex-col items-center gap-4 flex-1">
          {/* Navigation Items */}
          <nav className="flex flex-col gap-4">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `group relative p-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-white shadow-glow-primary transform scale-105'
                      : 'text-gray-400 hover:text-primary hover:bg-primary/10 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50'
                  }`
                }
              >
                <Icon className="w-6 h-6 transition-transform duration-200 ease-in-out group-hover:scale-110" />
                
                {/* Tooltip */}
                <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out pointer-events-none whitespace-nowrap shadow-xl translate-x-2 group-hover:translate-x-0">
                  {label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </NavLink>
            ))}
          </nav>

          {/* New Search Button */}
          <NavLink
            to="/new-search"
            className={({ isActive }) =>
              `group relative p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-white shadow-glow-primary transform scale-105'
                  : 'text-gray-400 hover:text-primary hover:bg-primary/10 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50'
              }`
            }
          >
            <Search className="w-6 h-6 transition-transform duration-200 ease-in-out group-hover:scale-110" />
            
            {/* Tooltip */}
            <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out pointer-events-none whitespace-nowrap shadow-xl translate-x-2 group-hover:translate-x-0">
              New Search
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          </NavLink>
        </div>

        {/* Bottom Section - Theme Toggle and User Avatar */}
        <div className="flex flex-col items-center gap-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="group relative p-3 rounded-xl text-gray-400 hover:text-primary hover:bg-primary/10 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ease-in-out"
          >
            {isDark ? <Sun className="w-6 h-6 transition-transform duration-200 ease-in-out group-hover:scale-110 group-hover:rotate-12" /> : <Moon className="w-6 h-6 transition-transform duration-200 ease-in-out group-hover:scale-110 group-hover:-rotate-12" />}
            
            {/* Tooltip */}
            <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out pointer-events-none whitespace-nowrap shadow-xl translate-x-2 group-hover:translate-x-0">
              {isDark ? 'Light Mode' : 'Dark Mode'}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          </button>

          {/* User Avatar */}
          <NavLink
            to="/profile"
            className="group relative w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center hover:ring-4 hover:ring-primary/20 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all duration-200 ease-in-out"
          >
            <User className="w-6 h-6 text-gray-400 transition-transform duration-200 ease-in-out group-hover:scale-110" />
            
            {/* Tooltip */}
            <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out pointer-events-none whitespace-nowrap shadow-xl translate-x-2 group-hover:translate-x-0">
              Profile
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          </NavLink>
        </div>
      </div>

      {/* Mobile Navigation - Bottom Floating Toolbar */}
      <div className="lg:hidden fixed bottom-6 left-4 right-4 z-50 bg-dark-card/70 backdrop-blur-md rounded-2xl shadow-glow-card border border-dark-border py-3 px-4">
        <div className="flex items-center justify-between w-full">
          {/* Navigation Items */}
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-primary transform scale-110'
                    : 'text-gray-400 hover:text-primary hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50'
                }`
              }
            >
              <Icon className="w-6 h-6 transition-transform duration-200 ease-in-out" />
            </NavLink>
          ))}

          {/* New Search Button */}
          <NavLink
            to="/new-search"
            className={({ isActive }) =>
              `flex items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-primary transform scale-110'
                  : 'text-gray-400 hover:text-primary hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50'
              }`
            }
          >
            <Search className="w-6 h-6 transition-transform duration-200 ease-in-out" />
          </NavLink>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-3 rounded-lg transition-all duration-200 ease-in-out text-gray-400 hover:text-primary hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {isDark ? <Sun className="w-6 h-6 transition-transform duration-200 ease-in-out hover:rotate-12" /> : <Moon className="w-6 h-6 transition-transform duration-200 ease-in-out hover:-rotate-12" />}
          </button>

          {/* User Avatar */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-primary transform scale-110'
                  : 'text-gray-400 hover:text-primary hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50'
              }`
            }
          >
            <div className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center">
              <User className="w-5 h-5 transition-transform duration-200 ease-in-out" />
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navigation;