import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

const {width} = Dimensions.get('window');

import Foundation from 'react-native-vector-icons/Foundation';

import axios from 'axios';

import {CredentialsContext} from '../components/credentials-context';

export default function FeaturedUsers({route, navigation}) {
  const [usersList, setUsersList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(true);

  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);
  const {_id} = storedCredentials;

  useEffect(() => {
    getFeaturedUsers();
  }, [(navigation, loading)]);

  async function getFeaturedUsers() {
    setLoadingData(true);
    await axios
      .get(process.env.GET_FEATURED_USERS)
      .then(response => {
        setUsersList(response.data);
        setLoadingData(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  async function addToProfileVisits({providerID}) {
    const url =
      process.env.ADD_PROFILE_VISIT + _id + '?providerID=' + providerID;

    await axios
      .post(url)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{flex: 1}}
        data={usersList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              addToProfileVisits({
                providerID: item._id,
              });
              navigation.navigate('PublicProfile', {
                userID: item._id,
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.email,
                phoneNumber: item.phoneNumber,
                bio: item.bio,
                location: item.location,
                profilePicture: item.profilePicture,
              });
            }}
            style={styles.personCard}
            key={item._id}>
            <Image
              source={{
                uri: item.profilePicture
                  ? item.profilePicture
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
              }}
              style={styles.profileImage}
            />

            <View style={styles.rightContainer}>
              <View style={styles.nameAndIcon}>
                <Text style={styles.nameText}>
                  {item.firstName.length + item.lastName.length <= 10
                    ? item.firstName + ' ' + item.lastName
                    : item.firstName + ' ' + item.lastName.slice(0, 5) + '...'}
                </Text>

                <Foundation name="crown" size={20} color="orange" />
              </View>

              <Text style={styles.jobTitle}>
                {item.generalPromotedTitle.length <= 30
                  ? item.generalPromotedTitle
                  : item.generalPromotedTitle.slice(0, 30) + '...'}
              </Text>

              <Text style={styles.bioText}>
                {item.bio.length <= 120
                  ? item.bio
                  : item.bio.slice(0, 120) + '...'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },

  personCard: {
    flex: 1,
    marginBottom: 10,
    height: 140,
    backgroundColor: '#262626',
    flexDirection: 'row',
  },
  profileImage: {
    width: 140,
    height: '100%',
  },
  bioText: {
    color: 'gray',
    fontWeight: '700',
    fontSize: 12,
  },
  jobTitle: {
    color: '#cc0066',
    fontWeight: '700',
    fontSize: 12,
  },
  nameText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    marginRight: 10,
  },
  nameAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  rightContainer: {
    flex: 1,
    padding: 20,
  },
});
