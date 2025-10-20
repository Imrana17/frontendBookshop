import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
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
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 } }}>
        {/* Logo/Title */}
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: 'secondary.main',
            flexGrow: { xs: 1, md: 0 },
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Qwabs
        </Typography>

        {/* Desktop Menu */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 1 }}>
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

        {/* Mobile Menu */}
        {isMobile && (
          <>
            <IconButton
              edge="end"
              onClick={handleMenuOpen}
              aria-label="menu"
              sx={{ 
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'rgba(46, 139, 87, 0.2)',
                  color: 'secondary.main',
                }
              }}
            >
              <MenuIcon />
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
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;