import React from 'react';
import { AppProvider } from './src/navigation/AppProvider';
import { MenuProvider } from 'react-native-popup-menu';
import Routes from './src/navigation/Routes';

const App = () => {
  return (
    <MenuProvider>
      <AppProvider>
        <Routes />
      </AppProvider>
    </MenuProvider>
  );
}

export default App;