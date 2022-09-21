import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MyServices from '../screens/myServices';
import PostService from '../screens/postService';

const Stack = createNativeStackNavigator();

export default function PostStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTitleStyle: {
          fontWeight: '700',
          color: 'white',
        },
      }}>
      <Stack.Screen
        name="PostService"
        component={PostService}
        options={{
          headerTitle: 'Post your service',
        }}
      />
    </Stack.Navigator>
  );
}
