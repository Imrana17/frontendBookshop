import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import InfiniteBookBackground from '../components/InfiniteBookBackground';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

const Welcome = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial app loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Adjust timing as needed

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingSpinner message="Welcome to Qwabs Books" />;
    }

    return (
        <>
            {/* Navbar - Only shows after loading */}
            <Navbar />
            
            <Box sx={{ 
                position: 'relative', 
                width: '100%', 
                height: '100vh', 
                overflow: 'hidden' 
            }}>
                {/* Animated Book Background */}
                <InfiniteBookBackground />
         
                {/* Content area - EMPTY for now */}
                <Box sx={{
                    position: 'relative',
                    zIndex: 2
                }}>
                    {/* We'll add content here later */}
                </Box>
            </Box>
        </>
    );
};

export default Welcome;