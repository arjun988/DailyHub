import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const Navbar = ({ onToggleTheme, isDark }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1
              className={`text-2xl font-bold transition-all duration-300 ${
                isScrolled
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                  : 'bg-gradient-to-r from-blue-400 to-purple-500'
              } bg-clip-text text-transparent hover:scale-105 transform`}
            >
              DailyHub
            </h1>
          </div>

          {/* Theme Toggle Button */}
          <div className="flex items-center space-x-8">
            <button
              onClick={onToggleTheme}
              className="relative group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-yellow-500 transition-colors" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition-colors" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
