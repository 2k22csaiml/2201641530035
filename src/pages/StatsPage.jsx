import React from 'react';
import { Container, Typography } from '@mui/material';
import UrlList from '../components/UrlList';

const StatsPage = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        URL Shortener Stats
      </Typography>
      <UrlList />
    </Container>
  );
};

export default StatsPage;
