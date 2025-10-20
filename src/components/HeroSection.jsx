import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const HeroSection = () => {
    const [activeContent, setActiveContent] = useState(0);
    const theme = useTheme();

    const contentItems = [
        {
            type: 'books',
            mainHeading: "Discover Your Next Great Read",
            subHeading: "Explore thousands of books across all genres",
            description: "Immerse yourself in captivating stories, gain new knowledge, and expand your horizons with our carefully curated collection of books from bestselling authors and emerging writers.",
            buttonText: "GET STARTED",
            buttonColor: theme.palette.primary.main,
            emoji: "📚"
        },
        {
            type: 'articles',
            mainHeading: "Expand Your Knowledge",
            subHeading: "Dive into insightful articles and research",
            description: "Stay informed with thought-provoking articles, in-depth analysis, and expert perspectives across various topics including technology, science, business, and personal development.",
            buttonText: "VIEW ARTICLES",
            buttonColor: theme.palette.secondary.main,
            emoji: "📝"
        }
    ];

    useEffect(() => {
        const rotationInterval = setInterval(() => {
            setActiveContent(prev => (prev + 1) % contentItems.length);
        }, 5000);

        return () => clearInterval(rotationInterval);
    }, []);

    const currentContent = contentItems[activeContent];

    return (
        <Box 
            sx={{ 
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2
            }}
        >
            <Container maxWidth="lg">
                <Box 
                    sx={{ 
                        color: 'text.primary',
                        maxWidth: '600px',
                        ml: { xs: 2, md: 8 }
                    }}
                    data-aos="fade-right"
                    data-aos-delay="200"
                >
                    {/* Emoji Indicator */}
                    {/* <Typography 
                        variant="h2"
                        sx={{
                            mb: 2,
                            fontSize: { xs: '3rem', md: '4rem' },
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                        }}
                        data-aos="zoom-in"
                        data-aos-delay="400"
                    >
                        {currentContent.emoji}
                    </Typography> */}

                    {/* Sub Heading */}
                    <Fade in={true} timeout={800}>
                        <Typography 
                            variant="h6"
                            sx={{
                                fontSize: { xs: '0.9rem', md: '1.1rem' },
                                mb: 1,
                                color: 'text.secondary',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                fontWeight: 500
                            }}
                        >
                            {currentContent.subHeading}
                        </Typography>
                    </Fade>

                    {/* Main Heading */}
                    <Fade in={true} timeout={800} key={activeContent}>
                        <Typography 
                            variant="h1" 
                            sx={{
                                fontSize: { xs: '2.5rem', md: '4rem' },
                                fontWeight: 'bold',
                                lineHeight: 1.1,
                                mb: 3,
                                textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                                background: `linear-gradient(45deg, ${theme.palette.text.primary} 30%, ${theme.palette.text.secondary} 90%)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
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
                                fontSize: { xs: '1rem', md: '1.2rem' },
                                mb: 4,
                                color: 'text.primary',
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
                            sx={{
                                backgroundColor: currentContent.buttonColor,
                                color: currentContent.type === 'books' ? 'white' : 'black',
                                px: 5,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                borderRadius: '50px',
                                minWidth: '200px',
                                '&:hover': {
                                    backgroundColor: currentContent.buttonColor,
                                    transform: 'translateY(-3px)',
                                    boxShadow: `0 8px 25px ${currentContent.buttonColor}80`
                                },
                                transition: 'all 0.3s ease',
                                boxShadow: `0 4px 15px ${currentContent.buttonColor}60`
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
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    backgroundColor: index === activeContent ? currentContent.buttonColor : 'rgba(255,255,255,0.3)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: index === activeContent ? currentContent.buttonColor : 'rgba(255,255,255,0.5)',
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