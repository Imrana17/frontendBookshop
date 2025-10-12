import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

// Animation keyframes - all moving left
const slideLeft = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
`;

// Styled dot spinner component with green and gold colors
const DotSpinner = styled.div`
  --uib-size: 2.8rem;
  --uib-speed: .9s;
  --uib-color: #ffd700; /* Gold color */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: var(--uib-size);
  width: var(--uib-size);

  .dot-spinner__dot {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
  }

  .dot-spinner__dot::before {
    content: '';
    height: 20%;
    width: 20%;
    border-radius: 50%;
    background-color: var(--uib-color);
    transform: scale(0);
    opacity: 0.5;
    animation: pulse0112 calc(var(--uib-speed) * 1.111) ease-in-out infinite;
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.4); /* Gold shadow */
  }

  .dot-spinner__dot:nth-child(2) {
    transform: rotate(45deg);
  }

  .dot-spinner__dot:nth-child(2)::before {
    animation-delay: calc(var(--uib-speed) * -0.875);
  }

  .dot-spinner__dot:nth-child(3) {
    transform: rotate(90deg);
  }

  .dot-spinner__dot:nth-child(3)::before {
    animation-delay: calc(var(--uib-speed) * -0.75);
  }

  .dot-spinner__dot:nth-child(4) {
    transform: rotate(135deg);
  }

  .dot-spinner__dot:nth-child(4)::before {
    animation-delay: calc(var(--uib-speed) * -0.625);
  }

  .dot-spinner__dot:nth-child(5) {
    transform: rotate(180deg);
  }

  .dot-spinner__dot:nth-child(5)::before {
    animation-delay: calc(var(--uib-speed) * -0.5);
  }

  .dot-spinner__dot:nth-child(6) {
    transform: rotate(225deg);
  }

  .dot-spinner__dot:nth-child(6)::before {
    animation-delay: calc(var(--uib-speed) * -0.375);
  }

  .dot-spinner__dot:nth-child(7) {
    transform: rotate(270deg);
  }

  .dot-spinner__dot:nth-child(7)::before {
    animation-delay: calc(var(--uib-speed) * -0.25);
  }

  .dot-spinner__dot:nth-child(8) {
    transform: rotate(315deg);
  }

  .dot-spinner__dot:nth-child(8)::before {
    animation-delay: calc(var(--uib-speed) * -0.125);
  }

  @keyframes pulse0112 {
    0%,
    100% {
      transform: scale(0);
      opacity: 0.5;
    }

    50% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const InfiniteBookBackground = () => {
  const [images, setImages] = useState([]);
  const [grid, setGrid] = useState([]);
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
      console.log('Number of book covers fetched:', data?.length || 0);
      
      // Check if data is an array
      if (!Array.isArray(data)) {
        console.error('API response is not an array:', data);
        return [];
      }
      
      // Map the API response to match our expected format
      const formattedImages = data
        .filter(book => book.image_url) // Only include books with image_url
        .map(book => ({
          id: book.id,
          title: book.title,
          url: book.image_url, // This is the key fix - using image_url from API
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

  // Initialize grid structure
  const initializeGrid = (rows, columns) => {
    return Array(rows).fill().map(() => Array(columns).fill(null));
  };

  // Fill grid with random images
  const fillGridRandomly = (grid, imageQueue) => {
    if (imageQueue.length === 0) {
      console.warn('No images available to fill grid');
      return grid;
    }
    
    return grid.map(row => 
      row.map(() => {
        const randomIndex = Math.floor(Math.random() * imageQueue.length);
        return imageQueue[randomIndex];
      })
    );
  };

  // Replace random positions in grid
  const randomReplace = (grid, imageQueue) => {
    if (imageQueue.length === 0) {
      console.warn('No images available for replacement');
      return grid;
    }
    
    const newGrid = grid.map(row => [...row]);
    const totalCells = 6 * 14;
    const positionsToReplace = Math.floor(totalCells * 0.3);
    
    for (let i = 0; i < positionsToReplace; i++) {
      const randomRow = Math.floor(Math.random() * 6);
      const randomCol = Math.floor(Math.random() * 14);
      const randomImage = imageQueue[Math.floor(Math.random() * imageQueue.length)];
      newGrid[randomRow][randomCol] = randomImage;
    }
    
    return newGrid;
  };

  // Initialize component
  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      setError(null);
      const imageList = await fetchImages();
      setImages(imageList);
      
      console.log('Initializing grid with images:', imageList.length);
      
      let initialGrid = initializeGrid(6, 14);
      initialGrid = fillGridRandomly(initialGrid, imageList);
      setGrid(initialGrid);
      setLoading(false);
    };

    initialize();
  }, []);

  // Animation and replacement loop
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setGrid(prevGrid => randomReplace(prevGrid, images));
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
          backgroundColor: '#0a2f0a',
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
    return (
      <Box 
        sx={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#0a2f0a', // Dark green background
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: -1,
          gap: 3
        }}
      >
        {/* Dot Spinner Loader */}
        <DotSpinner className="dot-spinner">
          <div className="dot-spinner__dot" />
          <div className="dot-spinner__dot" />
          <div className="dot-spinner__dot" />
          <div className="dot-spinner__dot" />
          <div className="dot-spinner__dot" />
          <div className="dot-spinner__dot" />
          <div className="dot-spinner__dot" />
          <div className="dot-spinner__dot" />
        </DotSpinner>
      </Box>
    );
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
        // DARKENED LEFT HALF
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 80%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '40%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }
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

      {/* Animated Grid Rows */}
      {grid.map((row, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: 'flex',
            width: '200%',
            animation: `${slideLeft} 18s linear infinite`,
            marginLeft: rowIndex % 2 === 0 ? '0px' : '60px',
            marginBottom: '8px',
            position: 'relative',
            height: '120px'
          }}
        >
          {/* Double the images for seamless loop */}
          {[...row, ...row].map((book, colIndex) => (
           <Box
           key={`${rowIndex}-${colIndex}`}
           sx={{
             flex: '0 0 100px',
             height: '120px',
             margin: '0 2px',
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
           {/* Debug info on book cover */}
           {book?.url && (
             <Box sx={{
               position: 'absolute',
               top: 2,
               left: 2,
               background: 'rgba(0,0,0,0.7)',
               color: 'white',
               fontSize: '4px',
               padding: '1px 2px',
               borderRadius: '2px',
               zIndex: 2,
               maxWidth: '80%',
               overflow: 'hidden',
               textOverflow: 'ellipsis',
               whiteSpace: 'nowrap'
             }}>
               {book.url.substring(0, 20)}...
             </Box>
           )}
           
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