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
  Fade,
  Button,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Bookmark,
  BookmarkBorder,
  CalendarToday,
  ArrowBack,
  Download,
  Visibility,
  Star
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import LoadingSpinner from '../components/LoadingSpinner';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [booksWithoutPrice, setBooksWithoutPrice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedBooks, setLikedBooks] = useState(new Set());
  const [collectedBooks, setCollectedBooks] = useState(new Set());
  const [selectedBook, setSelectedBook] = useState(null);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Safe theme color fallbacks
  const primaryDark = theme.palette?.primary?.dark || '#0A2F0A';
  const primaryMain = theme.palette?.primary?.main || '#1B5E20';
  const primaryLight = theme.palette?.primary?.light || '#2E7D32';
  const secondaryMain = theme.palette?.secondary?.main || '#FFD700';
  const errorMain = theme.palette?.error?.main || '#FF6B6B';
  const successMain = theme.palette?.success?.main || '#50C878';

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        
        // Fetch books with price
        const [withPriceResponse, withoutPriceResponse] = await Promise.all([
          fetch('https://qwabs-book-api.onrender.com/api/books/with-price'),
          fetch('https://qwabs-book-api.onrender.com/api/books/without-price')
        ]);
        
        if (!withPriceResponse.ok || !withoutPriceResponse.ok) {
          throw new Error('Failed to fetch books');
        }
        
        const withPriceData = await withPriceResponse.json();
        const withoutPriceData = await withoutPriceResponse.json();
        
        setBooks(withPriceData);
        setBooksWithoutPrice(withoutPriceData);
        
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Toggle like status
  const handleLikeToggle = (bookId, event) => {
    event.stopPropagation();
    setLikedBooks(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(bookId)) {
        newLiked.delete(bookId);
      } else {
        newLiked.add(bookId);
      }
      return newLiked;
    });
  };

  // Toggle collection status
  const handleCollectionToggle = (bookId, event) => {
    event.stopPropagation();
    setCollectedBooks(prev => {
      const newCollected = new Set(prev);
      if (newCollected.has(bookId)) {
        newCollected.delete(bookId);
      } else {
        newCollected.add(bookId);
      }
      return newCollected;
    });
  };

  // Handle book click - navigate to book detail or open reader
  const handleBookClick = (book) => {
    // You can either navigate to a detail page or open a reader directly
    navigate(`/books/${book.id}`, { state: { book } });
  };

  // Handle download
  const handleDownload = async (bookId, event) => {
    event.stopPropagation();
    try {
      const response = await fetch(`https://qwabs-book-api.onrender.com/api/books/download/${bookId}`);
      if (response.ok) {
        // Create a blob and download link
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `book-${bookId}.pdf`; // Adjust file extension as needed
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        
        setDownloadDialogOpen(true);
        setSelectedBook(bookId);
      } else {
        throw new Error('Download failed');
      }
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to download book');
    }
  };

  // Handle read book
 // Replace the handleReadBook function in Books.js
