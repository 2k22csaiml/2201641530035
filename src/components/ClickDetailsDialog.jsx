import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const ClickDetailsDialog = ({ open, onClose, clickDetails }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Click Details</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Coarse Geo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clickDetails.map((click, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{click.source}</TableCell>
                  <TableCell>{click.coarseGeo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default ClickDetailsDialog;
