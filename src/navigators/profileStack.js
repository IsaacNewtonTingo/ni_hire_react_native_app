import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Profile from '../screens/profile';
import EditProfile from '../screens/editProfile';
import Settings from '../screens/settings';
import Support from '../screens/support';
import PromoteService from '../screens/promoteService';
import PromoteProfile from '../screens/promoteProfile';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Settings"
        component={Settings}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
        name="EditProfile"
        component={EditProfile}
      />

      <Stack.Screen
        options={{
          headerTitle: 'Promotion guide',
          headerTintColor: 'black',
        }}
        name="PromoteService"
        component={PromoteService}
      />

      <Stack.Screen
        options={{
          headerTitle: '',
          headerTintColor: 'black',
        }}
        name="PromoteProfile"
        component={PromoteProfile}
      />

      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitle: 'Contact us',
        }}
        name="Support"
        component={Support}
      />
    </Stack.Navigator>
  );
}
