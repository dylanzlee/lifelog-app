import React, { createContext, useState } from 'react';
import { auth, db } from '../../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth.signInWithEmailAndPassword(email, password);
          } catch (e) {
            alert(e);
          }
        },
        register: async (firstName, lastName, email, password) => {
          try {
            await auth.createUserWithEmailAndPassword(email, password).then(cred => {
              return db.collection('users').doc(cred.user.uid).set({
                name: {
                  first: firstName,
                  last: lastName,
                },
                numLogs: 0,
              });
            });
          } catch (e) {
            alert(e);
          }
        },
        logout: async () => {
          try {
            await auth.signOut();
          } catch (e) {
            alert(e);
          }
        },
        passwordReset: email => {
          return auth.sendPasswordResetEmail(email);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}