import { useMemo } from 'react';
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';

const font = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

export const AppTheme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dark = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });

  const theme = useMemo(
    () =>
      createTheme({
        palette: dark
          ? {
              mode: 'dark',
              primary: { main: '#34d399', contrastText: '#052e1f' },
              error: { main: '#ff7b8a' },
              background: { default: '#0d1117', paper: '#151b24' },
              text: { primary: '#e6edf3', secondary: '#8b98a9' },
              divider: '#263041',
            }
          : {
              mode: 'light',
              primary: { main: '#0f9d6e', contrastText: '#ffffff' },
              error: { main: '#c0334a' },
              background: { default: '#f3f5f8', paper: '#ffffff' },
              text: { primary: '#1a2230', secondary: '#64718a' },
              divider: '#dde3ec',
            },
        shape: { borderRadius: 10 },
        typography: {
          fontFamily: font,
          button: { textTransform: 'none', fontWeight: 600 },
        },
        components: {
          MuiButton: { defaultProps: { disableElevation: true } },
        },
      }),
    [dark]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
