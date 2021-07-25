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
    // used as an indicator for when numEntries changes for a log
    updateEntries: false,
    setUpdateEntries: () => {
      settings.updateEntries = !settings.updateEntries;
    },
    // used to mark when an entry is added, updated or removed from a log's calendar
    addDate: false,
    toggleAddDate: () => {
      settings.addDate = !settings.addDate;
    },
    dateSelected: 'date',
    setDateSelected: date => {
      settings.dateSelected = date;
    },
    // used to indicate when the user has edited profile
    profileChange: false,
    toggleProfileChange: () => {
      settings.profileChange = !settings.profileChange;
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