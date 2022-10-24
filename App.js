import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './src/navigators/authStack';

import {CredentialsContext} from './src/components/credentials-context';

import {useNetInfo} from '@react-native-community/netinfo';
import NoNet from './src/components/noNet';

const App = () => {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState('');

  const [notInternet, setNoInternet] = useState(false);
  const netInfo = useNetInfo();

  const fetchNetInfo = () => {
    const {isConnected, isInternetReachable} = netInfo;
    if (isConnected === false && isInternetReachable === false) {
      setNoInternet(true);
    } else {
      setNoInternet(false);
    }
  };

  useEffect(() => {
    fetchNetInfo();
  }, [netInfo]);

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

  if (notInternet) return <NoNet onRefresh={fetchNetInfo} />;

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
