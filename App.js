import React from 'react';
import Routes from './src/config/routes';
import { StatusBar } from 'react-native';
import ThemeProvider from './src/components/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <StatusBar />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
