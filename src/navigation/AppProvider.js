import React, { createContext } from 'react';
import { AuthProvider } from './AuthProvider';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const settings = {
    addSwitch: false,
    toggleSwitch: () => {
      settings.addSwitch = !settings.addSwitch;
    },
  };

  return (
    <AuthProvider>
      <AppContext.Provider
        value={settings}
      >
        {children}
      </AppContext.Provider>
    </AuthProvider>
  );
}