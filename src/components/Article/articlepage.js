import React from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ArticleContext } from '../Context/articlecontext';

const ArticlePage = () => {
  const { id } = useParams();
  const { articles } = useContext(ArticleContext);
  const article = articles.find(article => article.id === id);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};


export default ArticlePage;
