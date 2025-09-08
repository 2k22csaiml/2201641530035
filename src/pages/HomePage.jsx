import React from 'react';
import { Container, Typography } from '@mui/material';
import UrlForm from '../components/UrlForm';

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Affordmed URL Shortener
      </Typography>
      <UrlForm />
    </Container>
  );
};

export default HomePage;
