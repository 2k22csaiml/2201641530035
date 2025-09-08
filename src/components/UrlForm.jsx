import React, { useState } from 'react';
import { TextField, Button, Grid, Alert, Box, Typography } from '@mui/material';
import { useLogging } from '../hooks/useLogging';
import { validateUrl, validateValidityMinutes, validateShortcode } from '../utils/validation';
import { generateUniqueShortcode } from '../utils/shortcode';
import { addUrl } from '../utils/persistence';

const UrlForm = () => {
  const { log } = useLogging();
  const [urls, setUrls] = useState([{ originalUrl: '', validityMinutes: '', preferredShortcode: '' }]);
  const [errors, setErrors] = useState([]);
  const [results, setResults] = useState([]);

  const handleAddRow = () => {
    if (urls.length < 5) {
      setUrls([...urls, { originalUrl: '', validityMinutes: '', preferredShortcode: '' }]);
    }
  };

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    log('Form submitted', 'info');
    const newErrors = [];
    const newResults = [];
    urls.forEach((url, index) => {
      if (!url.originalUrl) return;
      if (!validateUrl(url.originalUrl)) {
        newErrors.push(`Row ${index + 1}: Invalid URL`);
        return;
      }
      if (!validateValidityMinutes(url.validityMinutes)) {
        newErrors.push(`Row ${index + 1}: Invalid validity minutes`);
        return;
      }
      if (url.preferredShortcode && !validateShortcode(url.preferredShortcode)) {
        newErrors.push(`Row ${index + 1}: Invalid or duplicate shortcode`);
        return;
      }
      const shortcode = url.preferredShortcode || generateUniqueShortcode();
      const validity = url.validityMinutes ? parseInt(url.validityMinutes, 10) : 30;
      addUrl(shortcode, url.originalUrl, validity);
      newResults.push({ shortcode, originalUrl: url.originalUrl });
      log(`URL shortened: ${url.originalUrl} to ${shortcode}`, 'info');
    });
    setErrors(newErrors);
    setResults(newResults);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6">Shorten URLs</Typography>
      {urls.map((url, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Original URL"
              value={url.originalUrl}
              onChange={(e) => handleChange(index, 'originalUrl', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Validity (min)"
              value={url.validityMinutes}
              onChange={(e) => handleChange(index, 'validityMinutes', e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Preferred Shortcode"
              value={url.preferredShortcode}
              onChange={(e) => handleChange(index, 'preferredShortcode', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Button onClick={handleAddRow} disabled={urls.length >= 5}>Add Row</Button>
      <Button type="submit" variant="contained" sx={{ ml: 2 }}>Shorten</Button>
      {errors.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {errors.map((error, index) => (
            <Alert key={index} severity="error">{error}</Alert>
          ))}
        </Box>
      )}
      {results.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Created Short Links</Typography>
          {results.map((result, index) => (
            <Typography key={index}>
              <a href={`http://localhost:3000/${result.shortcode}`} target="_blank" rel="noopener noreferrer">
                http://localhost:3000/{result.shortcode}
              </a> → {result.originalUrl}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UrlForm;
