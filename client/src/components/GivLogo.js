import React from 'react';
import { Box } from '@mui/material';

const GivLogo = (props) => (
  <Box
    component="img"
    src="/giv-logo.png"
    alt="Giv Logo"
    sx={{
      height: '28px',
      width: 'auto',
      marginRight: 1,
      display: 'inline-block',
      verticalAlign: 'middle',
      ...props.sx
    }}
    {...props}
  />
);

export default GivLogo;
