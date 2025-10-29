import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import PageLoadingSpinner from './LoadingSpinner';

const HeroSection = () => {
    const [activeContent, setActiveContent] = useState(0);
    const [isNavigating, setIsNavigating] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();

    const contentItems = [
        {
            type: 'books',
            mainHeading: "Discover Your Next Great Read",
            description: "Immerse yourself in captivating stories, gain new knowledge, and expand your horizons with our carefully curated collection of books from bestselling authors and emerging writers.",
            buttonText: "GET STARTED",
            emoji: "📚",
            path: "/books"
        },
        {
            type: 'articles',
            mainHeading: "Expand Your Knowledge",
            description: "Stay informed with thought-provoking articles, in-depth analysis, and expert perspectives across various topics including technology, science, business, and personal development.",
            buttonText: "VIEW ARTICLES",
            emoji: "📝",
            path: "/articles"
        }
    ];

    useEffect(() => {
        const rotationInterval = setInterval(() => {
            setActiveContent(prev => (prev + 1) % contentItems.length);
        }, 5000);

        return () => clearInterval(rotationInterval);
    }, []);

    const handleButtonClick = (path) => {
        if (path) {
            setIsNavigating(true);
            // Navigate directly to the target page after delay
            setTimeout(() => {
                navigate(path);
            }, 500);
        }
    };

    const currentContent = contentItems[activeContent];

    // Consistent colors for both books and articles
    const colors = {
        mainHeading: theme.palette.secondary.main,
        description: theme.palette.primary.main,
        buttonGradient: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 30%, ${theme.palette.primary.main} 100%)`,
        buttonHoverGradient: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.light} 100%)`,
        buttonText: '#000000'
    };

    // Show full-page loading spinner when navigating
    if (isNavigating) {
        return <PageLoadingSpinner />;
    }

    return (
        <Box 
            sx={{ 
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
                left: 13
            }}
        >
            <Container maxWidth="lg">
                <Box 
                    sx={{ 
                        color: 'text.primary',
                        maxWidth: '600px',
                        ml: -2
                    }}
                    data-aos="fade-right"
                    data-aos-delay="200"
                >
                    {/* Main Heading */}
                    <Fade in={true} timeout={800} key={activeContent}>
                        <Typography 
                            variant="h1" 
                            sx={{
                                fontSize: { xs: '4.3rem',sm: "4.5rem", md: '4.5rem' },
                                fontWeight: 'bold',
                                lineHeight: 1.1,
                                mb: 3,
                                textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                                color: colors.mainHeading,
                                background: 'none',
                            }}
                        >
                            {currentContent.mainHeading}
                        </Typography>
                    </Fade>

                    {/* Description */}
                    <Fade in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
                        <Typography 
                            variant="h6"
                            sx={{
                                fontSize: { xs: '1.2rem', sm: "1.5rem", md: '1.2rem' },
                                mb: 4,
                                color: colors.description,
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                maxWidth: '500px',
                                lineHeight: 1.6,
                                fontWeight: 400
                            }}
                        >
                            {currentContent.description}
                        </Typography>
                    </Fade>

                    {/* Action Button */}
                    <Fade in={true} timeout={800} style={{ transitionDelay: '400ms' }}>
                        <Button
                            variant="contained"
                            onClick={() => handleButtonClick(currentContent.path)}
                            sx={{
                                background: colors.buttonGradient,
                                color: colors.buttonText,
                                px: 5,
                                py: 1.5,
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                borderRadius: '50px',
                                minWidth: '200px',
                                '&:hover': {
                                    background: colors.buttonHoverGradient,
                                    transform: 'translateY(-3px)',
                                    boxShadow: `0 8px 25px ${theme.palette.secondary.main}80`
                                },
                                transition: 'all 0.3s ease',
                                boxShadow: `0 4px 15px ${theme.palette.secondary.main}60`
                            }}
                        >
                            {currentContent.buttonText}
                        </Button>
                    </Fade>

                    {/* Content Indicator Dots */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 4 }}>
                        {contentItems.map((_, index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    backgroundColor: index === activeContent ? colors.mainHeading : 'rgba(255,255,255,0.3)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: index === activeContent ? colors.mainHeading : 'rgba(255,255,255,0.5)',
                                        transform: 'scale(1.2)'
                                    }
                                }}
                                onClick={() => setActiveContent(index)}
                            />
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default HeroSection;