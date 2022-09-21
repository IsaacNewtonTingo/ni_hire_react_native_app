import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from '../screens/profile';
import EditProfile from '../screens/editProfile';
import DrawerContentView from '../components/drawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContentView {...props} />}
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#333333',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Drawer.Screen
        options={{
          headerTitle: '',
        }}
        name="Profile"
        component={Profile}
      />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
    </Drawer.Navigator>
  );
}
