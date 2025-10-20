import { createTheme } from '@mui/material/styles';

// Green and Gold color palette
const greenGoldTheme = createTheme({
  palette: {
    primary: {
      // Main green colors
      main: '#2E8B57',      // Sea Green
      light: '#3CB371',     // Medium Sea Green
      dark: '#228B22',      // Forest Green
      contrastText: '#FFFFFF',
    },
    secondary: {
      // Gold colors
      main: '#FFD700',      // Gold
      light: '#FFDF00',     // Golden Yellow
      dark: '#DAA520',      // Goldenrod
      contrastText: '#000000',
    },
    success: {
      main: '#32CD32',      // Lime Green
      light: '#90EE90',     // Light Green
      dark: '#006400',      // Dark Green
    },
    warning: {
      main: '#FFA500',      // Orange
      light: '#FFB74D',     // Light Orange
      dark: '#F57C00',      // Dark Orange
    },
    background: {
      default: '#0A2F0A',   // Dark Green Background
      paper: '#1B5E20',     // Medium Green Surface
    },
    text: {
      primary: '#FFFFFF',   // White text
      secondary: '#FFD700', // Gold text
      disabled: '#90A4AE',  // Gray text
    },
    // Custom colors for specific use cases
    custom: {
      emerald: '#50C878',   // Emerald Green
      olive: '#808000',     // Olive Green
      forest: '#228B22',    // Forest Green
      golden: '#FFD700',    // Gold
      bronze: '#CD7F32',    // Bronze
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 600,
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #2E8B57 30%, #32CD32 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #228B22 30%, #2E8B57 90%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
          color: '#000000',
          '&:hover': {
            background: 'linear-gradient(45deg, #DAA520 30%, #FFD700 90%)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default greenGoldTheme;