import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import LoadingSpinner from './LoadingSpinner';

const slideLeft = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
`;

const InfiniteBookBackground = () => {
  const [images, setImages] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewportHeight, setViewportHeight] = useState('100vh');

  // Set proper viewport height for mobile
  useEffect(() => {
    const setHeight = () => {
      // First try dvh (dynamic viewport height), then vh, with fallbacks
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Use the best available viewport height unit
      if (CSS.supports('height: 100dvh')) {
        setViewportHeight('100dvh');
      } else {
        setViewportHeight('100vh');
      }
    };

    setHeight();
    window.addEventListener('resize', setHeight);
    window.addEventListener('orientationchange', setHeight);
    
    return () => {
      window.removeEventListener('resize', setHeight);
      window.removeEventListener('orientationchange', setHeight);
    };
  }, []);

  // Fetch images from API
  const fetchImages = async () => {
    try {
      console.log('Fetching book covers from API...');
      const response = await fetch('https://qwabs-book-api.onrender.com/api/books/images');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (!Array.isArray(data)) {
        console.error('API response is not an array:', data);
        return [];
      }
      
      const formattedImages = data
        .filter(book => book.image_url)
        .map(book => ({
          id: book.id,
          title: book.title,
          url: book.image_url,
          price: book.price,
          currency: book.currency
        }));
      
      console.log('Formatted images:', formattedImages);
      
      if (formattedImages.length === 0) {
        console.warn('No images found in API response');
      }
      
      return formattedImages;
    } catch (error) {
      console.error('Error fetching book images:', error);
      setError(error.message);
      return [];
    }
  };

  // Calculate number of rows based on screen height
  const calculateRowsCount = () => {
    if (typeof window !== 'undefined') {
      const screenHeight = window.innerHeight;
      // Calculate based on mobile-optimized row height
      const rowHeight = 120; // Reduced for mobile
      const rowMargin = 15; // Reduced margin
      const totalRowSpace = rowHeight + rowMargin;
      
      // Add extra rows to ensure full coverage
      const calculatedRows = Math.ceil(screenHeight / totalRowSpace) + 3;
      console.log(`Screen height: ${screenHeight}px, creating ${calculatedRows} rows`);
      return calculatedRows;
    }
    return 10; // Default fallback
  };

  // Calculate items per row based on screen width
  const calculateItemsPerRow = () => {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      // More items on wider screens, fewer on mobile
      return screenWidth < 768 ? 12 : 20;
    }
    return 15;
  };

  // Organize images into dynamic number of rows
  const organizeIntoRows = (images) => {
    if (images.length === 0) return [];
    
    const rowsCount = calculateRowsCount();
    const itemsPerRow = calculateItemsPerRow();
    const allRows = [];
    
    for (let row = 0; row < rowsCount; row++) {
      const rowItems = [];
      
      for (let i = 0; i < itemsPerRow; i++) {
        const randomIndex = Math.floor(Math.random() * images.length);
        rowItems.push(images[randomIndex]);
      }
      
      allRows.push(rowItems);
    }
    
    console.log(`Created ${rowsCount} rows with ${itemsPerRow} items each`);
    return allRows;
  };

  // Replace random items in rows
  const randomReplaceRows = (rows, imagePool) => {
    if (imagePool.length === 0) return rows;
    
    return rows.map(row => {
      const newRow = [...row];
      const itemsToReplace = Math.floor(row.length * 0.3);
      
      for (let i = 0; i < itemsToReplace; i++) {
        const randomPosition = Math.floor(Math.random() * row.length);
        const randomImage = imagePool[Math.floor(Math.random() * imagePool.length)];
        newRow[randomPosition] = randomImage;
      }
      
      return newRow;
    });
  };

  // Initialize component
  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      setError(null);
      const imageList = await fetchImages();
      setImages(imageList);
      
      console.log('Organizing images into rows:', imageList.length);
      
      const initialRows = organizeIntoRows(imageList);
      setRows(initialRows);
      setLoading(false);
    };

    initialize();
  }, []);

  // Recalculate rows on orientation change
  useEffect(() => {
    const handleResize = () => {
      if (images.length > 0) {
        const newRows = organizeIntoRows(images);
        setRows(newRows);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [images]);

  // Animation and replacement loop
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setRows(prevRows => randomReplaceRows(prevRows, images));
    }, 20000);

    return () => clearInterval(interval);
  }, [images]);

  if (error) {
    return (
      <Box 
        sx={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: viewportHeight,
          minHeight: '100vh', // Fallback
          backgroundColor: '#02150250',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          gap: 3,
          color: 'white'
        }}
      >
        <Typography variant="h6">Error loading books</Typography>
        <Typography variant="body2">{error}</Typography>
      </Box>
    );
  }

  if (loading) {
    return <LoadingSpinner message="Loading book covers..." />;
  }

  return (
    <Box 
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: viewportHeight,
        minHeight: '100vh', // Fallback
        overflow: 'hidden',
        zIndex: 1,
        pointerEvents: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around', // Better distribution
        padding: '10px 0' // Small padding to ensure no cropping
      }}
    >
      {/* Debug info - remove in production */}
      {images.length === 0 && (
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          zIndex: 10,
          textAlign: 'center'
        }}>
          <Typography variant="h6">No book images loaded</Typography>
          <Typography variant="body2">Check console for details</Typography>
        </Box>
      )}

      {/* Dynamic number of Animated Rows */}
      {rows.map((row, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: 'flex',
            width: '200%',
            animation: `${slideLeft} ${15 + (rowIndex % 8) * 2}s linear infinite`,
            animationDelay: `${(rowIndex % 8) * 1.2}s`,
            marginBottom: {
              xs: '10px', // Very small on mobile
              sm: '15px',
              md: '20px'
            },
            marginTop: {
              xs: '5px',
              sm: '8px',
              md: '10px'
            },
            position: 'relative',
            height: {
              xs: '100px',  // Smaller on mobile
              sm: '110px', 
              md: '120px'
            },
            pointerEvents: 'none',
            flexShrink: 0
          }}
        >
          {/* Double the row items for seamless loop */}
          {[...row, ...row].map((book, colIndex) => (
            <Box
              key={`${rowIndex}-${colIndex}`}
              sx={{
                flex: '0 0 auto',
                width: {
                  xs: '70px',  // Smaller on mobile
                  sm: '80px',
                  md: '90px'
                },
                height: {
                  xs: '110px', // Smaller on mobile
                  sm: '130px',
                  md: '140px'
                },
                margin: '0 2px', // Minimal margin
                borderRadius: '3px',
                overflow: 'hidden',
                boxShadow: `
                  0 2px 6px rgba(0,0,0,0.4),
                  0 1px 2px rgba(0,0,0,0.3),
                  inset 0 1px 0 rgba(255,255,255,0.1)
                `,
                backgroundImage: book?.url ? `url(${book.url})` : 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: book?.url ? 'transparent' : '#1a1a1a',
                position: 'relative',
                transition: 'all 0.2s ease',
                border: '1px solid rgba(255,255,255,0.05)',
                pointerEvents: 'none'
              }}
            >
              {/* Loading fallback */}
              {!book?.url && (
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '8px',
                  textAlign: 'center',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                }}>
                  📚
                </Box>
              )}
            
              {/* Subtle overlay */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%)',
                pointerEvents: 'none'
              }}/>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default InfiniteBookBackground;