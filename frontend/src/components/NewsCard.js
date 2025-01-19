import React, { useState } from 'react';
import { Bookmark, ExternalLink, Clock, User, ThumbsUp, ThumbsDown } from 'lucide-react';

const NewsCard = ({ article, onBookmark }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(article);
  };

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false); // Prevent both Like and Dislike being active
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false); // Prevent both Like and Dislike being active
  };

  return (
    <div
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transform transition-all duration-500 
                 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]
                 dark:hover:shadow-[0_20px_50px_rgba(59,_130,_246,_0.5)]"
    >
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

        {/* Title */}
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2
                       group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {article.title}
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 leading-relaxed">
          {article.description}
        </p>
        
        {/* Read Article Link */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30
                       text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50
                       transition-all duration-300 w-2/3 overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <span>Read Article</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {article.source?.name || 'News Source'}
          </span>
        </div>

        {/* Like/Dislike and Bookmark Buttons */}
        <div className="flex items-center space-x-4 mt-4">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`p-2 rounded-full ${liked ? 'bg-green-500 text-white' : 'bg-white/30 text-white hover:bg-white/40'}`}
          >
            <ThumbsUp className="w-5 h-5" />
          </button>

          {/* Dislike Button */}
          <button
            onClick={handleDislike}
            className={`p-2 rounded-full ${disliked ? 'bg-red-500 text-white' : 'bg-white/30 text-white hover:bg-white/40'}`}
          >
            <ThumbsDown className="w-5 h-5" />
          </button>

          {/* Bookmark Button */}
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full ${isBookmarked ? 'bg-blue-500 text-white' : 'bg-white/30 text-white hover:bg-white/40'}`}
          >
            <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
