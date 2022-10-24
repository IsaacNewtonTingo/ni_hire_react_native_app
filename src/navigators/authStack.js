import React, {useState, useEffect} from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';
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
import ForgotPassword from '../screens/forgot-pass';
import NewPassword from '../screens/new-pass';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const B = props => (
    <Text
      style={{
        color: '#33cccc',
        fontWeight: '900',
      }}>
      {props.children}
    </Text>
  );

  function LogoTitle() {
    return (
      <View style={{marginHorizontal: 10}}>
        <Text
          style={{
            color: 'white',
            fontSize: 25,
            fontFamily: 'PaytoneOne-Regular',
            textShadowColor: '#993333',
            textShadowOffset: {
              height: 1,
              width: 1,
            },
            textShadowRadius: 3,
          }}>
          ni<B>Hire</B>
        </Text>
      </View>
    );
  }

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
                  title: '',
                  headerTitle: props => <LogoTitle {...props} />,
                  headerShown: false,
                }}
                name="Welcome"
                component={Welcome}
              />
              <Stack.Screen
                options={{
                  headerStyle: {
                    backgroundColor: 'black',
                  },
                  headerTitleAlign: 'center',
                  title: '',
                  headerTitle: props => <LogoTitle {...props} />,
                }}
                name="Login"
                component={Login}
              />

              <Stack.Screen
                options={{
                  headerStyle: {
                    backgroundColor: 'black',
                  },
                  headerTintColor: 'white',
                  headerTitleAlign: 'center',
                  title: '',
                  headerTitle: props => <LogoTitle {...props} />,
                }}
                name="Signup"
                component={Signup}
              />

              <Stack.Screen
                options={{
                  headerStyle: {
                    backgroundColor: 'black',
                  },
                  headerTintColor: 'white',
                  headerTitleAlign: 'center',
                  title: '',
                  headerTitle: props => <LogoTitle {...props} />,
                }}
                name="ForgotPassword"
                component={ForgotPassword}
              />

              <Stack.Screen
                options={{
                  headerStyle: {
                    backgroundColor: 'black',
                  },
                  headerTintColor: 'white',
                  headerTitleAlign: 'center',
                  title: '',
                  headerTitle: props => <LogoTitle {...props} />,
                }}
                name="NewPassword"
                component={NewPassword}
              />
            </>
          )}
        </Stack.Navigator>
      )}
    </CredentialsContext.Consumer>
  );
}
