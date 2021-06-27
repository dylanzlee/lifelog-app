import React from 'react';
import { AuthProvider } from './src/navigation/AuthProvider';
import Routes from './src/navigation/Routes';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;