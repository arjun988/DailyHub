import axios from "axios";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

export const fetchNews = async (category) => {
  const URL = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${API_KEY}`;
  const response = await axios.get(URL);
  return response.data.articles;
};

export const fetchNewsBySearch = async (query) => {
  const URL = `https://gnews.io/api/v4/search?q=${query}&lang=en&country=us&max=10&apikey=${API_KEY}`;
  const response = await axios.get(URL);
  return response.data.articles;
};
