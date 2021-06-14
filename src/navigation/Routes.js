import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from '../../firebase';
import { AuthContext } from './AuthProvider';
import AuthNavigator from './AuthNavigator';
import TabStackNavigator from './TabNavigator';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      { user ? <TabStackNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default Routes;