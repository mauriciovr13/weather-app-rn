import React from 'react';
import { ThemeProvider as DefaultThemeProvider } from 'styled-components/native';

import colors from '../config/colors';

const ThemeProvider = ({ children }) => (
  <DefaultThemeProvider theme={{ colors }}>{children}</DefaultThemeProvider>
);

export default ThemeProvider;
