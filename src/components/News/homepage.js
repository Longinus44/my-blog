import React, { useEffect, useState, useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image from '../images/latestnews.jpg';
import image1 from '../images/news.jpg';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Stack,
  CircularProgress,
  Container
} from '@mui/material';
import { NewsContext } from '../Context/newscontext';

const sliderImages = [image, image1];

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setNews(response.data.articles.slice(0, 6)); // Limit to 6 articles
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Failed to fetch news", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [setArticles]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500
  };

  return (
    <Container maxWidth="lg">
      {/* Hero Slider */}
      <Box sx={{ my: 4 }}>
        <Slider {...sliderSettings}>
          {sliderImages.map((img, index) => (
            <Box key={index} sx={{ height: 400, overflow: 'hidden', borderRadius: '10px' }}>
              <img
                src={img}
                alt={`slide-${index}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* News Section */}
      <Box>
        <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
          Latest Headlines
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
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
                    <Typography variant="h6" component="div" gutterBottom>
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
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
