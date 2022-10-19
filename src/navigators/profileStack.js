import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Profile from '../screens/profile';
import EditProfile from '../screens/editProfile';
import Settings from '../screens/settings';
import Support from '../screens/support';
import PromoteService from '../screens/promoteService';
import PromoteProfile from '../screens/promoteProfile';
import BugReport from '../screens/bug-report';
import JoinPremium from '../screens/join-premium';
import Transactions from '../screens/transactions';

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
          headerTitle: 'JoinPremium',
          headerTintColor: 'black',
        }}
        name="JoinPremium"
        component={JoinPremium}
      />

      <Stack.Screen
        options={{
          headerTitle: 'Premium records',
          headerTintColor: 'black',
        }}
        name="Transactions"
        component={Transactions}
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

      <Stack.Screen
        options={{
          headerTintColor: 'black',
          headerTitle: 'Report bug',
        }}
        name="BugReport"
        component={BugReport}
      />
    </Stack.Navigator>
  );
}
