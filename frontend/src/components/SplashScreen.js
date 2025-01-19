import React from 'react';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-700 
                    dark:from-gray-900 dark:to-blue-900 flex items-center 
                    justify-center overflow-hidden">
      <div className="relative">
        {/* Background Circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 bg-white/10 rounded-full animate-pulse" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 bg-white/10 rounded-full animate-pulse 
                         [animation-delay:200ms]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-white/10 rounded-full animate-pulse 
                         [animation-delay:400ms]" />
        </div>

        {/* Content */}
        <div className="relative text-center z-10">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fadeIn">
            Daily<span className="text-blue-300">Hub</span>
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-300 rounded-full animate-bounce 
                           [animation-delay:0ms]" />
            <div className="w-3 h-3 bg-blue-300 rounded-full animate-bounce 
                           [animation-delay:150ms]" />
            <div className="w-3 h-3 bg-blue-300 rounded-full animate-bounce 
                           [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;