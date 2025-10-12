import React from 'react';
import { Box } from '@mui/material';
import InfiniteBookBackground from '../components/InfiniteBookBackground';

const LandingPage = () => {
    return (
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
    );
};

export default LandingPage;