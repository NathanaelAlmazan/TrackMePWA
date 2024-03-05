import { ReactNode, useMemo } from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, Theme, Components, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import palette from './palette';
import shadows from './shadows';
import overrides from './overrides';
import typography from './typography';
import customShadows from './customShadows';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const memoizedValue = useMemo(
    () => ({
      palette: palette,
      typography,
      shadows: shadows,
      customShadows: customShadows,
      shape: { borderRadius: 8 },
    }),
    []
  );

  const theme = createTheme(memoizedValue as unknown as Theme);

  theme.components = overrides(theme) as unknown as Components;

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
