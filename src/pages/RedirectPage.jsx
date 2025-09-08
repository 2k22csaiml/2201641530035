import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Alert } from '@mui/material';
import { getUrl, incrementClicks } from '../utils/persistence';
import { useLogging } from '../hooks/useLogging';

const RedirectPage = () => {
  const { shortcode } = useParams();
  const { log } = useLogging();
  const url = getUrl(shortcode);

  useEffect(() => {
    if (!url) {
      log(`Shortcode not found: ${shortcode}`, 'warn');
      return;
    }
    if (new Date(url.expiryAt) < new Date()) {
      log(`Expired shortcode accessed: ${shortcode}`, 'warn');
      return;
    }
    const clickDetail = {
      timestamp: new Date().toISOString(),
      source: document.referrer || 'direct',
      coarseGeo: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    incrementClicks(shortcode, clickDetail);
    log(`Redirecting to ${url.originalUrl} for ${shortcode}`, 'info');
    window.location.href = url.originalUrl;
  }, [shortcode, url, log]);

  if (!url) {
    return (
      <Container maxWidth="md">
        <Alert severity="error">Shortcode not found</Alert>
      </Container>
    );
  }

  if (new Date(url.expiryAt) < new Date()) {
    return (
      <Container maxWidth="md">
        <Alert severity="warning">This link has expired</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography>Redirecting...</Typography>
    </Container>
  );
};

export default RedirectPage;
