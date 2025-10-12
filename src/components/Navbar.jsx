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
    <AppBar position="fixed" color="inherit" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: 'primary.main',
            flexGrow: { xs: 1, md: 0 },
          }}
        >
          📚 MyBookShop
        </Typography>

        {/* Desktop Menu */}
        {!isMobile && (
          <Box>
            {menuItems.map((item) => (
              <Button
                key={item}
                size="large"
                sx={{
                  color: 'secondary.main',
                  mx: 1,
                  fontWeight: 'bold',
                  fontSize: '16px',
                  backgroundColor: 'white',
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
                  backgroundColor: 'white',
                  border: '1px solid #ddd',

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
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'secondary.main',
                      },
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
