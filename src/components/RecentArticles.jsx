import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const RecentArticles = () => {
    const theme = useTheme();

    const articles = [
        {
            title: 'The Future of Digital Reading',
            excerpt: 'Exploring how technology is transforming the way we read and consume literature in the digital age.',
            category: 'Technology',
            readTime: '5 min read',
            delay: 100
        },
        {
            title: 'Sustainable Publishing Practices',
            excerpt: 'How the publishing industry is embracing eco-friendly practices and reducing its environmental impact.',
            category: 'Environment',
            readTime: '4 min read',
            delay: 200
        },
        {
            title: 'The Rise of Independent Authors',
            excerpt: 'The growing trend of self-publishing and how it\'s changing the literary landscape for writers.',
            category: 'Publishing',
            readTime: '6 min read',
            delay: 300
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
        >
            <Container maxWidth="lg">
                {/* Header Section */}
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mb: 8 
                    }}
                >
                    <Fade in={true} timeout={800}>
                        <Typography 
                            variant="h2" 
                            sx={{ 
                                color: theme.palette.secondary.main,
                                fontWeight: 'bold',
                                textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                                fontSize: { xs: '2.5rem', md: '3.5rem' }
                            }}
                        >
                            Recent Articles
                        </Typography>
                    </Fade>
                    
                    <Fade in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
                        <Button 
                            variant="outlined"
                            sx={{
                                color: theme.palette.secondary.main,
                                borderColor: theme.palette.secondary.main,
                                px: 4,
                                py: 1,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                    borderColor: theme.palette.secondary.light,
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            View All Articles
                        </Button>
                    </Fade>
                </Box>
                
                {/* Articles Grid */}
                <Grid container spacing={4}>
                    {articles.map((article, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Fade in={true} timeout={800} style={{ transitionDelay: `${article.delay}ms` }}>
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
                                    <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        {/* Category */}
                                        <Typography 
                                            variant="h6" 
                                            sx={{ 
                                                color: theme.palette.primary.main,
                                                mb: 2,
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {article.category}
                                        </Typography>
                                        
                                        {/* Title */}
                                        <Typography 
                                            variant="h5" 
                                            sx={{ 
                                                mb: 3,
                                                color: '#2a2a2a',
                                                fontWeight: 'bold',
                                                lineHeight: 1.3,
                                                flexGrow: 1
                                            }}
                                        >
                                            {article.title}
                                        </Typography>
                                        
                                        {/* Excerpt */}
                                        <Typography 
                                            variant="body1" 
                                            sx={{ 
                                                mb: 3,
                                                color: '#555555',
                                                lineHeight: 1.6
                                            }}
                                        >
                                            {article.excerpt}
                                        </Typography>
                                        
                                        {/* Read Time */}
                                        <Typography 
                                            variant="caption" 
                                            sx={{ 
                                                color: '#888888',
                                                fontStyle: 'italic',
                                                mt: 'auto'
                                            }}
                                        >
                                            {article.readTime}
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

export default RecentArticles;