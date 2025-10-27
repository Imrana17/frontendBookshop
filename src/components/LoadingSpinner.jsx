import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';

// Animation keyframes
const slideLeft = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
`;

// Styled dot spinner component with GOLD colors
const DotSpinner = styled.div`
  --uib-size: 3.8rem;
  --uib-speed: .9s;
  --uib-color: #FFD700; /* GOLD color */
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
    background: radial-gradient(circle at 30% 30%, #FFD700, #FFEC8B);
    transform: scale(0);
    opacity: 0.5;
    animation: pulse0112 calc(var(--uib-speed) * 1.111) ease-in-out infinite;
    box-shadow: 0 0 15px #FFD700, 0 0 25px rgba(255, 215, 0, 0.8); /* GOLD glow */
    filter: brightness(1.1);
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

const LoadingSpinner = ({ 
  message = "Loading...", 
  backgroundColor = "linear-gradient(135deg, #0A2F0A 0%, #1B5E20 100%)",
  fullScreen = true 
}) => {
  const theme = useTheme();

  useEffect(() => {
    // Force hide any navbars or app bars
    const hideNavbar = () => {
      const navElements = document.querySelectorAll(
        '.MuiAppBar-root, [class*="AppBar"], [class*="Navbar"], [class*="navbar"], header, nav, [role="banner"]'
      );
      navElements.forEach(element => {
        element.style.display = 'none';
      });
    };

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    hideNavbar();

    return () => {
      // Restore on unmount
      const navElements = document.querySelectorAll(
        '.MuiAppBar-root, [class*="AppBar"], [class*="Navbar"], [class*="navbar"], header, nav, [role="banner"]'
      );
      navElements.forEach(element => {
        element.style.display = '';
      });
      document.body.style.overflow = '';
    };
  }, []);

  const spinner = (
    <>
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
      {message && (
        <Typography 
          variant="h6" 
          sx={{ 
            mt: 2, 
            color: theme.palette.secondary.main, // Use theme gold color
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          {message}
        </Typography>
      )}
    </>
  );

  if (fullScreen) {
    return (
      <Box 
        sx={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: backgroundColor,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2147483647, // Maximum possible z-index
        }}
      >
        {spinner}
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4
      }}
    >
      {spinner}
    </Box>
  );
};

export default LoadingSpinner;