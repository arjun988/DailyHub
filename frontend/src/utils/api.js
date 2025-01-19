import axios from "axios";

export const fetchNews = async (category) => {
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const URL = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${API_KEY}`;
  const response = await axios.get(URL);
  return response.data.articles;
};

export const fetchNewsBySearch = async (query) => {
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const URL = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;
  const response = await axios.get(URL);
  return response.data.articles;
};
