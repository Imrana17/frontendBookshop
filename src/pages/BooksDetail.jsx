import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Rating,
  Chip,
  Grid,
  Paper,
  IconButton,
  Fade
} from '@mui/material';
import { ArrowBack, Download, Favorite, FavoriteBorder } from '@mui/icons-material';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [book, setBook] = useState(location.state?.book || null);
  const [loading, setLoading] = useState(!location.state?.book);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!book) {
      // Fetch individual book data if not passed via state
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      // You might need to adjust this endpoint
      const response = await fetch(`https://qwabs-book-api.onrender.com/api/books/${id}`);
      if (response.ok) {
        const bookData = await response.json();
        setBook(bookData);
      }
    } catch (error) {
      console.error('Error fetching book:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handler for the Read Now button
  const handleReadNow = () => {
    navigate(`/read/${id}`, { state: { book } });
  };

  // Handler for downloading the book
  const handleDownload = async () => {
    try {
      setDownloading(true);
      
      const response = await fetch(`https://qwabs-book-api.onrender.com/api/books/${id}/download`);
      
      if (!response.ok) {
        throw new Error('Failed to download book');
      }
      
      const downloadData = await response.json();
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = downloadData.download_url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Optional: Set a filename for the download
      link.download = `${downloadData.title || 'book'}.pdf`;
      
      // Trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download book. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/books')}>
        Back to Books
      </Button>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <img 
              src={book.cover_image} 
              alt={book.title}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Typography variant="h3" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            by {book.author}
          </Typography>
          
          <Box sx={{ my: 2 }}>
            <Rating value={book.rating} readOnly />
            <Typography variant="body2" color="textSecondary">
              ({book.review_count} reviews)
            </Typography>
          </Box>
          
          <Typography variant="body1" paragraph>
            {book.description}
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mr: 2 }}
              onClick={handleReadNow}
            >
              Read Now
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<Download />}
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? 'Downloading...' : 'Download'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookDetail;