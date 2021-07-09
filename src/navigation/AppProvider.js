import React, { createContext } from 'react';
import { AuthProvider } from './AuthProvider';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const settings = {
    addSwitch: false,
    toggleSwitch: () => {
      settings.addSwitch = !settings.addSwitch;
    },
    updateEntries: false,
    setUpdateEntries: () => {
      settings.updateEntries = !settings.updateEntries;
    },
    addDate: false,
    toggleAddDate: () => {
      settings.addDate = !settings.addDate;
    },
    dateSelected: 'date',
    setDateSelected: date => {
      settings.dateSelected = date;
    }
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