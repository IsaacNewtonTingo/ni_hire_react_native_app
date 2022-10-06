import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from './homeStack';
import ProfileStack from './profileStack';
import Discover from '../screens/discover';
import PostService from '../screens/postService';
import Saved from '../screens/saved';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={() => ({
        tabBarActiveTintColor: '#ff6600',
        tabBarInactiveTintColor: 'white',
        headerStyle: {
          backgroundColor: '#666699',
        },
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#3d3d5c',
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          headerTitle: '',
          tabBarIcon: ({focused, color, size}) => {
            return <AntDesign name="home" size={30} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: '',
          headerTitle: 'Discover',
          tabBarIcon: ({focused, color, size}) => {
            return (
              <MaterialCommunityIcons name="fire" size={35} color={color} />
            );
          },
        }}
      />

      <Tab.Screen
        name="PostService"
        component={PostService}
        options={{
          tabBarLabel: '',
          headerTitle: 'Post a service',
          tabBarIcon: ({focused, color, size}) => {
            return <MaterialIcons name="post-add" size={30} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Saved"
        component={Saved}
        options={{
          tabBarLabel: '',
          headerTitle: 'Saved items',
          tabBarIcon: ({focused, color, size}) => {
            return <Feather name="bookmark" size={30} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          headerTitle: '',

          tabBarIcon: ({focused, color, size}) => {
            return <Ionicons name="settings" size={30} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
