import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Welcome from './pages/welcome';
import Articles from './pages/Articles';
import LoadingSpinner from './components/LoadingSpinner';
// import PageLoadingSpinner from './components/PageLoadingSpinner';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import greenGoldTheme from './theme/theme';

function App() {
  const [appLoading, setAppLoading] = useState(true);

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
            <Route path="/articles" element={<Articles />} />
            {/* <Route path="/loading" element={<PageLoadingSpinner message="Loading Articles..." />} /> */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;