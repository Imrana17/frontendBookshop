import React from 'react';
import { Box, Container, Typography, Grid, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
    const theme = useTheme();

    const footerSections = [
        {
            title: 'Explore',
            links: ['Books', 'E-Books', 'Articles', 'Audio Books']
        },
        {
            title: 'Company',
            links: ['About Us', 'Careers', 'Press', 'Blog']
        },
        {
            title: 'Support',
            links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service']
        }
    ];

    return (
        <Box 
            sx={{ 
                py: 6,
                backgroundColor: 'rgba(10, 47, 10, 0.95)',
                borderTop: '1px solid rgba(255, 215, 0, 0.2)',
                position: 'relative',
                zIndex: 2
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                mb: 2,
                                color: 'secondary.main',
                                fontWeight: 'bold'
                            }}
                            data-aos="fade-up"
                        >
                            Qwabs
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                color: 'text.primary',
                                opacity: 0.8,
                                lineHeight: 1.6,
                                mb: 3
                            }}
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            Your gateway to knowledge and entertainment. 
                            Discover books, articles, and resources that 
                            inspire and educate.
                        </Typography>
                    </Grid>
                    
                    {footerSections.map((section, index) => (
                        <Grid item xs={12} md={2} key={index}>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    mb: 2,
                                    color: 'text.primary',
                                    fontWeight: 'bold'
                                }}
                                data-aos="fade-up"
                                data-aos-delay={200 + (index * 100)}
                            >
                                {section.title}
                            </Typography>
                            {section.links.map((link, linkIndex) => (
                                <Typography 
                                    key={linkIndex}
                                    variant="body2" 
                                    sx={{ 
                                        mb: 1,
                                        color: 'text.primary',
                                        opacity: 0.7,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            opacity: 1,
                                            color: 'secondary.main',
                                            transform: 'translateX(5px)'
                                        }
                                    }}
                                    data-aos="fade-up"
                                    data-aos-delay={300 + (linkIndex * 50)}
                                >
                                    {link}
                                </Typography>
                            ))}
                        </Grid>
                    ))}
                    
                    <Grid item xs={12} md={2}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                mb: 2,
                                color: 'text.primary',
                                fontWeight: 'bold'
                            }}
                            data-aos="fade-up"
                            data-aos-delay="500"
                        >
                            Follow Us
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {['📘', '🐦', '📷', '💼'].map((icon, index) => (
                                <IconButton
                                    key={index}
                                    sx={{
                                        color: 'text.primary',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        '&:hover': {
                                            backgroundColor: 'secondary.main',
                                            color: 'black',
                                            transform: 'scale(1.1)'
                                        }
                                    }}
                                    data-aos="zoom-in"
                                    data-aos-delay={600 + (index * 100)}
                                >
                                    {icon}
                                </IconButton>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
                
                <Box 
                    sx={{ 
                        mt: 4,
                        pt: 3,
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        textAlign: 'center'
                    }}
                >
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: 'text.primary',
                            opacity: 0.6
                        }}
                        data-aos="fade-in"
                    >
                        © 2025 Qwabs. All rights reserved. | Designed with ❤️ for readers
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;