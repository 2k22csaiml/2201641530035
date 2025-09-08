import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
} from '@mui/material';
import { getAllUrls } from '../utils/persistence';
import ClickDetailsDialog from './ClickDetailsDialog';

const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState([]);

  useEffect(() => {
    setUrls(getAllUrls());
  }, []);

  const handleViewDetails = (clickDetails) => {
    setSelectedDetails(clickDetails);
    setDialogOpen(true);
  };

  const isExpired = (expiryAt) => new Date(expiryAt) < new Date();

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shortcode</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Expiry At</TableCell>
              <TableCell>Total Clicks</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url.shortcode} sx={{ opacity: isExpired(url.expiryAt) ? 0.5 : 1 }}>
                <TableCell>{url.shortcode}</TableCell>
                <TableCell>{url.originalUrl}</TableCell>
                <TableCell>{new Date(url.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  {new Date(url.expiryAt).toLocaleString()}
                  {isExpired(url.expiryAt) && <Chip label="Expired" color="error" size="small" sx={{ ml: 1 }} />}
                </TableCell>
                <TableCell>{url.clicks}</TableCell>
                <TableCell>
                  <Button onClick={() => handleViewDetails(url.clickDetails)}>View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ClickDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        clickDetails={selectedDetails}
      />
    </>
  );
};

export default UrlList;
