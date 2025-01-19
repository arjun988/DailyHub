import React, { useState, useEffect } from 'react';
import { Newspaper, Briefcase, Heart, Music, Trophy, Search,  ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchNews, fetchNewsBySearch } from '../utils/api';
import NewsCard from '../components/NewsCard';

const categories = [
    { id: 'business', icon: Briefcase, label: 'Business', color: 'from-purple-500 to-pink-400' },
    { id: 'technology', icon: Newspaper, label: 'Technology', color: 'from-blue-500 to-cyan-400' },
  { id: 'sports', icon: Trophy, label: 'Sports', color: 'from-green-500 to-emerald-400' },
  { id: 'entertainment', icon: Heart, label: 'Entertainment', color: 'from-red-500 to-rose-400' },
  { id: 'music', icon: Music, label: 'Music', color: 'from-yellow-500 to-amber-400' },
];

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('technology');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(9);
  const [likedArticles, setLikedArticles] = useState(new Set());

  const loadNews = async () => {
    setLoading(true);
    const data = await fetchNews(category);
    setArticles(data);
    setLoading(false);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;
    setLoading(true);
    const data = await fetchNewsBySearch(searchQuery);
    setArticles(data);
    setLoading(false);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleLike = (articleId) => {
    setLikedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    loadNews();
  }, [category]);

  // Pagination logic
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const currentArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageNumbers = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return [...Array(endPage - startPage + 1)].map((_, idx) => {
      const pageNumber = startPage + idx;
      return (
        <button
          key={pageNumber}
          onClick={() => paginate(pageNumber)}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            currentPage === pageNumber
              ? 'bg-blue-500 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750'
          }`}
        >
          {pageNumber}
        </button>
      );
    });
  };

  return (
    <div className="pt-24 px-4 md:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 max-w-md group">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 
                         border border-gray-200 dark:border-gray-700
                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                         focus:border-transparent outline-none transition-all duration-300
                         text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                         group-hover:shadow-lg"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 
                        cursor-pointer group-hover:text-blue-500 transition-colors duration-300"
              onClick={handleSearch}
            />
          </div>

          
        </div>

        {/* Categories */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 min-w-max p-1">
            {categories.map(({ id, icon: Icon, label, color }) => (
              <button
                key={id}
                onClick={() => setCategory(id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl
                  transition-all duration-500 transform hover:scale-105
                  ${category === id
                    ? `bg-gradient-to-r ${color} text-white shadow-lg`
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                  }`}
              >
                <Icon className={`w-5 h-5 ${category === id ? 'animate-bounce' : ''}`} />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="animate-pulse">
                <div className="rounded-2xl overflow-hidden">
                  <div className="bg-gray-200 dark:bg-gray-700 h-56"></div>
                  <div className="p-6 bg-white dark:bg-gray-800 space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-1/4"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-xl w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentArticles.map((article, index) => (
                <NewsCard
                  key={index}
                  article={article}
                  onBookmark={() => console.log('Bookmarked:', article.title)}
                  isLiked={likedArticles.has(article.url)}
                  onLike={() => handleLike(article.url)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 mb-8 flex justify-center items-center space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 
                           dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed
                           hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {renderPageNumbers()}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 
                           dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed
                           hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
