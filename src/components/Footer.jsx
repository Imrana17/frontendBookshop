import React from 'react';
import { Box, Container, Typography, Grid, IconButton, Fade } from '@mui/material';
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
                py: 8,
                position: 'relative',
                zIndex: 2
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Brand Section */}
                    <Grid item xs={12} md={4}>
                        <Fade in={true} timeout={800}>
                            <Typography 
                                variant="h4" 
                                sx={{ 
                                    mb: 2,
                                    color: theme.palette.secondary.main,
                                    fontWeight: 'bold'
                                }}
                            >
                                Qwabs
                            </Typography>
                        </Fade>
                        
                        <Fade in={true} timeout={800} style={{ transitionDelay: '100ms' }}>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: '#ffffff',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                    lineHeight: 1.6,
                                    mb: 3
                                }}
                            >
                                Your gateway to knowledge and entertainment. 
                                Discover books, articles, and resources that 
                                inspire and educate.
                            </Typography>
                        </Fade>
                    </Grid>
                    
                    {/* Footer Links */}
                    {footerSections.map((section, index) => (
                        <Grid item xs={12} md={2} key={index}>
                            <Fade in={true} timeout={800} style={{ transitionDelay: `${200 + (index * 100)}ms` }}>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        mb: 2,
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                                    }}
                                >
                                    {section.title}
                                </Typography>
                            </Fade>
                            
                            {section.links.map((link, linkIndex) => (
                                <Fade in={true} timeout={800} style={{ transitionDelay: `${300 + (linkIndex * 50)}ms` }} key={linkIndex}>
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            mb: 1,
                                            color: '#ffffff',
                                            opacity: 0.8,
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                            '&:hover': {
                                                opacity: 1,
                                                color: theme.palette.secondary.main,
                                                transform: 'translateX(5px)'
                                            }
                                        }}
                                    >
                                        {link}
                                    </Typography>
                                </Fade>
                            ))}
                        </Grid>
                    ))}
                    
                    {/* Social Links */}
                    <Grid item xs={12} md={2}>
                        <Fade in={true} timeout={800} style={{ transitionDelay: '500ms' }}>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    mb: 2,
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                                }}
                            >
                                Follow Us
                            </Typography>
                        </Fade>
                        
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {['📘', '🐦', '📷', '💼'].map((icon, index) => (
                                <Fade in={true} timeout={800} style={{ transitionDelay: `${600 + (index * 100)}ms` }} key={index}>
                                    <IconButton
                                        sx={{
                                            color: '#ffffff',
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            '&:hover': {
                                                backgroundColor: theme.palette.secondary.main,
                                                color: 'black',
                                                transform: 'scale(1.1)'
                                            }
                                        }}
                                    >
                                        {icon}
                                    </IconButton>
                                </Fade>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
                
                {/* Copyright */}
                <Fade in={true} timeout={800} style={{ transitionDelay: '700ms' }}>
                    <Box 
                        sx={{ 
                            mt: 6,
                            pt: 4,
                            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                            textAlign: 'center'
                        }}
                    >
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: '#ffffff',
                                opacity: 0.7,
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                            }}
                        >
                            © 2025 Qwabs. All rights reserved. | Designed with ❤️ for readers
                        </Typography>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default Footer;