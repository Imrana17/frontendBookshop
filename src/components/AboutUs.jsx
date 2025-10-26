import React from 'react';
import { Box, Container, Typography, Grid, Button, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AboutUs = () => {
    const theme = useTheme();

    return (
        <Box 
            sx={{ 
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
                py: 8
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={6} alignItems="center">
                    {/* Text Content */}
                    <Grid item xs={12} md={6}>
                        <Fade in={true} timeout={800}>
                            <Typography 
                                variant="h2" 
                                sx={{ 
                                    mb: 3,
                                    color: theme.palette.secondary.main,
                                    fontWeight: 'bold',
                                    textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                                }}
                            >
                                About Qwabs
                            </Typography>
                        </Fade>
                        
                        <Fade in={true} timeout={800} style={{ transitionDelay: '100ms' }}>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    mb: 4,
                                    color: theme.palette.primary.main,
                                    lineHeight: 1.8,
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                    fontSize: { xs: '1rem', md: '1.2rem' }
                                }}
                            >
                                We are passionate about connecting readers with great content. 
                                Founded in 2020, Qwabs has grown from a small bookstore to a 
                                comprehensive platform offering books, e-books, articles, and 
                                educational resources.
                            </Typography>
                        </Fade>
                        
                        <Fade in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    mb: 4,
                                    color: '#ffffff',
                                    lineHeight: 1.8,
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                    fontSize: '1.1rem'
                                }}
                            >
                                Our mission is to make knowledge accessible to everyone. We believe 
                                in the power of reading to transform lives and communities. Through 
                                our curated collections and insightful articles, we aim to inspire, 
                                educate, and entertain our global community of readers.
                            </Typography>
                        </Fade>
                        
                        <Fade in={true} timeout={800} style={{ transitionDelay: '300ms' }}>
                            <Button 
                                variant="contained"
                                sx={{
                                    background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
                                    color: '#000000',
                                    px: 5,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    borderRadius: '50px',
                                    '&:hover': {
                                        background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
                                        transform: 'translateY(-3px)',
                                        boxShadow: `0 8px 25px ${theme.palette.secondary.main}80`
                                    },
                                    transition: 'all 0.3s ease',
                                    boxShadow: `0 4px 15px ${theme.palette.secondary.main}60`
                                }}
                            >
                                Learn More About Us
                            </Button>
                        </Fade>
                    </Grid>
                    
                    {/* Visual Element */}
                    <Grid item xs={12} md={6}>
                        <Fade in={true} timeout={800} style={{ transitionDelay: '400ms' }}>
                            <Box 
                                sx={{
                                    background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)`,
                                    borderRadius: '20px',
                                    padding: 4,
                                    border: `2px solid ${theme.palette.secondary.main}30`,
                                    textAlign: 'center',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: `0 15px 40px ${theme.palette.secondary.main}80`
                                    }
                                }}
                            >
                                <Typography 
                                    variant="h1" 
                                    sx={{ 
                                        fontSize: '6rem',
                                        mb: 2,
                                        color: theme.palette.secondary.main
                                    }}
                                >
                                    📖
                                </Typography>
                                <Typography 
                                    variant="h4" 
                                    sx={{ 
                                        mb: 2,
                                        color: theme.palette.primary.main,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Join Our Community
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        color: '#555555',
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    Over 50,000+ readers trust Qwabs for their literary journey
                                </Typography>
                            </Box>
                        </Fade>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AboutUs;