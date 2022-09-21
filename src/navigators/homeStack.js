import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';

import Home from '../screens/home';
import ServiceProviderProfile from '../screens/serviceProviderProfile';

// import MyServices from '../screens/myServices';
// import PostService from '../screens/postService';
// import JobMembers from '../screens/jobMembers';
// import JobsInCategories from '../screens/jobsInCategory';
// import SearchResults from '../screens/searchResultsScreen';
// import AuthStack from './authStack';
// import LocationBasedServices from '../screens/locationBasedServices';
// import PublicProfile from '../screens/publicProfile';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import JobsInCategories from '../screens/jobsInCategory';
import PublicProfile from '../screens/publicProfile';

// import LocationSearchScreen from '../screens/locationSearchScreen';
// import ServicePromotionPayment from '../screens/servicePromotionPayment';

const Stack = createNativeStackNavigator();
const B = props => (
  <Text
    style={{
      color: '#33cccc',
      fontWeight: '900',
    }}>
    {props.children}
  </Text>
);

function LogoTitle() {
  return (
    <View style={{marginHorizontal: 10}}>
      <Text
        style={{
          color: 'white',
          fontSize: 25,
          fontFamily: 'PaytoneOne-Regular',
          textShadowColor: '#993333',
          textShadowOffset: {
            height: 1,
            width: 1,
          },
          textShadowRadius: 3,
        }}>
        ni<B>Hire</B>
      </Text>
    </View>
  );
}

export default function HomeStack() {
  const navigation = useNavigation();

  // function Capitalize(str) {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // }

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerLeft: props => (
          <TouchableOpacity onPress={navigation.goBack} {...props}>
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
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          title: '',
          headerTitle: props => <LogoTitle {...props} />,
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        options={({route}) => ({
          title: route.params.categoryName,
          headerStyle: {
            backgroundColor: '#3d3d5c',
          },
        })}
        name="JobsInCategories"
        component={JobsInCategories}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
        name="PublicProfile"
        component={PublicProfile}
      />

      {/*
      <Stack.Screen
        options={({route}) => ({
          title: Capitalize(route.params.jobId),
          headerStyle: {
            backgroundColor: '#3d3d5c',
          },
        })}
        name="JobMembers"
        component={JobMembers}
      />

      <Stack.Screen
        options={{
          headerTitle: '',
          headerShown: false,
        }}
        name="LocationSearchScreen"
        component={LocationSearchScreen}
      />

      <Stack.Screen
        options={{
          headerTitle: '',
        }}
        name="SearchResults"
        component={SearchResults}
      />

      <Stack.Screen
        options={{
          headerTitle: '',
        }}
        name="AuthStack"
        component={AuthStack}
      />

      <Stack.Screen
        options={{
          headerTitle: '',
        }}
        name="LocationBasedServices"
        component={LocationBasedServices}
      />

      
      <Stack.Screen
        options={{
          // headerTransparent: true,
          headerTitle: 'Promote',
        }}
        name="ServicePromotionPayment"
        component={ServicePromotionPayment}
      /> */}

      <Stack.Screen
        options={{
          title: '',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
        name="ServiceProviderProfile"
        component={ServiceProviderProfile}
      />
    </Stack.Navigator>
  );
}
