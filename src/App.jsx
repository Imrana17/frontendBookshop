import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Welcome from './pages/welcome';
import LoadingSpinner from './components/LoadingSpinner';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import greenGoldTheme from './theme/theme';

function App() {
  const [appLoading, setAppLoading] = useState(true);

  // Simulate initial app loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (appLoading) {
    return <LoadingSpinner message="Initializing Qwabs Books..." />;
  }

  return (
    <ThemeProvider theme={greenGoldTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Welcome />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
