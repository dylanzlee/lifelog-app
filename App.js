import React from 'react';
// import { AuthProvider } from './src/navigation/AuthProvider';
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