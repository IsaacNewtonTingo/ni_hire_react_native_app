import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Signup from '../screens/signup';
import Login from '../screens/login';
import TabNavigator from './tabNavigator';
import Welcome from '../screens/welcome';
import EmailVerificationScreen from '../screens/email-verification';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Welcome"
        component={Welcome}
      />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="EmailVerificationScreen"
        component={EmailVerificationScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="TabNavigator"
        component={TabNavigator}
      />
    </Stack.Navigator>
  );
}
