import React, { useState } from 'react';
import { Bookmark, ExternalLink, Clock, User } from 'lucide-react';

const NewsCard = ({ article, onBookmark }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(article);
  };

  return (
    <div
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transform transition-all duration-500 
                 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]
                 dark:hover:shadow-[0_20px_50px_rgba(59,_130,_246,_0.5)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={article.urlToImage || '/api/placeholder/400/300'}
          alt={article.title}
          className="w-full h-56 object-cover transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1.01)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Tag */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full
                      transform -translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                      transition-all duration-300 delay-100">
          <span className="text-white text-sm font-medium">{article.category || 'News'}</span>
        </div>
        
        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm
                     transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                     transition-all duration-300 delay-150
                     ${isBookmarked ? 'bg-blue-500 text-white' : 'bg-white/30 text-white hover:bg-white/40'}`}
        >
          <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>{article.author?.split(',')[0] || 'Unknown'}</span>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2
                       group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {article.title}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 leading-relaxed">
          {article.description}
        </p>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30
                       text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50
                       transition-all duration-300"
          >
            <span>Read Article</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {article.source?.name || 'News Source'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;