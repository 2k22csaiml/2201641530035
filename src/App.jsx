import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import RedirectPage from './pages/RedirectPage';
import { Container, CssBaseline } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import { useLogging } from './hooks/useLogging';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const { log } = useLogging();
  React.useEffect(() => {
    log(`ErrorBoundary caught an error: ${error.message}`, 'error');
  }, [error, log]);

  return (
    <Container role="alert" sx={{ mt: 4 }}>
      <h2>Something went wrong.</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </Container>
  );
};

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/:shortcode" element={<RedirectPage />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </>
  );
}

export default App;
