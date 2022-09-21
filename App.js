import React, {useEffect} from 'react';
import HomeStack from './src/navigators/homeStack';
import Home from './src/screens/home';

import {NavigationContainer} from '@react-navigation/native';
import Signup from './src/screens/signup';

const App = () => {
  return (
    // <NavigationContainer>
    //   <HomeStack />
    // </NavigationContainer>
    <Signup />
  );
};

export default App;
