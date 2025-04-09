import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import { NewsContext } from '../Context/newscontext';

const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setArticles } = useContext(NewsContext);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            apiKey: "d2e3656947c24fa68bf80ffe970b1460"
          }
        });
        setNews(response.data.articles);
        setArticles(response.data.articles);
      } catch (error) {
        setError('Error fetching news');
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [setArticles]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Stack
        direction="row"
        spacing={3}
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
      >
        {news.map((article) => (
          <Box
            key={article.url}
            component="a"
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
            sx={{
              width: {
                xs: '100%',
                sm: '48%',
                md: '30%',
              },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {article.urlToImage && (
                <CardMedia
                  component="img"
                  sx={{ height: 200, objectFit: 'cover' }}
                  image={article.urlToImage}
                  alt={article.title}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom color="text.primary">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default LatestNews;










// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { List, ListItem, ListItemText } from '@mui/material';

// const LatestNews = () => {
//   const [news, setNews] = useState([]);

//   useEffect(() => {
//     const fetchNews = async () => {
//       const response = await axios.get('https://newsapi.org/v2/top-headlines', {
//         params: {
//           country: 'us',
//           apiKey: 'd2e3656947c24fa68bf80ffe970b1460'
//         }
//       });
//       setNews(response.data.articles);
//     };
//     fetchNews();
//   }, []);

//   return (
//     <List>
//       {news.map((article, index) => (
//         <ListItem key={index}>
//           <ListItemText primary={article.title} secondary={article.description} />
//         </ListItem>
//       ))}
//     </List>
//   );
// };

// export default LatestNews;
