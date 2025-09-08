import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const UrlStats = ({ urls }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Shortcode</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Expiry At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((url) => (
            <TableRow key={url.shortcode}>
              <TableCell>
                <a href={`http://localhost:3000/${url.shortcode}`} target="_blank" rel="noopener noreferrer">
                  {url.shortcode}
                </a>
              </TableCell>
              <TableCell>{url.originalUrl}</TableCell>
              <TableCell>{new Date(url.expiryAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UrlStats;
