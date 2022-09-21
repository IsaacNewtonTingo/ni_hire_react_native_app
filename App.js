import React, {useEffect} from 'react';
import HomeStack from './src/navigators/homeStack';
import Home from './src/screens/home';

import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default App;
