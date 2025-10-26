import React from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Card, CardContent, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ContactSection = () => {
    const theme = useTheme();

    const contactMethods = [
        {
            icon: '📧',
            title: 'Email Us',
            detail: 'hello@qwabs.com',
            delay: 100
        },
        {
            icon: '📞',
            title: 'Call Us',
            detail: '+1 (555) 123-4567',
            delay: 200
        },
        {
            icon: '📍',
            title: 'Visit Us',
            detail: '123 Book Street, Knowledge City',
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
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Fade in={true} timeout={800}>
                        <Typography 
                            variant="h2" 
                            sx={{ 
                                mb: 2,
                                color: theme.palette.secondary.main,
                                fontWeight: 'bold',
                                textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                                fontSize: { xs: '2.5rem', md: '3.5rem' }
                            }}
                        >
                            Get In Touch
                        </Typography>
                    </Fade>
                    
                    <Fade in={true} timeout={800} style={{ transitionDelay: '100ms' }}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                color: theme.palette.primary.main,
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                maxWidth: '600px',
                                margin: '0 auto',
                                lineHeight: 1.6,
                                fontSize: { xs: '1rem', md: '1.2rem' }
                            }}
                        >
                            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </Typography>
                    </Fade>
                </Box>
                
                {/* Content */}
                <Grid container spacing={6}>
                    {/* Contact Form */}
                    <Grid item xs={12} md={6}>
                        <Fade in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
                            <Box 
                                component="form"
                                sx={{ 
                                    background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)`,
                                    padding: 4,
                                    borderRadius: '20px',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                                    border: `2px solid ${theme.palette.secondary.main}30`
                                }}
                            >
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    color: '#2a2a2a',
                                                    '& fieldset': {
                                                        borderColor: '#ddd',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: '#666',
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    color: '#2a2a2a',
                                                    '& fieldset': {
                                                        borderColor: '#ddd',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: '#666',
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    color: '#2a2a2a',
                                                    '& fieldset': {
                                                        borderColor: '#ddd',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: '#666',
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Message"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    color: '#2a2a2a',
                                                    '& fieldset': {
                                                        borderColor: '#ddd',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: '#666',
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
                                                color: '#000000',
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
                                            Send Message
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Fade>
                    </Grid>
                    
                    {/* Contact Methods */}
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            {contactMethods.map((method, index) => (
                                <Grid item xs={12} key={index}>
                                    <Fade in={true} timeout={800} style={{ transitionDelay: `${method.delay}ms` }}>
                                        <Card 
                                            sx={{ 
                                                background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)`,
                                                backdropFilter: 'blur(10px)',
                                                border: `2px solid ${theme.palette.secondary.main}30`,
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                                                '&:hover': {
                                                    transform: 'translateX(10px)',
                                                    boxShadow: `0 15px 40px ${theme.palette.secondary.main}80`
                                                }
                                            }}
                                        >
                                            <CardContent sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
                                                <Typography variant="h2" sx={{ color: theme.palette.secondary.main }}>
                                                    {method.icon}
                                                </Typography>
                                                <Box>
                                                    <Typography variant="h5" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 1 }}>
                                                        {method.title}
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ color: '#555555', fontSize: '1.1rem' }}>
                                                        {method.detail}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Fade>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ContactSection;