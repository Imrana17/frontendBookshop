import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Welcome from './pages/welcome';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import LoadingSpinner from './components/LoadingSpinner';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import greenGoldTheme from './theme/theme';
import Books from './pages/Books';
import BookDetail from './pages/BooksDetail';
import BookReader from './pages/BooksReader';

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
        <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/:id/read" element={<BookReader />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;