const handleReadBook = (book, event) => {
    event.stopPropagation();
    navigate(`/read/${book.id}`, { state: { book } });
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Handle back navigation
  const handleBack = () => {
    navigate('/');
  };

  // Show loading spinner while fetching data
  if (loading) {
    return <LoadingSpinner message="Loading Books..." />;
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
            Failed to Load Books
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
        {/* Back Button */}
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
            Our Book Collection
          </Typography>
        </Fade>

        {/* Books with Price Section */}
        {books.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white', 
                mb: 3,
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              Premium Books
            </Typography>
            <Grid container spacing={3}>
              {books.map((book, index) => (
                <Grid item xs={12} sm={6} lg={4} key={book.id}>
                  <BookCard 
                    book={book}
                    index={index}
                    hasPrice={true}
                    onBookClick={handleBookClick}
                    onLikeToggle={handleLikeToggle}
                    onCollectionToggle={handleCollectionToggle}
                    onDownload={handleDownload}
                    onRead={handleReadBook}
                    isLiked={likedBooks.has(book.id)}
                    isCollected={collectedBooks.has(book.id)}
                    themeColors={{ primaryMain, primaryDark, primaryLight, secondaryMain, errorMain, successMain }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Free Books Section */}
        {booksWithoutPrice.length > 0 && (
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white', 
                mb: 3,
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              Free Books
            </Typography>
            <Grid container spacing={3}>
              {booksWithoutPrice.map((book, index) => (
                <Grid item xs={12} sm={6} lg={4} key={book.id}>
                  <BookCard 
                    book={book}
                    index={index}
                    hasPrice={false}
                    onBookClick={handleBookClick}
                    onLikeToggle={handleLikeToggle}
                    onCollectionToggle={handleCollectionToggle}
                    onDownload={handleDownload}
                    onRead={handleReadBook}
                    isLiked={likedBooks.has(book.id)}
                    isCollected={collectedBooks.has(book.id)}
                    themeColors={{ primaryMain, primaryDark, primaryLight, secondaryMain, errorMain, successMain }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Empty State */}
        {books.length === 0 && booksWithoutPrice.length === 0 && !loading && (
          <Fade in={true} timeout={800}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
                No books found
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Check back later for new books.
              </Typography>
            </Box>
          </Fade>
        )}

        {/* Download Success Dialog */}
        <Dialog 
          open={downloadDialogOpen} 
          onClose={() => setDownloadDialogOpen(false)}
          PaperProps={{
            sx: {
              background: `linear-gradient(135deg, ${primaryMain} 0%, ${primaryDark} 100%)`,
              border: `2px solid ${secondaryMain}`
            }
          }}
        >
          <DialogTitle sx={{ color: secondaryMain, textAlign: 'center' }}>
            Download Successful!
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ color: 'white', textAlign: 'center' }}>
              Your book has been downloaded successfully.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button 
              onClick={() => setDownloadDialogOpen(false)}
              sx={{ 
                color: secondaryMain,
                borderColor: secondaryMain,
                '&:hover': {
                  backgroundColor: `${secondaryMain}20`
                }
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

// Book Card Component
const BookCard = ({ 
  book, 
  index, 
  hasPrice, 
  onBookClick, 
  onLikeToggle, 
  onCollectionToggle, 
  onDownload, 
  onRead, 
  isLiked, 
  isCollected,
  themeColors 
}) => {
  return (
    <Fade in={true} timeout={800} style={{ transitionDelay: `${(index % 6) * 100}ms` }}>
      <Card
        onClick={() => onBookClick(book)}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease-in-out',
          cursor: 'pointer',
          background: `linear-gradient(145deg, ${themeColors.primaryMain} 0%, ${themeColors.primaryDark} 100%)`,
          border: `1px solid ${themeColors.secondaryMain}20`,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: `0 16px 48px ${themeColors.secondaryMain}40`,
            border: `1px solid ${themeColors.secondaryMain}50`,
            background: `linear-gradient(145deg, ${themeColors.primaryLight} 0%, ${themeColors.primaryMain} 100%)`
          }
        }}
      >
        {/* Book Cover */}
        <CardMedia
          component="img"
          height="250"
          image={book.cover_image || '/book-fallback.jpg'}
          alt={book.title || 'Book cover'}
          onError={(e) => {
            e.target.src = '/book-fallback.jpg';
          }}
          sx={{
            objectFit: 'cover',
            borderBottom: `2px solid ${themeColors.secondaryMain}`
          }}
        />

        <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Book Title */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mb: 1,
              lineHeight: 1.3,
              minHeight: '2.8em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {book.title || 'Untitled Book'}
          </Typography>

          {/* Author */}
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              mb: 1,
              fontStyle: 'italic'
            }}
          >
            by {book.author || 'Unknown Author'}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating
              value={book.rating || 0}
              readOnly
              size="small"
              sx={{ color: themeColors.secondaryMain }}
            />
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', ml: 1 }}>
              ({book.review_count || 0})
            </Typography>
          </Box>

          {/* Book Description */}
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
              flexGrow: 1
            }}
          >
            {book.description || 'No description available.'}
          </Typography>

          {/* Price and Actions */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderTop: `1px solid ${themeColors.secondaryMain}30`,
            pt: 2,
            mt: 'auto'
          }}>
            {/* Price or Free Badge */}
            {hasPrice ? (
              <Chip
                label={book.price ? `Price: ${formatPrice(book.price)}` : 'Free'}
                color={book.price ? "secondary" : "success"}
                sx={{
                  fontWeight: 'bold',
                  color: 'white'
                }}
                size="small"
              />
            ) : (
              <Chip
                label="FREE"
                color="success"
                sx={{
                  fontWeight: 'bold',
                  color: 'white'
                }}
                size="small"
              />
            )}

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {/* Read Button */}
              <IconButton
                onClick={(e) => onRead(book, e)}
                sx={{
                  color: themeColors.secondaryMain,
                  backgroundColor: `${themeColors.secondaryMain}20`,
                  '&:hover': {
                    backgroundColor: `${themeColors.secondaryMain}30`,
                    transform: 'scale(1.1)'
                  }
                }}
                size="small"
              >
                <Visibility fontSize="small" />
              </IconButton>

              {/* Download Button */}
              <IconButton
                onClick={(e) => onDownload(book.id, e)}
                sx={{
                  color: themeColors.successMain,
                  backgroundColor: `${themeColors.successMain}20`,
                  '&:hover': {
                    backgroundColor: `${themeColors.successMain}30`,
                    transform: 'scale(1.1)'
                  }
                }}
                size="small"
              >
                <Download fontSize="small" />
              </IconButton>

              {/* Like Button */}
              <IconButton
                onClick={(e) => onLikeToggle(book.id, e)}
                sx={{
                  color: isLiked ? themeColors.errorMain : 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    color: themeColors.errorMain,
                    backgroundColor: `${themeColors.errorMain}20`
                  }
                }}
                size="small"
              >
                {isLiked ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
              </IconButton>

              {/* Collection Button */}
              <IconButton
                onClick={(e) => onCollectionToggle(book.id, e)}
                sx={{
                  color: isCollected ? themeColors.successMain : 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    color: themeColors.successMain,
                    backgroundColor: `${themeColors.successMain}20`
                  }
                }}
                size="small"
              >
                {isCollected ? <Bookmark fontSize="small" /> : <BookmarkBorder fontSize="small" />}
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
};

// Helper function to format price
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

export default Books;