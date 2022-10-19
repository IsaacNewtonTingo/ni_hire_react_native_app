import * as React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Discover from '../screens/discover';
import PublicProfile from '../screens/publicProfile';
import ServiceProviderProfile from '../screens/serviceProviderProfile';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

export default function DiscoverStack({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3d3d5c',
        },
        headerTitleStyle: {
          fontWeight: '700',
          color: 'white',
        },
      }}>
      <Stack.Screen name="Discover" component={Discover} />

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
    </Stack.Navigator>
  );
}
