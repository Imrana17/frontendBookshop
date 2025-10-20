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
                overflow: 'hidden'
            }}>
                {/* Animated Book Background */}
                <InfiniteBookBackground />
         
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
        </>
    );
};

export default Welcome;