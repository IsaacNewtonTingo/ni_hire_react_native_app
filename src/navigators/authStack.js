import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Signup from '../screens/signup';
import Login from '../screens/login';
// import TabNavigator from './tabNavigator';
import Welcome from '../screens/welcome';
import EmailVerificationScreen from '../screens/email-verification';

import {CredentialsContext} from '../components/credentials-context';
import HomeStack from './homeStack';
import Home from '../screens/home';
import TabNavigator from './tabNavigator';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <CredentialsContext.Consumer>
      {({storedCredentials}) => (
        <Stack.Navigator initialRouteName="Login">
          {storedCredentials ? (
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="TabNavigator"
              component={TabNavigator}
            />
          ) : (
            <>
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Welcome"
                component={Welcome}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Login"
                component={Login}
              />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
      )}
    </CredentialsContext.Consumer>
  );
}
