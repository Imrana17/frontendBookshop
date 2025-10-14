import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Welcome from './pages/Welcome';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [appLoading, setAppLoading] = useState(true);

  // Simulate initial app loading
  useState(() => {
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (appLoading) {
    return <LoadingSpinner message="Initializing Qwabs Books..." />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;