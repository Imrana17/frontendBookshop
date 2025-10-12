import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#006400',// Deep Green
      light: '#338033',
      dark: '#004700',
      contrastText: '#ffffff', 
    },
    secondary: {
      main: '#FFD700', // Gold
      light: '#ffdf33',
      dark: '#b29700',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
