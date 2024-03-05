import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import RouterLink from './RouterLink';

// ----------------------------------------------------------------------

const Logo = forwardRef<HTMLDivElement, { disabledLink?: boolean, sx?: object }>(({ disabledLink = false, sx, ...other }, ref) => {

  const logo = (
    <Box
      ref={ref}
      component="img"
      src='/logo512.png'
      sx={{
        width: 40,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

export default Logo;