import React from 'react';
import { Box, Typography } from '@mui/material';

const CertificateTemplate = React.forwardRef(({ username, certificateType, date }, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        width: '800px',
        height: '600px',
        padding: '40px',
        position: 'fixed',
        left: '-9999px',
        top: 0,
        backgroundColor: '#ffffff',
      }}
    >
      {/* Border Design */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          border: '2px solid #C4A962',
          margin: '20px',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            bottom: '20px',
            border: '1px solid #C4A962',
          },
        }}
      >
        {/* Corner Designs */}
        <Box
          component="img"
          src="/corner-design.png"
          sx={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            top: '-10px',
            left: '-10px',
          }}
        />
        <Box
          component="img"
          src="/corner-design.png"
          sx={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            top: '-10px',
            right: '-10px',
            transform: 'rotate(90deg)',
          }}
        />
        <Box
          component="img"
          src="/corner-design.png"
          sx={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            bottom: '-10px',
            left: '-10px',
            transform: 'rotate(-90deg)',
          }}
        />
        <Box
          component="img"
          src="/corner-design.png"
          sx={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            bottom: '-10px',
            right: '-10px',
            transform: 'rotate(180deg)',
          }}
        />

        {/* Certificate Content */}
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '60px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#2C3E50',
                mb: 1,
              }}
            >
              CERTIFICATE
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#C4A962',
                fontWeight: 'medium',
                letterSpacing: '2px',
                mb: 4,
              }}
            >
              OF APPRECIATION
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography variant="h6" sx={{ mb: 4, color: '#2C3E50' }}>
              THIS CERTIFICATE RECOGNIZES THE CONTRIBUTION OF
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Dancing Script, cursive',
                color: '#2C3E50',
                mb: 4,
              }}
            >
              {username}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: '600px',
                margin: '0 auto',
                color: '#2C3E50',
                lineHeight: 1.6,
              }}
            >
              for their kindness, dedication, and compassion in brightening the lives of our
              community through volunteer service. Your selfless efforts have made a meaningful
              difference in our society.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              mt: 4,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#2C3E50' }}>
                {date}
              </Typography>
              <Box
                sx={{
                  width: '200px',
                  borderTop: '1px solid #2C3E50',
                  mt: 1,
                }}
              />
              <Typography variant="body2" sx={{ color: '#2C3E50', mt: 1 }}>
                DATE
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#2C3E50' }}>
                Giv
              </Typography>
              <Box
                sx={{
                  width: '200px',
                  borderTop: '1px solid #2C3E50',
                  mt: 1,
                }}
              />
              <Typography variant="body2" sx={{ color: '#2C3E50', mt: 1 }}>
                SIGNATURE
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default CertificateTemplate;
