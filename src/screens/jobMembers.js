import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef, useContext} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';

import axios from 'axios';

import {CredentialsContext} from '../components/credentials-context';

export default function JobMembers({route, navigation}) {
  const [noData, setNoData] = useState(false);
  const [noDataInArea, setNoDataInArea] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [newLocation, setNewLocation] = useState('');

  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(true);

  const serviceName = route.params.serviceName.toLowerCase();

  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);

  const {_id} = storedCredentials;

  function getCurrentUser() {}

  useEffect(() => {
    getCurrentUser();
    getUsers();
    setNewLocation('');
  }, [(navigation, loading)]);

  navigation.addListener('focus', () => setLoading(!loading));

  async function getUsers() {
    const url = process.env.GET_USERS_OF_A_SERVICE + serviceName;

    await axios
      .get(url)
      .then(response => {
        if (response.data.status == 'Failed') {
          setNoData(true);
          setLoadingData(false);
        } else {
          setUsersList(response.data);
          setLoadingData(false);
        }
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  async function addToJobViewedBy({userID, serviceProviderID}) {
    const url = process.env.ADD_TO_MY_VIEWS;
    if (userID != _id) {
      await axios
        .post(url, {
          serviceProviderID,
          userID: _id,
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return;
    }
  }

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
    <View style={styles.container}>
      {noData == false ? (
        <View style={{flex: 1}}>
          <FlatList
            data={usersList}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  addToJobViewedBy({
                    serviceProviderID: item._id,
                    userID: item.provider._id,
                  });

                  navigation.navigate('ServiceProviderProfile', {
                    serviceProviderID: item._id,
                    userID: item.provider._id,
                    firstName: item.provider.firstName,
                    lastName: item.provider.lastName,
                    email: item.provider.email,
                    phoneNumber: item.provider.phoneNumber,
                    profilePicture: item.provider.profilePicture,
                    location: item.provider.location,
                    image1: item.image1,
                    image2: item.image2,
                    image3: item.image3,
                    rate: item.rate,
                    rating: item.rating,
                    description: item.description,
                    isPromoted: item.isPromoted,
                    serviceName: item.service.serviceName,
                  });
                }}
                key={item._id}
                style={styles.card}>
                <View
                  style={{
                    backgroundColor: '#333333',
                    height: '100%',
                    width: 120 * 1.2,
                  }}>
                  <Image
                    source={{
                      uri: item.image1
                        ? item.image1
                        : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png',
                    }}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>

                <View style={{margin: 10, flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 10,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: '700',
                          fontSize: 16,
                          marginRight: 10,
                        }}>
                        {item.provider.firstName.length <= 10
                          ? Capitalize(item.provider.firstName)
                          : Capitalize(
                              item.provider.firstName.slice(0, 10) + '...',
                            )}
                      </Text>

                      {item.isPromoted == true && (
                        <Foundation
                          style={{marginLeft: 10}}
                          name="crown"
                          size={20}
                          color="orange"
                        />
                      )}
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <AntDesign name="star" size={15} color="orange" />

                      <Text
                        style={{
                          marginLeft: 10,
                          color: 'orange',
                          fontWeight: '700',
                        }}>
                        {item.rating.toFixed(1)}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={{
                      color: '#cc0066',
                      fontWeight: '700',
                      fontSize: 12,
                    }}>
                    {item.service.serviceName.length <= 30
                      ? Capitalize(item.service.serviceName)
                      : Capitalize(
                          item.service.serviceName.slice(0, 30) + '...',
                        )}
                  </Text>

                  <Text
                    style={{
                      color: '#a6a6a6',
                      fontSize: 10,
                    }}>
                    {item.description.length <= 85
                      ? item.description
                      : item.description.slice(0, 85) + '...'}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        color: '#33cccc',
                        fontSize: 12,
                        fontWeight: '700',
                      }}>
                      {item.provider.location.length <= 15
                        ? item.provider.location
                        : item.provider.location.slice(0, 15) + '...'}
                    </Text>

                    <Text
                      style={{
                        color: '#ff6600',
                        fontWeight: '700',
                        fontSize: 12,
                      }}>
                      KSH. {item.rate}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text
            style={{
              color: 'white',
              fontWeight: '700',
              textAlign: 'center',
            }}>
            No users available for the selected job
          </Text>

          <TouchableOpacity>
            <Text>Go back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  card: {
    backgroundColor: '#1a1a1a',
    height: 130,
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 20,
    paddingHorizontal: 50,
    backgroundColor: 'white',
    color: 'black',
  },
  icons: {
    position: 'absolute',
    top: 13,
    zIndex: 1,
    left: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: '100%',
    height: '60%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '80%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
