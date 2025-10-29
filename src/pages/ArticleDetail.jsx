import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
  Snackbar,
  Alert,
  Chip,
  Fade,
  useTheme
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Bookmark,
  BookmarkBorder,
  CalendarToday,
  ArrowBack
} from '@mui/icons-material';
import LoadingSpinner from '../components/LoadingSpinner'; // Import your loading spinner

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [inCollection, setInCollection] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Safe theme color fallbacks (matching Articles.jsx)
  const primaryDark = theme.palette?.primary?.dark || '#0A2F0A';
  const primaryMain = theme.palette?.primary?.main || '#1B5E20';
  const primaryLight = theme.palette?.primary?.light || '#2E7D32';
  const secondaryMain = theme.palette?.secondary?.main || '#FFD700';
  const errorMain = theme.palette?.error?.main || '#FF6B6B';
  const successMain = theme.palette?.success?.main || '#50C878';

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://qwabs-book-api.onrender.com/api/articles/view');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format: expected array');
        }
        
        setArticles(data);
        
        // Find the article with matching ID
        const article = data.find(article => article.id === parseInt(id));
        setSelectedArticle(article);
        
        if (!article) {
          setError('Article not found');
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    setSnackbar({
      open: true,
      message: !liked ? 'Article added to favorites!' : 'Article removed from favorites',
      severity: 'success'
    });
  };

  const handleCollection = () => {
    setInCollection(!inCollection);
    setSnackbar({
      open: true,
      message: !inCollection ? 'Article added to collection!' : 'Article removed from collection',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleBack = () => {
    navigate('/articles');
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Date unavailable';
    }
  };

  // Show LoadingSpinner while fetching article data
  if (loading) {
    return <LoadingSpinner message="Loading Article..." />;
  }

  if (error || !selectedArticle) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${primaryDark} 0%, ${primaryMain} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
            {error || 'Article not found'}
          </Typography>
          <Typography variant="body2">
            The article you're looking for doesn't exist or may have been removed.
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${primaryDark} 0%, ${primaryMain} 100%)`,
      pb: 4
    }}>
      {/* Back Button */}
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <IconButton
          onClick={handleBack}
          sx={{
            color: secondaryMain,
            mb: 2,
            backgroundColor: `${secondaryMain}20`,
            borderRadius: 2,
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: `${secondaryMain}30`,
              
            },
            transition: 'all 0.3s ease'
          }}
        >
          <ArrowBack />
          <Typography variant="body1" sx={{ ml: 1, color: secondaryMain, fontWeight: 'bold' }}>
            Back to Articles
          </Typography>
        </IconButton>
      </Container>

      {/* Hero Image Section */}
      <Fade in={true} timeout={800}>
        <Box 
          sx={{
            width: '100%',
            height: { xs: '300px', md: '500px' },
            backgroundImage: `url(${selectedArticle.image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '150px',
              background: `linear-gradient(to bottom, transparent 0%, ${primaryDark} 100%)`
            }
          }}
        />
      </Fade>

      <Container maxWidth="lg" sx={{ mt: -8, position: 'relative', zIndex: 1 }}>
        <Fade in={true} timeout={1000}>
          {/* Content Card */}
          <Box 
            sx={{
              background: `linear-gradient(145deg, ${primaryMain} 0%, ${primaryDark} 100%)`,
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              border: `1px solid ${secondaryMain}30`,
              p: { xs: 3, md: 6 },
              mb: 4
            }}
          >
            {/* Title Section */}
            <Typography 
              variant="h3" 
              component="h1"
              sx={{
                color: secondaryMain,
                fontWeight: 'bold',
                fontSize: { xs: '2rem', md: '3rem' },
                lineHeight: 1.2,
                mb: 3,
                textAlign: { xs: 'left', md: 'left' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {selectedArticle.title}
            </Typography>

            {/* Meta Information */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 4,
                flexWrap: 'wrap',
                gap: 2
              }}
            >
              <Chip
                icon={<CalendarToday sx={{ fontSize: 16, color: secondaryMain }} />}
                label={formatDate(selectedArticle.created_at)}
                variant="outlined"
                sx={{
                  color: secondaryMain,
                  borderColor: `${secondaryMain}40`,
                  bgcolor: `${secondaryMain}10`,
                  '& .MuiChip-icon': { color: secondaryMain },
                  fontWeight: 'medium',
                  fontSize: '0.9rem'
                }}
              />
              
              {selectedArticle.user && selectedArticle.user.name && (
                <Chip
                  label={`By ${selectedArticle.user.name}`}
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: `${secondaryMain}40`,
                    bgcolor: `${secondaryMain}10`,
                    fontWeight: 'medium'
                  }}
                />
              )}
            </Box>

            <Divider sx={{ 
              mb: 4, 
              backgroundColor: `${secondaryMain}30`,
              height: '2px'
            }} />

            {/* Description Section */}
            <Typography 
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.1rem',
                lineHeight: 1.8,
                textAlign: 'justify',
                mb: 6,
                whiteSpace: 'pre-line'
              }}
            >
              {selectedArticle.description}
            </Typography>

            {/* Action Icons Section */}
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 2,
                justifyContent: { xs: 'center', md: 'flex-start' },
                borderTop: `1px solid ${secondaryMain}30`,
                pt: 4
              }}
            >
              <IconButton
                onClick={handleLike}
                sx={{
                  background: liked ? `linear-gradient(135deg, ${errorMain} 0%, #ff8a8a 100%)` : 'transparent',
                  color: liked ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  border: `2px solid ${liked ? 'transparent' : errorMain}`,
                  borderRadius: 2,
                  p: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: liked 
                      ? `linear-gradient(135deg, #ff8a8a 0%, ${errorMain} 100%)` 
                      : `${errorMain}20`,
                    transform: 'scale(1.1)',
                    borderColor: errorMain
                  }
                }}
              >
                {liked ? <Favorite /> : <FavoriteBorder />}
              </IconButton>

              <IconButton
                onClick={handleCollection}
                sx={{
                  background: inCollection 
                    ? `linear-gradient(135deg, ${successMain} 0%, #70d89c 100%)` 
                    : 'transparent',
                  color: inCollection ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  border: `2px solid ${inCollection ? 'transparent' : successMain}`,
                  borderRadius: 2,
                  p: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: inCollection 
                      ? `linear-gradient(135deg, #70d89c 0%, ${successMain} 100%)`
                      : `${successMain}20`,
                    transform: 'scale(1.1)',
                    borderColor: successMain
                  }
                }}
              >
                {inCollection ? <Bookmark /> : <BookmarkBorder />}
              </IconButton>
            </Box>
          </Box>
        </Fade>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{
            backgroundColor: primaryMain,
            color: 'white',
            border: `1px solid ${secondaryMain}30`,
            '& .MuiAlert-icon': { color: secondaryMain }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ArticleDetail;