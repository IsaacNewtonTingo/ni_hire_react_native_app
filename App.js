import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './src/navigators/authStack';

import {CredentialsContext} from './src/components/credentials-context';

import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  // 'Setting a timer for a long period of time',
  // 'Warning: Each child in a list should have a unique',
  // 'Unhandled promise rejection: FirebaseError: Quota exceeded.',
  // 'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
  // 'Require cycles',
  // "Warning: Can't perform a React state update on an unmounted component.",
  // 'Error: User cancelled image selection...',
  // 'Error: [storage/unknown] No content provider...',
  // 'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
  // 'TypeError: null is not an object...',
]);

const App = () => {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState('');

  useEffect(() => {
    checkLoginCredentials();
  }, []);

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('loginCredentials')
      .then(result => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <CredentialsContext.Provider
      value={{storedCredentials, setStoredCredentials}}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </CredentialsContext.Provider>
  );
};

export default App;
