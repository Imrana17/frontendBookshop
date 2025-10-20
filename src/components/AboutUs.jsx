import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AboutUs = () => {
    const theme = useTheme();

    return (
        <Box 
            sx={{ 
                py: 10,
                backgroundColor: 'rgba(10, 47, 10, 0.9)',
                position: 'relative',
                zIndex: 2
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography 
                            variant="h2" 
                            sx={{ 
                                mb: 3,
                                color: 'text.primary',
                                fontWeight: 'bold'
                            }}
                            data-aos="fade-right"
                        >
                            About Qwabs
                        </Typography>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                mb: 4,
                                color: 'text.secondary',
                                lineHeight: 1.8
                            }}
                            data-aos="fade-right"
                            data-aos-delay="100"
                        >
                            We are passionate about connecting readers with great content. 
                            Founded in 2020, Qwabs has grown from a small bookstore to a 
                            comprehensive platform offering books, e-books, articles, and 
                            educational resources.
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                mb: 4,
                                color: 'text.primary',
                                lineHeight: 1.8,
                                opacity: 0.9
                            }}
                            data-aos="fade-right"
                            data-aos-delay="200"
                        >
                            Our mission is to make knowledge accessible to everyone. We believe 
                            in the power of reading to transform lives and communities. Through 
                            our curated collections and insightful articles, we aim to inspire, 
                            educate, and entertain our global community of readers.
                        </Typography>
                        <Button 
                            variant="contained"
                            sx={{
                                backgroundColor: 'secondary.main',
                                color: 'black',
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: 'secondary.light',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                            data-aos="zoom-in"
                            data-aos-delay="300"
                        >
                            Learn More About Us
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box 
                            sx={{
                                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                borderRadius: '20px',
                                padding: 4,
                                border: '2px solid rgba(255, 215, 0, 0.3)',
                                textAlign: 'center'
                            }}
                            data-aos="fade-left"
                            data-aos-delay="400"
                        >
                            <Typography 
                                variant="h1" 
                                sx={{ 
                                    fontSize: '6rem',
                                    mb: 2,
                                    color: 'secondary.main'
                                }}
                            >
                                📖
                            </Typography>
                            <Typography 
                                variant="h4" 
                                sx={{ 
                                    mb: 2,
                                    color: 'text.primary',
                                    fontWeight: 'bold'
                                }}
                            >
                                Join Our Community
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: 'text.primary',
                                    opacity: 0.9
                                }}
                            >
                                Over 50,000+ readers trust Qwabs for their literary journey
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AboutUs;