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

  const menuItems = ['Home', 'Articles', 'Books', 'Login'];

  return (
    <AppBar 
      position="fixed" 
      color="inherit" 
      elevation={0}
      sx={{
        // Transparent background for both desktop and mobile
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: 'primary.main',
            flexGrow: { xs: 1, md: 0 },
          }}
        >
          📚 
        </Typography>

        {/* Desktop Menu */}
        {!isMobile && (
          <Box>
            {menuItems.map((item) => (
              <Button
                key={item}
                size="large"
                sx={{
                  color: 'primary.main',
                  mx: 1,
                  fontWeight: 'bold',
                  fontSize: '16px',
                  backgroundColor: 'transparent',
                  height: '38px',
                  width: item === 'Articles' ? '100px' : '85px',
                  '&:hover': {
                    backgroundColor: 'primary.main',
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
              color="inherit"
              onClick={handleMenuOpen}
              aria-label="menu"
              sx={{ 
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'secondary.main',
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
                  // Semi-transparent background for mobile menu
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item}
                  onClick={handleMenuClose}
                  sx={{
                    color: 'primary.main',
                    fontWeight: 'bold',
                    width: '700px',
                    '&:hover': {
                      backgroundColor: 'primary.main',
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