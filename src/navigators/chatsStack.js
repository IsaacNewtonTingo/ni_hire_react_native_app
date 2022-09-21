import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MyServices from '../screens/myServices';
import Chats from '../screens/chats';

const Stack = createNativeStackNavigator();

export default function ChatStack() {
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
        name="Chats"
        component={Chats}
        options={{
          headerShown: false,
          headerTitle: 'Chats',
        }}
      />
    </Stack.Navigator>
  );
}
