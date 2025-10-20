import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
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
                py: 10,
                backgroundColor: 'rgba(27, 94, 32, 0.8)',
                position: 'relative',
                zIndex: 2
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                    <Typography 
                        variant="h2" 
                        sx={{ 
                            color: 'text.primary',
                            fontWeight: 'bold'
                        }}
                        data-aos="fade-right"
                    >
                        Recent Articles
                    </Typography>
                    <Button 
                        variant="outlined"
                        sx={{
                            color: 'secondary.main',
                            borderColor: 'secondary.main',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                borderColor: 'secondary.light'
                            }
                        }}
                        data-aos="fade-left"
                    >
                        View All Articles
                    </Button>
                </Box>
                
                <Grid container spacing={4}>
                    {articles.map((article, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card 
                                sx={{ 
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 215, 0, 0.1)',
                                    height: '100%',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: `0 15px 35px ${theme.palette.primary.main}40`
                                    }
                                }}
                                data-aos="flip-up"
                                data-aos-delay={article.delay}
                            >
                                <CardContent sx={{ p: 4 }}>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            color: 'secondary.main',
                                            mb: 1,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {article.category}
                                    </Typography>
                                    <Typography 
                                        variant="h5" 
                                        sx={{ 
                                            mb: 2,
                                            color: 'text.primary',
                                            fontWeight: 'bold',
                                            lineHeight: 1.3
                                        }}
                                    >
                                        {article.title}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            mb: 3,
                                            color: 'text.primary',
                                            opacity: 0.8,
                                            lineHeight: 1.6
                                        }}
                                    >
                                        {article.excerpt}
                                    </Typography>
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            color: 'text.secondary',
                                            fontStyle: 'italic'
                                        }}
                                    >
                                        {article.readTime}
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

export default RecentArticles;