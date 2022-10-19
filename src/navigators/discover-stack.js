import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Discover from '../screens/discover';
import PublicProfile from '../screens/publicProfile';
import ServiceProviderProfile from '../screens/serviceProviderProfile';

const Stack = createNativeStackNavigator();

export default function DiscoverStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#660033',
        },
        headerTitleStyle: {
          fontWeight: '700',
          color: 'white',
        },
      }}>
      <Stack.Screen
        name="Discover"
        component={Discover}
        options={
          {
            //   headerShown: false,
          }
        }
      />

      <Stack.Screen
        name="PublicProfile"
        component={PublicProfile}
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />

      <Stack.Screen
        name="ServiceProviderProfile"
        component={ServiceProviderProfile}
        options={{
          title: '',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
    </Stack.Navigator>
  );
}
