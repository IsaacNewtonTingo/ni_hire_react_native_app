import React, {useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeStack from './src/navigators/homeStack';
import Home from './src/screens/home';

import {NavigationContainer} from '@react-navigation/native';
import Signup from './src/screens/signup';
import AuthStack from './src/navigators/authStack';

const App = () => {
  return (
    <NavigationContainer>
      {/* <HomeStack /> */}
      <AuthStack />
    </NavigationContainer>
  );
};

export default App;
