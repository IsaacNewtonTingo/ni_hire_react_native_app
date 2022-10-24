import * as React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

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
import ServiceProviderProfile from '../screens/serviceProviderProfile';
import PublicProfile from '../screens/publicProfile';

const Stack = createNativeStackNavigator();

export default function ProfileStack({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#666699',
        },
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
          headerTitle: 'Join premium',
        }}
        name="JoinPremium"
        component={JoinPremium}
      />

      <Stack.Screen
        options={{
          headerTitle: 'Premium records',
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

      <Stack.Screen
        name="ServiceProviderProfile"
        component={ServiceProviderProfile}
        options={{
          headerLeft: props => (
            <TouchableOpacity onPress={() => navigation.pop()} {...props}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                  backgroundColor: '#262626',
                }}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </View>
            </TouchableOpacity>
          ),
          title: '',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />

      <Stack.Screen
        name="PublicProfile"
        component={PublicProfile}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'transparent',
          },

          headerLeft: props => (
            <TouchableOpacity onPress={() => navigation.pop()} {...props}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                  backgroundColor: '#262626',
                }}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
