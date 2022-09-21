import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar} from 'react-native-paper';

import Share from 'react-native-share';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';

import files from '../assets/filesToShare/filesBase64';

export default function Settings({navigation}) {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState();

  useEffect(() => {
    getCurrentUser();
  }, []);

  async function getCurrentUser() {
    const userID = auth().currentUser.uid;

    const subscriber = firestore()
      .collection('Users')
      .doc(userID)
      .onSnapshot(onResult, onError);

    return () => subscriber();
  }

  function onResult(QuerySnapshot) {
    const docData = QuerySnapshot.data();
    try {
      if (docData) {
        setName(docData.name);
        setProfilePic(docData.profilePicture);
      } else {
        setName('');
        setProfilePic();
      }
    } catch (error) {
      console.log(error);
    }
  }
  function onError(error) {
    console.log(error);
  }

  async function shareApp() {
    const shareOptions = {
      message:
        'Looking to get hired, check out niHire mobile app and get employers looking for you for short term and long term jobs',
      url: files.appLogo,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileContainer}>
          <Avatar.Image
            size={100}
            source={{
              uri: profilePic
                ? profilePic
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            }}
          />
          <View style={{marginLeft: 20}}>
            <Text style={styles.name}>{name}</Text>
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
          onPress={shareApp}
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

        <TouchableOpacity
          onPress={() =>
            auth()
              .signOut()
              .then(() => {
                return null;
              })
              .catch(err => {
                console.log(err);
              })
          }
          style={styles.iconAndTextContainer}>
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
