import React from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { NewsContext } from '../Context/newscontext';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const ArticleDetail = () => {
  const { id } = useParams();
  const { news } = useContext(NewsContext);
  const article = news[id];
  console.log(article);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        {article.urlToImage && (
          <CardMedia
            component="img"
            height="300"
            image={article.urlToImage}
            alt={article.title}
          />
        )}
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            {article.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {article.description}
          </Typography>
          <Typography variant="body2" paragraph>
            {article.content}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Source: {article.source.name}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ArticleDetail;
