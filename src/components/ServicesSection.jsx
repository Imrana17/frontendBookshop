import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ServicesSection = () => {
    const theme = useTheme();

    const services = [
        {
            icon: '📚',
            title: 'Book Store',
            description: 'Browse our extensive collection of books across all genres. From bestsellers to hidden gems, find your next favorite read. Add to collections and come back to continue reading.',
            delay: 100
        },
        {
            icon: '📖',
            title: 'E-Books',
            description: 'Access thousands of e-books instantly. Read on any device, anytime, anywhere with our digital library. Track your reading progress whiles reading.',
            delay: 200
        },
        {
            icon: '📰',
            title: 'Articles',
            description: 'Stay informed with our curated articles on technology, science, business, and personal development. As well as environment issues and politics.',
            delay: 300
        },
        {
            icon: '🎧',
            title: 'Audio Books',
            description: 'Listen to your favorite books on the go with our growing collection of professionally narrated audio books. Feeling lazy to manually read books, listen to them instead.',
            delay: 400
        }
    ];

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
        > <Box
        sx={{
          height: "100vh", // full viewport height
          display: "flex", // enable flexbox
          alignItems: "center", // vertical center
          justifyContent: "center", // horizontal center
          textAlign: "center",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // responsive font sizes
          color: theme.palette.secondary.main,
          fontWeight: "bold",
          position: "absolute",
          top: -100,
          left: {xs: 40, sm: 180, md: 550}, // responsive left positioning
          zIndex: 3,
          textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
          userSelect: "none", 
          px: 2, // small padding for mobile edges
        }}
      >
        Our Services
      </Box>
            <Container maxWidth="lg">
                {/* Section Title */}
                <Box 
                    sx={{ 
                        textAlign: 'center',
                        mb: 8
                    }}
                    data-aos="fade-up"
                >
                    <Fade in={true} timeout={800}>
                        <Typography 
                            variant="h2" 
                            sx={{ 
                                mb: 3,
                                color: theme.palette.secondary.main, // Gold color like HeroSection
                                fontWeight: 'bold',
                                textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                                fontSize: { xs: '2.5rem', md: '3.5rem' }
                            }}
                        >
                            Our Services
                        </Typography>
                    </Fade>
                    
                    <Fade in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
                        <Typography 
                            variant="h6"
                            sx={{
                                color: theme.palette.primary.main, // Green color like HeroSection
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                maxWidth: '600px',
                                margin: '0 auto',
                                lineHeight: 1.6,
                                fontSize: { xs: '1rem', md: '1.2rem' }
                            }}
                        >
                            Discover our comprehensive range of literary services designed to cater to all your reading needs
                        </Typography>
                    </Fade>
                </Box>
                
                {/* Services Grid */}
                <Grid container spacing={4}>
                    {services.map((service, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Fade in={true} timeout={800} style={{ transitionDelay: `${service.delay}ms` }}>
                                <Card 
                                    sx={{ 
                                        background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)`,
                                        backdropFilter: 'blur(10px)',
                                        border: `2px solid ${theme.palette.secondary.main}30`,
                                        height: '100%',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                            boxShadow: `0 15px 40px ${theme.palette.secondary.main}80`,
                                            border: `2px solid ${theme.palette.secondary.main}60`
                                        }
                                    }}
                                >
                                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                        {/* Icon */}
                                        <Typography 
                                            sx={{ 
                                                fontSize: '4rem',
                                                mb: 2,
                                                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                                                display: 'block'
                                            }}
                                        >
                                            {service.icon}
                                        </Typography>
                                        
                                        {/* Title */}
                                        <Typography 
                                            variant="h4" 
                                            sx={{ 
                                                mb: 2,
                                                color: theme.palette.primary.main, // Green like HeroSection
                                                fontWeight: 'bold',
                                                textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                                            }}
                                        >
                                            {service.title}
                                        </Typography>
                                        
                                        {/* Description */}
                                        <Typography 
                                            variant="body1" 
                                            sx={{ 
                                                color: '#2a2a2a', // Dark gray for readability
                                                lineHeight: 1.6,
                                                fontSize: '1.1rem'
                                            }}
                                        >
                                            {service.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default ServicesSection;