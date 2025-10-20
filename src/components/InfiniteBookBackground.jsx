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

  // Organize images into 4 rows
  const organizeIntoRows = (images, itemsPerRow = 20) => {
    if (images.length === 0) return [[], [], [], []];
    
    const allRows = [];
    
    for (let row = 0; row < 4; row++) {
      const rowItems = [];
      
      for (let i = 0; i < itemsPerRow; i++) {
        const randomIndex = Math.floor(Math.random() * images.length);
        rowItems.push(images[randomIndex]);
      }
      
      allRows.push(rowItems);
    }
    
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
      
      console.log('Organizing images into 4 rows:', imageList.length);
      
      const initialRows = organizeIntoRows(imageList, 20);
      setRows(initialRows);
      setLoading(false);
    };

    initialize();
  }, []);

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
          height: '100%',
          backgroundColor: '#02150250',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: -1,
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
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1,
        // REMOVED GRADIENT OVERLAY - Clean background
        backgroundColor: 'rgba(0, 0, 0, 0.3)' // Subtle dark overlay for better text readability
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

      {/* 4 Animated Rows */}
      {rows.map((row, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: 'flex',
            width: '200%',
            animation: `${slideLeft} ${18 + rowIndex * 2}s linear infinite`,
            animationDelay: `${rowIndex * 1.5}s`,
            marginBottom: '50px',
            position: 'relative',
            height: '130px'
          }}
        >
          {/* Double the row items for seamless loop */}
          {[...row, ...row].map((book, colIndex) => (
            <Box
              key={`${rowIndex}-${colIndex}`}
              sx={{
                flex: '0 0 100px',
                height: '160px',
                margin: '0 4px',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: `
                  0 3px 8px rgba(0,0,0,0.4),
                  0 1px 3px rgba(0,0,0,0.3),
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
                '&:hover': {
                  transform: 'translateY(-2px) scale(1.02)',
                  boxShadow: `
                    0 5px 15px rgba(0,0,0,0.6),
                    0 2px 5px rgba(0,0,0,0.4)
                  `,
                }
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