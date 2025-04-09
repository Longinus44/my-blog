import React, { createContext, useState } from 'react';

export const NewsContext = createContext();

export const NewsArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  return (
    <NewsContext.Provider value={{ articles, setArticles }}>
      {children}
    </NewsContext.Provider>
  );
};
