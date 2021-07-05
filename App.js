import React from 'react';
import { AppProvider } from './src/navigation/AppProvider';
import Routes from './src/navigation/Routes';

const App = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;