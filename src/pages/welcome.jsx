import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import InfiniteBookBackground from '../components/InfiniteBookBackground';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import RecentArticles from '../components/RecentArticles';
import AboutUs from '../components/AboutUs';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Welcome = () => {
    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }, []);

    return (
        <>
            <Navbar />
            
            <Box sx={{ 
                position: 'relative', 
                width: '100%', 
                overflow: 'hidden',
                minHeight: '100vh'
            }}>
                {/* Animated Book Background */}
                <InfiniteBookBackground />
         
                {/* Main Content Container - This wraps ALL your content */}
                <Box sx={{ 
                    position: 'relative', 
                    zIndex: 10  // This brings content to front over the background
                }}>
                    {/* Hero Section */}
                    <HeroSection />
                    
                    {/* Services Section */}
                    <ServicesSection />
                    
                    {/* Recent Articles */}
                    <RecentArticles />
                    
                    {/* About Us */}
                    <AboutUs />
                    
                    {/* Contact Section */}
                    <ContactSection />
                    
                    {/* Footer */}
                    <Footer />
                </Box>
            </Box>
        </>
    );
};

export default Welcome;