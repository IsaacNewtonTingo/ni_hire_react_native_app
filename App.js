import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './src/navigators/authStack';

import {CredentialsContext} from './src/components/credentials-context';

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
          console.log(result);
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
