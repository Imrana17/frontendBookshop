import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ServicesSection = () => {
    const theme = useTheme();

    const services = [
        {
            icon: '📚',
            title: 'Book Store',
            description: 'Browse our extensive collection of books across all genres. From bestsellers to hidden gems, find your next favorite read.',
            delay: 100
        },
        {
            icon: '📖',
            title: 'E-Books',
            description: 'Access thousands of e-books instantly. Read on any device, anytime, anywhere with our digital library.',
            delay: 200
        },
        {
            icon: '📰',
            title: 'Articles',
            description: 'Stay informed with our curated articles on technology, science, business, and personal development.',
            delay: 300
        },
        {
            icon: '🎧',
            title: 'Audio Books',
            description: 'Listen to your favorite books on the go with our growing collection of professionally narrated audio books.',
            delay: 400
        }
    ];

    return (
        <Box 
            sx={{ 
                py: 10,
                backgroundColor: 'rgba(10, 47, 10, 0.8)',
                position: 'relative',
                zIndex: 2
            }}
        >
            <Container maxWidth="lg">
                <Typography 
                    variant="h2" 
                    align="center" 
                    sx={{ 
                        mb: 6,
                        color: 'text.primary',
                        fontWeight: 'bold'
                    }}
                    data-aos="fade-up"
                >
                    Our Services
                </Typography>
                
                <Grid container spacing={4}>
                    {services.map((service, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Card 
                                sx={{ 
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 215, 0, 0.2)',
                                    height: '100%',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: `0 10px 30px ${theme.palette.secondary.main}40`
                                    }
                                }}
                                data-aos="zoom-in"
                                data-aos-delay={service.delay}
                            >
                                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                    <Typography 
                                        variant="h1" 
                                        sx={{ 
                                            fontSize: '4rem',
                                            mb: 2
                                        }}
                                    >
                                        {service.icon}
                                    </Typography>
                                    <Typography 
                                        variant="h4" 
                                        sx={{ 
                                            mb: 2,
                                            color: 'secondary.main',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {service.title}
                                    </Typography>
                                    <Typography 
                                        variant="body1" 
                                        sx={{ 
                                            color: 'text.primary',
                                            lineHeight: 1.6
                                        }}
                                    >
                                        {service.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default ServicesSection;