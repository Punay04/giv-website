import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const EmergencyDisaster = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const currentDisaster = {
    title: "Severe Flooding in Mumbai",
    location: "Mumbai, Maharashtra",
    time: "February 18, 2025 - 10:30 AM IST",
    description: "Heavy rainfall has caused severe flooding in multiple areas of Mumbai. Many residents are stranded and in need of immediate assistance. Emergency services are overwhelmed and seeking volunteer support.",
    impactedAreas: [
      "Dharavi",
      "Sion",
      "Kurla",
      "Chembur"
    ],
    requiredHelp: [
      "Rescue operations",
      "Medical assistance",
      "Food and water distribution",
      "Temporary shelter management"
    ]
  };

  return (
    <>
      <Box sx={{ width: '100%', mb: 2 }}>
        <Paper 
          elevation={3}
          sx={{
            backgroundColor: '#1a1a1a',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
          onClick={handleOpen}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WarningIcon sx={{ color: '#ff4444', mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ color: '#ff4444', fontWeight: 'bold' }}>
              EMERGENCY DISASTER!
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: '#ff4444' }}>
            Click for details
          </Typography>
        </Paper>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
          },
        }}
      >
        <DialogTitle 
          sx={{ 
            bgcolor: '#2d2d2d',
            color: '#ff4444',
            borderBottom: '1px solid #333333'
          }}
        >
          <Box display="flex" alignItems="center">
            <WarningIcon sx={{ mr: 1, color: '#ff4444' }} />
            {currentDisaster.title}
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ mt: 2, bgcolor: '#1a1a1a' }}>
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2,
              bgcolor: '#2d2d2d',
              color: '#ffffff',
              '& .MuiAlert-icon': {
                color: '#ff4444'
              }
            }}
          >
            Immediate assistance needed! Your help can make a difference.
          </Alert>
          
          <Typography variant="h6" gutterBottom sx={{ color: '#ff9800' }}>
            Location: <span style={{ color: '#ffffff' }}>{currentDisaster.location}</span>
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ color: '#ff9800' }}>
            Time: <span style={{ color: '#ffffff' }}>{currentDisaster.time}</span>
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ color: '#ffffff' }}>
            {currentDisaster.description}
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ color: '#ff9800' }}>
            Impacted Areas:
          </Typography>
          <ul style={{ color: '#ffffff' }}>
            {currentDisaster.impactedAreas.map((area, index) => (
              <li key={index}>
                <Typography variant="body1" sx={{ color: '#ffffff' }}>{area}</Typography>
              </li>
            ))}
          </ul>
          
          <Typography variant="h6" gutterBottom sx={{ color: '#ff9800' }}>
            Required Help:
          </Typography>
          <ul style={{ color: '#ffffff' }}>
            {currentDisaster.requiredHelp.map((help, index) => (
              <li key={index}>
                <Typography variant="body1" sx={{ color: '#ffffff' }}>{help}</Typography>
              </li>
            ))}
          </ul>
        </DialogContent>

        <DialogActions 
          sx={{ 
            p: 3, 
            display: 'flex', 
            justifyContent: 'space-between',
            bgcolor: '#1a1a1a',
            borderTop: '1px solid #333333'
          }}
        >
          <Button 
            variant="contained" 
            sx={{
              bgcolor: '#2e7d32',
              '&:hover': {
                bgcolor: '#1b5e20'
              }
            }}
            size="small"
            onClick={handleClose}
          >
            Donate Now
          </Button>
          <Button 
            variant="contained"
            sx={{
              bgcolor: '#ff4444',
              '&:hover': {
                bgcolor: '#cc0000'
              }
            }}
            size="large"
            onClick={handleClose}
          >
            Register to Help
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmergencyDisaster;
