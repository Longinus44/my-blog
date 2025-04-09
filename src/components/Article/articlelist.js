import React, { useContext } from 'react';
import { ArticleContext } from '../Context/articlecontext';
import { List, ListItem, ListItemText } from '@mui/material';

const ArticleList = () => {
  const { articles } = useContext(ArticleContext);

  return (
    <List>
      {articles.map((article) => (
        <ListItem key={article.id}>
          <ListItemText primary={article.title} secondary={article.summary} />
        </ListItem>
      ))}
    </List>
  );
};

export default ArticleList;
