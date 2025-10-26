import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = ['HOME', 'ABOUT', 'SERVICES', 'CLIENTS', 'CONTACT'];

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        boxShadow: 'none',
        pt: 2
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 6 } }}>
        {/* Desktop Menu - Shifted to left side */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 1, ml: -1 }}>
            {menuItems.map((item) => (
              <Button
                key={item}
                size="large"
                sx={{
                  color: 'text.primary',
                  px: 2,
                  fontWeight: 'bold',
                  fontSize: '14px',
                  backgroundColor: 'transparent',
                  height: '38px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(46, 139, 87, 0.2)',
                    color: 'secondary.main',
                  }
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        )}

        {/* Mobile Menu - Hamburger stays on right side */}
        {isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mr: 2 }}>
           <IconButton
  edge="end"
  onClick={handleMenuOpen}
  aria-label="menu"
  sx={{ 
    color: 'text.primary',
    '&:hover': {
      backgroundColor: 'rgba(46, 139, 87, 0.2)',
      color: 'secondary.main'
    },
    // Responsive padding for larger touch target
    padding: {
      xs: 2, // Larger on mobile (16px)
      sm: 1, // Normal on larger screens (8px)
    }
  }}
>
  <MenuIcon 
    sx={{
      fontSize: {
        xs: '2rem', // Larger on mobile (32px)
        sm: '1.5rem', // Medium on tablet (24px)
        md: '1.25rem' // Normal on desktop (20px)
      }
    }}
  />
</IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              keepMounted
              PaperProps={{
                sx: {
                  backgroundColor: 'rgba(10, 47, 10, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                },
              }}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item}
                  onClick={handleMenuClose}
                  sx={{
                    color: 'text.primary',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 215, 0, 0.1)',
                      color: 'secondary.main',
                    },
                  }}
                >
                  {item}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;