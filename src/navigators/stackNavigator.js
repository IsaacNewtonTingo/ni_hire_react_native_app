import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/home';
import MyServices from '../screens/myServices';
import PostService from '../screens/postService';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen name="MyServices" component={MyServices} />
      <Stack.Screen name="PostService" component={PostService} />
    </Stack.Navigator>
  );
}
