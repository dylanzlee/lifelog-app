import React, { createContext } from 'react';
import { AuthProvider } from './AuthProvider';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const settings = {
    // used to mark when a log is added or deleted
    addSwitch: false,
    toggleSwitch: () => {
      settings.addSwitch = !settings.addSwitch;
    },
    updateEntries: false, // used as an indicator for when numEntries changes for a log
    setUpdateEntries: () => {
      settings.updateEntries = !settings.updateEntries;
    },
    addDate: false, // used to mark when an entry is added, updated or removed from a log's calendar
    toggleAddDate: () => {
      settings.addDate = !settings.addDate;
    },
    dateSelected: 'date',
    setDateSelected: date => {
      settings.dateSelected = date;
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