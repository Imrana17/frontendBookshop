import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Container,
  Alert,
  Chip,
  Fade
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Bookmark,
  BookmarkBorder,
  CalendarToday,
  ArrowBack // Make sure this is imported
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import LoadingSpinner from '../components/LoadingSpinner'; // Import your loading spinner

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedArticles, setLikedArticles] = useState(new Set());
  const [collectedArticles, setCollectedArticles] = useState(new Set());
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Safe theme color fallbacks
  const primaryDark = theme.palette?.primary?.dark || '#0A2F0A';
  const primaryMain = theme.palette?.primary?.main || '#1B5E20';
  const primaryLight = theme.palette?.primary?.light || '#2E7D32';
  const secondaryMain = theme.palette?.secondary?.main || '#FFD700';
  const errorMain = theme.palette?.error?.main || '#FF6B6B';
  const successMain = theme.palette?.success?.main || '#50C878';

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://qwabs-book-api.onrender.com/api/articles/view');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Validate response data
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format: expected array');
        }
        
        setArticles(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Toggle like status
  const handleLikeToggle = (articleId, event) => {
    event.stopPropagation();
    setLikedArticles(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(articleId)) {
        newLiked.delete(articleId);
      } else {
        newLiked.add(articleId);
      }
      return newLiked;
    });
  };

  // Toggle collection status
  const handleCollectionToggle = (articleId, event) => {
    event.stopPropagation();
    setCollectedArticles(prev => {
      const newCollected = new Set(prev);
      if (newCollected.has(articleId)) {
        newCollected.delete(articleId);
      } else {
        newCollected.add(articleId);
      }
      return newCollected;
    });
  };

  // Navigate to article detail
  const handleArticleClick = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  // Format date with validation
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Date unavailable';
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate('/');
  };

  // Show loading spinner while fetching data
  if (loading) {
    return <LoadingSpinner message="Loading Articles..." />;
  }

  // Error state
  if (error) {
    return (
      <Container maxWidth="md" sx={{ 
        py: 4, 
        minHeight: '100vh', 
        background: `linear-gradient(135deg, ${primaryDark} 0%, ${primaryMain} 100%)` 
      }}>
        <Alert 
          severity="error" 
          sx={{ 
            borderRadius: 3,
            bgcolor: 'error.dark',
            color: 'white',
            '& .MuiAlert-icon': { color: secondaryMain }
          }}
        >
          <Typography variant="h6" gutterBottom>
            Failed to Load Articles
          </Typography>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: `linear-gradient(135deg, ${primaryDark} 0%, ${primaryMain} 100%)`,
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Back Button - Moved to top level */}
        <Container maxWidth="lg" sx={{ pb: 3 }}>
          <IconButton
            onClick={handleBack}
            sx={{
              color: secondaryMain,
              mb: 2,
              backgroundColor: `${secondaryMain}20`,
              borderRadius: 2,
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: `${secondaryMain}30`,
              },
              transition: 'all 0.3s ease'
            }}
          >
            <ArrowBack />
            <Typography variant="body1" sx={{ ml: 1, color: secondaryMain, fontWeight: 'bold' }}>
              Back to Home
            </Typography>
          </IconButton>
        </Container>

        <Fade in={true} timeout={800}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              color: secondaryMain,
              textAlign: 'center',
              mb: 6,
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontSize: { xs: '2.5rem', md: '3rem' }
            }}
          >
            Latest Articles
          </Typography>
        </Fade>

        <Grid container spacing={3}>
          {articles
            .filter(article => article && article.id !== undefined && article.title)
            .map((article, index) => (
            <Grid item xs={12} sm={6} lg={4} key={article.id}>
              <Fade in={true} timeout={800} style={{ transitionDelay: `${(index % 6) * 100}ms` }}>
                <Card
                  onClick={() => handleArticleClick(article.id)}
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer',
                    background: `linear-gradient(145deg, ${primaryMain} 0%, ${primaryDark} 100%)`,
                    border: `1px solid ${secondaryMain}20`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 16px 48px ${secondaryMain}40`,
                      border: `1px solid ${secondaryMain}50`,
                      background: `linear-gradient(145deg, ${primaryLight} 0%, ${primaryMain} 100%)`
                    }
                  }}
                >
                  {/* Article Image with fallback */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={article.image_url || '/fallback-image.jpg'}
                    alt={article.title || 'Article image'}
                    onError={(e) => {
                      e.target.src = '/fallback-image.jpg';
                    }}
                    sx={{
                      objectFit: 'cover',
                      borderBottom: `2px solid ${secondaryMain}`
                    }}
                  />

                  <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Article Title */}
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        mb: 2,
                        lineHeight: 1.3,
                        minHeight: '4.2em',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        flexGrow: 1
                      }}
                    >
                      {article.title || 'Untitled Article'}
                    </Typography>

                    {/* Article Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        mb: 3,
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '4.5em'
                      }}
                    >
                      {article.description || 'No description available.'}
                    </Typography>

                    {/* Date and Actions */}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      borderTop: `1px solid ${secondaryMain}30`,
                      pt: 2,
                      mt: 'auto'
                    }}>
                      {/* Date */}
                      <Chip
                        icon={<CalendarToday sx={{ fontSize: 16, color: secondaryMain }} />}
                        label={formatDate(article.created_at)}
                        variant="outlined"
                        sx={{
                          color: secondaryMain,
                          borderColor: `${secondaryMain}40`,
                          bgcolor: `${secondaryMain}10`,
                          '& .MuiChip-icon': { color: secondaryMain },
                          fontWeight: 'medium'
                        }}
                        size="small"
                      />

                      {/* Action Buttons */}
                      <Box>
                        <IconButton
                          onClick={(e) => handleLikeToggle(article.id, e)}
                          sx={{
                            color: likedArticles.has(article.id) ? errorMain : 'rgba(255, 255, 255, 0.7)',
                            mr: 1,
                            '&:hover': {
                              color: errorMain,
                              bgcolor: `${errorMain}20`
                            }
                          }}
                        >
                          {likedArticles.has(article.id) ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>

                        <IconButton
                          onClick={(e) => handleCollectionToggle(article.id, e)}
                          sx={{
                            color: collectedArticles.has(article.id) ? successMain : 'rgba(255, 255, 255, 0.7)',
                            '&:hover': {
                              color: successMain,
                              bgcolor: `${successMain}20`
                            }
                          }}
                        >
                          {collectedArticles.has(article.id) ? <Bookmark /> : <BookmarkBorder />}
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {articles.length === 0 && !loading && (
          <Fade in={true} timeout={800}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
                No articles found
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Check back later for new content.
              </Typography>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default Articles;