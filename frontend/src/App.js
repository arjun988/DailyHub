import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }

    // Simulate loading and add smooth transition
    setTimeout(() => {
      setLoading(false);
      // Small delay before showing content for smooth transition
      setTimeout(() => setPageReady(true), 100);
    }, 2000);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div
        className={`flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 
                    transition-opacity duration-500 
                    ${pageReady ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Navbar */}
        <Navbar onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />

        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<NewsPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="py-4 text-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
          © 2025 NewsApp. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;
