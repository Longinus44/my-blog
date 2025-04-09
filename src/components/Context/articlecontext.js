import React, { createContext, useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const querySnapshot = await getDocs(collection(db, 'articles'));
      const articlesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setArticles(articlesData);
    };
    fetchArticles();
  }, []);

  return (
    <ArticleContext.Provider value={{ articles }}>
      {children}
    </ArticleContext.Provider>
  );
};
