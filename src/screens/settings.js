import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {Avatar} from 'react-native-paper';

import Share from 'react-native-share';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from '../components/credentials-context';

import axios from 'axios';

// import files from '../assets/filesToShare/filesBase64';

export default function Settings({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicture, setProfilePicture] = useState();

  const [userCredentials, setUserCredentials] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);
  const {_id} = storedCredentials;

  useEffect(() => {
    getUserData();
  }, [(navigation, loading)]);

  navigation.addListener('focus', () => setLoading(!loading));

  const getUserData = async () => {
    setLoadingData(true);
    const url = process.env.GET_USER_DATA + _id;

    await axios
      .get(url)
      .then(response => {
        userData = response.data.data;

        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setProfilePicture(userData.profilePicture);

        setLoadingData(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  };

  async function logout() {
    setIsSubmitting(true);
    await AsyncStorage.removeItem('loginCredentials')
      .then(() => {
        setStoredCredentials('');
        setIsSubmitting(false);
      })
      .catch(err => {
        console.log(err);
        setIsSubmitting(false);
      });
  }

  async function shareApp() {
    // const shareOptions = {
    //   message:
    //     'Looking to get hired, check out niHire mobile app and get employers looking for you for short term and long term jobs',
    //   url: files.appLogo,
    // };
    // try {
    //   const ShareResponse = await Share.open(shareOptions);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  if (loadingData) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator color="white" size="large" />
        <Text style={{color: 'white', fontWeight: '700', marginTop: 10}}>
          Loading data
        </Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {
              userID: _id,
            })
          }
          style={styles.profileContainer}>
          <Avatar.Image
            size={100}
            source={{
              uri: profilePicture
                ? profilePicture
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            }}
          />
          <View style={{marginLeft: 20}}>
            <Text style={styles.name}>
              {firstName} {lastName}
            </Text>
            <Text style={styles.viewProfileText}>View profile</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity
          onPress={() => navigation.navigate('PromoteProfile')}
          style={styles.iconAndTextContainer}>
          <View style={styles.rightIconContainer}>
            <Octicons name="graph" color="white" size={20} />
            <Text style={styles.generalTexts}>Promote your profile</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" color="white" size={30} />
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity
          onPress={() => navigation.navigate('PromoteService')}
          style={styles.iconAndTextContainer}>
          <View style={styles.rightIconContainer}>
            <Entypo name="line-graph" color="white" size={20} />
            <Text style={styles.generalTexts}>Promote a service you offer</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" color="white" size={30} />
        </TouchableOpacity>

        <View style={styles.line} />

        {/* <TouchableOpacity style={styles.iconAndTextContainer}>
          <View style={styles.rightIconContainer}>
            <FontAwesome name="credit-card-alt" color="white" size={20} />
            <Text style={styles.generalTexts}>Your transactions</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" color="white" size={30} />
        </TouchableOpacity> */}

        {/* <View style={styles.line} /> */}

        <TouchableOpacity
          // onPress={shareApp}
          style={styles.iconAndTextContainer}>
          <View style={styles.rightIconContainer}>
            <FontAwesome name="share-square-o" color="white" size={25} />
            <Text style={styles.generalTexts}>Talk about us</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" color="white" size={30} />
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity
          onPress={() => navigation.navigate('Support')}
          style={styles.iconAndTextContainer}>
          <View style={styles.rightIconContainer}>
            <MaterialIcons name="support-agent" color="white" size={25} />
            <Text style={styles.generalTexts}>Support/Contact us</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" color="white" size={30} />
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity onPress={logout} style={styles.iconAndTextContainer}>
          <View style={styles.rightIconContainer}>
            <MaterialIcons name="logout" color="white" size={25} />
            <Text style={styles.generalTexts}>Logout</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" color="white" size={30} />
        </TouchableOpacity>

        <View style={styles.line} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  innerContainer: {
    margin: 10,
    backgroundColor: '#1a1a1a',
    flex: 1,
    padding: 20,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewProfileText: {
    color: 'gray',
    fontWeight: '700',
  },
  line: {
    borderColor: '#666666',
    width: '100%',
    borderWidth: 0.2,
    marginVertical: 20,
  },
  generalTexts: {
    color: 'white',
    marginLeft: 20,
    fontWeight: '700',
  },
  iconAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
