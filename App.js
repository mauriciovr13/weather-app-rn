import React from 'react';
import Routes from './src/config/routes';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar />
      <Routes />
    </>
  );
};

export default App;
