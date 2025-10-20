import React from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Card, CardContent } from '@mui/material';
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
                py: 10,
                backgroundColor: 'rgba(27, 94, 32, 0.8)',
                position: 'relative',
                zIndex: 2
            }}
        >
            <Container maxWidth="lg">
                <Typography 
                    variant="h2" 
                    align="center" 
                    sx={{ 
                        mb: 2,
                        color: 'text.primary',
                        fontWeight: 'bold'
                    }}
                    data-aos="fade-up"
                >
                    Get In Touch
                </Typography>
                <Typography 
                    variant="h6" 
                    align="center" 
                    sx={{ 
                        mb: 6,
                        color: 'text.secondary'
                    }}
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </Typography>
                
                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                        <Box 
                            component="form"
                            sx={{ mt: 4 }}
                            data-aos="fade-right"
                            data-aos-delay="200"
                        >
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                color: 'white',
                                                '& fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'secondary.main',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'rgba(255, 255, 255, 0.7)',
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
                                                color: 'white',
                                                '& fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'secondary.main',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'rgba(255, 255, 255, 0.7)',
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
                                                color: 'white',
                                                '& fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'secondary.main',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'rgba(255, 255, 255, 0.7)',
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
                                                color: 'white',
                                                '& fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'secondary.main',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'rgba(255, 255, 255, 0.7)',
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
                                            backgroundColor: 'secondary.main',
                                            color: 'black',
                                            py: 1.5,
                                            fontSize: '1.1rem',
                                            fontWeight: 'bold',
                                            '&:hover': {
                                                backgroundColor: 'secondary.light',
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                    >
                                        Send Message
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            {contactMethods.map((method, index) => (
                                <Grid item xs={12} key={index}>
                                    <Card 
                                        sx={{ 
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 215, 0, 0.2)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateX(10px)',
                                                boxShadow: `0 10px 25px ${theme.palette.primary.main}30`
                                            }
                                        }}
                                        data-aos="fade-left"
                                        data-aos-delay={method.delay}
                                    >
                                        <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
                                            <Typography variant="h3" sx={{ color: 'secondary.main' }}>
                                                {method.icon}
                                            </Typography>
                                            <Box>
                                                <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                                                    {method.title}
                                                </Typography>
                                                <Typography variant="body1" sx={{ color: 'text.primary', opacity: 0.9 }}>
                                                    {method.detail}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
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