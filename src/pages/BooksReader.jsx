import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Slider,
  Tooltip,
  Fab,
  Paper,
  Chip,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  ArrowBack,
  Menu as MenuIcon,
  Close as CloseIcon,
  FormatSize,
  Brightness4,
  Brightness7,
  Bookmark,
  BookmarkBorder,
  Share,
  Download,
  ZoomIn,
  ZoomOut,
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext,
  Settings,
  Timer
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const BookReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  
  const [book, setBook] = useState(location.state?.book || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [darkMode, setDarkMode] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [tableOfContentsOpen, setTableOfContentsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const contentRef = useRef(null);
  const timerRef = useRef(null);
  const lastPositionRef = useRef(0);

  // Mock book content - replace with actual API call
  const mockBookContent = {
    title: "Sample Book Title",
    author: "Author Name",
    chapters: [
      { id: 1, title: "Chapter 1: The Beginning", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
      { id: 2, title: "Chapter 2: The Journey", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
      { id: 3, title: "Chapter 3: The Climax", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
      { id: 4, title: "Chapter 4: The Resolution", content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet." }
    ]
  };

  // Fetch book content
  useEffect(() => {
    const fetchBookContent = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        // const response = await fetch(`https://qwabs-book-api.onrender.com/api/books/read/${id}`);
        // const bookData = await response.json();
        
        // Using mock data for demonstration
        setTimeout(() => {
          setBook(mockBookContent);
          setTotalPages(mockBookContent.chapters.length);
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        console.error('Error fetching book:', err);
        setError('Failed to load book content');
        setLoading(false);
      }
    };

    if (!book) {
      fetchBookContent();
    } else {
      setTotalPages(book.chapters?.length || 0);
      setLoading(false);
    }
  }, [id, book]);

  // Reading timer
  useEffect(() => {
    if (!loading && !error) {
      timerRef.current = setInterval(() => {
        setReadingTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [loading, error]);

  // Auto-hide controls
  useEffect(() => {
    const hideControls = () => setShowControls(false);
    let timeoutId;

    const resetTimer = () => {
      setShowControls(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(hideControls, 3000);
    };

    const handleUserActivity = () => {
      resetTimer();
    };

    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);
    document.addEventListener('click', handleUserActivity);

    resetTimer();

    return () => {
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
      document.removeEventListener('click', handleUserActivity);
      clearTimeout(timeoutId);
    };
  }, []);

  // Navigation functions
  const goToPage = (pageIndex) => {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      setCurrentPage(pageIndex);
      saveReadingProgress(pageIndex);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => {
        const newPage = prev + 1;
        saveReadingProgress(newPage);
        return newPage;
      });
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => {
        const newPage = prev - 1;
        saveReadingProgress(newPage);
        return newPage;
      });
    }
  };

  // Save reading progress to localStorage
  const saveReadingProgress = (page) => {
    const progress = {
      bookId: id,
      currentPage: page,
      timestamp: Date.now(),
      readingTime: readingTime
    };
    localStorage.setItem(`bookProgress_${id}`, JSON.stringify(progress));
  };

  // Load reading progress from localStorage
  const loadReadingProgress = () => {
    const savedProgress = localStorage.getItem(`bookProgress_${id}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCurrentPage(progress.currentPage || 0);
      setReadingTime(progress.readingTime || 0);
    }
  };

  // Format reading time
  const formatReadingTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Handle font size changes
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  // Handle zoom changes
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };

  // Toggle bookmark
  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    // Save bookmark to localStorage or API
    const bookmarks = JSON.parse(localStorage.getItem('bookBookmarks') || '{}');
    bookmarks[id] = !bookmarked;
    localStorage.setItem('bookBookmarks', JSON.stringify(bookmarks));
  };

  // Share book
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book?.title,
          text: `Check out "${book?.title}" by ${book?.author}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Download book
  const handleDownload = () => {
    // Implement download logic using your API
    window.open(`https://qwabs-book-api.onrender.com/api/books/download/${id}`, '_blank');
  };

  // Load progress on component mount
  useEffect(() => {
    loadReadingProgress();
    
    // Load bookmark status
    const bookmarks = JSON.parse(localStorage.getItem('bookBookmarks') || '{}');
    setBookmarked(!!bookmarks[id]);
  }, [id]);

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          background: darkMode ? '#121212' : '#f5f5f5'
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading Book...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4, height: '100vh' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <IconButton onClick={() => navigate('/books')}>
          <ArrowBack />
          <Typography>Back to Books</Typography>
        </IconButton>
      </Container>
    );
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: darkMode ? '#121212' : '#f5f5f5',
        color: darkMode ? 'white' : 'text.primary',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Header Controls */}
      <Fade in={showControls}>
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            p: 2,
            background: darkMode ? '#1e1e1e' : 'white',
            borderBottom: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={() => navigate('/books')}>
                <ArrowBack />
              </IconButton>
              
              <Box>
                <Typography variant="h6" noWrap sx={{ maxWidth: 300 }}>
                  {book?.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  by {book?.author}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                icon={<Timer />} 
                label={formatReadingTime(readingTime)} 
                size="small"
                variant="outlined"
              />
              
              <Tooltip title="Table of Contents">
                <IconButton onClick={() => setTableOfContentsOpen(true)}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Settings">
                <IconButton onClick={() => setSettingsOpen(true)}>
                  <Settings />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Progress Bar */}
          <Box sx={{ mt: 1 }}>
            <Slider
              value={currentPage}
              onChange={(_, value) => goToPage(value)}
              min={0}
              max={totalPages - 1}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `Page ${value + 1} of ${totalPages}`}
              sx={{ color: theme.palette.primary.main }}
            />
          </Box>
        </Paper>
      </Fade>

      {/* Main Content */}
      <Box sx={{ pt: 12, pb: 8, px: 2 }}>
        <Container maxWidth="md">
          <Paper
            elevation={2}
            sx={{
              p: 4,
              minHeight: '70vh',
              background: darkMode ? '#1e1e1e' : 'white',
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top center',
              transition: 'transform 0.3s ease'
            }}
            ref={contentRef}
          >
            {book?.chapters?.[currentPage] && (
              <Box>
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    fontSize: `${fontSize + 4}px`,
                    color: darkMode ? 'white' : 'text.primary'
                  }}
                >
                  {book.chapters[currentPage].title}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: `${fontSize}px`,
                    lineHeight: 1.8,
                    color: darkMode ? 'rgba(255,255,255,0.9)' : 'text.primary',
                    textAlign: 'justify'
                  }}
                >
                  {book.chapters[currentPage].content}
                </Typography>
              </Box>
            )}
          </Paper>

          {/* Page Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              startIcon={<NavigateBefore />}
              onClick={prevPage}
              disabled={currentPage === 0}
              variant="outlined"
            >
              Previous
            </Button>
            
            <Typography variant="body2" color="textSecondary">
              Page {currentPage + 1} of {totalPages}
            </Typography>
            
            <Button
              endIcon={<NavigateNext />}
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              variant="outlined"
            >
              Next
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Floating Action Buttons */}
      <Fade in={showControls}>
        <Box sx={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Tooltip title="Bookmark">
            <Fab size="small" onClick={toggleBookmark} color={bookmarked ? "primary" : "default"}>
              {bookmarked ? <Bookmark /> : <BookmarkBorder />}
            </Fab>
          </Tooltip>
          
          <Tooltip title="Share">
            <Fab size="small" onClick={handleShare}>
              <Share />
            </Fab>
          </Tooltip>
          
          <Tooltip title="Download">
            <Fab size="small" onClick={handleDownload}>
              <Download />
            </Fab>
          </Tooltip>
        </Box>
      </Fade>

      {/* Table of Contents Drawer */}
      <Drawer
        anchor="left"
        open={tableOfContentsOpen}
        onClose={() => setTableOfContentsOpen(false)}
        PaperProps={{
          sx: {
            background: darkMode ? '#1e1e1e' : 'white',
            color: darkMode ? 'white' : 'text.primary'
          }
        }}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Table of Contents</Typography>
            <IconButton onClick={() => setTableOfContentsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <List>
            {book?.chapters?.map((chapter, index) => (
              <ListItem
                button
                key={chapter.id}
                selected={currentPage === index}
                onClick={() => {
                  goToPage(index);
                  setTableOfContentsOpen(false);
                }}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    }
                  }
                }}
              >
                <ListItemText 
                  primary={chapter.title}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    noWrap: true
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Settings Drawer */}
      <Drawer
        anchor="right"
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        PaperProps={{
          sx: {
            background: darkMode ? '#1e1e1e' : 'white',
            color: darkMode ? 'white' : 'text.primary'
          }
        }}
      >
        <Box sx={{ width: 300, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Reading Settings</Typography>
            <IconButton onClick={() => setSettingsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Font Size Control */}
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Font Size</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={decreaseFontSize} disabled={fontSize <= 12}>
                <ZoomOut />
              </IconButton>
              
              <Chip label={`${fontSize}px`} />
              
              <IconButton onClick={increaseFontSize} disabled={fontSize >= 24}>
                <ZoomIn />
              </IconButton>
            </Box>
          </Box>

          {/* Zoom Control */}
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Zoom Level</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={handleZoomOut} disabled={zoomLevel <= 0.5}>
                <ZoomOut />
              </IconButton>
              
              <Chip label={`${Math.round(zoomLevel * 100)}%`} />
              
              <IconButton onClick={handleZoomIn} disabled={zoomLevel >= 2}>
                <ZoomIn />
              </IconButton>
            </Box>
          </Box>

          {/* Dark Mode Toggle */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography>Dark Mode</Typography>
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Quick Navigation */}
          <Box>
            <Typography gutterBottom>Quick Navigation</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<FirstPage />}
                onClick={() => goToPage(0)}
                disabled={currentPage === 0}
              >
                First
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<LastPage />}
                onClick={() => goToPage(totalPages - 1)}
                disabled={currentPage === totalPages - 1}
              >
                Last
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default BookReader;