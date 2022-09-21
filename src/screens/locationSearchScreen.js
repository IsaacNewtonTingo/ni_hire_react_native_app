import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  View,
  ActivityIndicator,
  TextInput,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';

import LinearGradient from 'react-native-linear-gradient';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import DropDownPicker from 'react-native-dropdown-picker';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

const filterData = require('../assets/data/filterOptions.json');

export default function LocationSearchScreen({route, navigation}) {
  const [noData, setNoData] = useState(false);
  const [noDataInArea, setNoDataInArea] = useState(false);
  const [usersList, setUsersList] = useState([]);

  const [loading, setLoading] = useState(true);

  const jobId = route.params.jobId.toLowerCase();
  const [currentUserId, setCurrentUserId] = useState('');

  const ref = useRef();

  function getCurrentUser() {
    const currentUserId = auth().currentUser.uid;
    setCurrentUserId(currentUserId);
  }

  useEffect(() => {
    getCurrentUser();
    getUsers();
  }, []);

  function clearInput() {
    ref.current?.setAddressText('');
    getUsers();
  }

  function getUsers() {
    try {
      const subscriber = firestore()
        .collection('Services')
        .doc(jobId)
        .collection('JobUsers')
        .orderBy('rating', 'desc')
        .onSnapshot(querySnapshot => {
          const users = [];
          if (querySnapshot.size <= 0) {
            setNoData(true);
            setLoading(false);
          } else {
            setNoData(false);
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setLoading(false);
            setUsersList(users);
          }
        });
      return () => subscriber();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function addToJobViewedBy({jobID, jobUserID}) {
    await firestore()
      .collection('Services')
      .doc(jobID)
      .update({
        recentViews: firestore.FieldValue.arrayUnion(currentUserId),
      })
      .catch(error => {
        console.log(error);
      });

    await firestore()
      .collection('Services')
      .doc(jobID)
      .collection('JobUsers')
      .doc(jobUserID)
      .update({
        jobViewedBy: firestore.FieldValue.arrayUnion(currentUserId),
      })
      .catch(error => {
        console.log(error);
      });
  }

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function searchArea({newLocation}) {
    try {
      setLoading(true);
      const subscriber = firestore()
        .collection('Services')
        .doc(jobId)
        .collection('JobUsers')
        .where('location', '==', newLocation)
        .get()
        .then(querySnapshot => {
          const users = [];

          if (querySnapshot.size <= 0) {
            setLoading(false);
            setNoDataInArea(true);
          } else {
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setLoading(false);
            setUsersList(users);
          }
        });
      return () => subscriber();
    } catch (error) {
      console.log(error);
      setLoading(false);
      return null;
    }
  }

  function findKeyAndSearch({item}) {
    if (item.key == 1) {
      searchPriceLowToHigh();
    } else if (item.key == 2) {
      searchPriceHighToLow();
    } else if (item.key == 3) {
      searchNoOfRevLowToHigh();
    } else if (item.key == 4) {
      searchNoOfRevHighToLow();
    } else if (item.key == 5) {
      searchRatingLowToHigh();
    } else {
      searchRatingHighToLow();
    }
  }

  function searchPriceLowToHigh() {
    try {
      const subscriber = firestore()
        .collection('Services')
        .doc(jobId)
        .collection('JobUsers')
        .orderBy('rate', 'asc')
        .onSnapshot(querySnapshot => {
          const users = [];
          if (querySnapshot.size <= 0) {
            setNoData(true);
            setLoading(false);
          } else {
            setNoData(false);
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setLoading(false);
            setUsersList(users);
            setLoading(false);
          }
        });
      return () => subscriber();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function searchPriceHighToLow() {
    try {
      const subscriber = firestore()
        .collection('Services')
        .doc(jobId)
        .collection('JobUsers')
        .orderBy('rate', 'desc')
        .onSnapshot(querySnapshot => {
          const users = [];
          if (querySnapshot.size <= 0) {
            setNoData(true);
            setLoading(false);
          } else {
            setNoData(false);
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setLoading(false);
            setUsersList(users);
            setLoading(false);
          }
        });
      return () => subscriber();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function searchNoOfRevLowToHigh() {}

  function searchNoOfRevHighToLow() {}

  function searchRatingLowToHigh() {
    try {
      const subscriber = firestore()
        .collection('Services')
        .doc(jobId)
        .collection('JobUsers')
        .orderBy('rating', 'asc')
        .onSnapshot(querySnapshot => {
          const users = [];
          if (querySnapshot.size <= 0) {
            setNoData(true);
            setLoading(false);
          } else {
            setNoData(false);
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setLoading(false);
            setUsersList(users);
            setLoading(false);
          }
        });
      return () => subscriber();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function searchRatingHighToLow() {
    try {
      const subscriber = firestore()
        .collection('Services')
        .doc(jobId)
        .collection('JobUsers')
        .orderBy('rating', 'desc')
        .onSnapshot(querySnapshot => {
          const users = [];
          if (querySnapshot.size <= 0) {
            setNoData(true);
            setLoading(false);
          } else {
            setNoData(false);
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setLoading(false);
            setUsersList(users);
            setLoading(false);
          }
        });
      return () => subscriber();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  if (loading) {
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
        <>
          <View style={{flex: 1}}>
            <View style={{height: 100}}>
              <Entypo
                style={styles.icons}
                name="location"
                size={20}
                color="black"
              />

              <GooglePlacesAutocomplete
                ref={ref}
                keyboardShouldPersistTaps="always"
                fetchDetails={true}
                placeholder="Search jobs in a given location"
                onPress={(data, details = null) => {
                  searchArea({newLocation: data.description});
                }}
                query={{
                  key: 'AIzaSyB7rOUlrE_lVRVv2unWyqjBiqVuQcwxd1U',
                  language: 'en',
                  components: 'country:ke',
                  types: '(cities)',
                }}
                renderRightButton={() => (
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      right: 10,
                      top: 10,
                    }}
                    onPress={() => {
                      getUsers();
                      clearInput();
                    }}>
                    <Feather name="x-circle" color="black" size={25} />
                  </TouchableOpacity>
                )}
                styles={{
                  textInput: {
                    backgroundColor: 'white',
                    height: 50,
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 40,
                    fontSize: 15,
                    borderBottomWidth: 1,
                    color: 'black',
                    width: '50%',
                  },
                  listView: {
                    height: 20,
                  },
                  textInputContainer: {
                    flexDirection: 'row',
                  },
                }}
              />
            </View>

            {noDataInArea == false ? (
              <>
                <Text
                  style={{
                    color: 'orange',
                    fontWeight: '700',
                    fontSize: 16,
                    marginBottom: 10,
                  }}>
                  Other filter options
                </Text>

                <View style={{marginBottom: 20}}>
                  <FlatList
                    keyboardShouldPersistTaps="always"
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={filterData}
                    keyExtractor={item => item.key}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => findKeyAndSearch({item})}
                        style={{
                          justifyContent: 'center',
                          marginRight: 10,
                          height: 40,
                          borderRadius: 10,
                          backgroundColor: '#1a1a1a',
                        }}
                        key={item.key}>
                        <LinearGradient
                          style={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: '#1a1a1a',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            paddingHorizontal: 10,
                          }}
                          colors={['rgba(0,0,0,0.8)', 'transparent']}>
                          <Text
                            style={{
                              color: 'white',
                              fontWeight: '700',
                              fontSize: 12,
                            }}>
                            {item.name}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    )}
                  />
                </View>

                <View style={{flex: 1}}>
                  <FlatList
                    data={usersList}
                    renderItem={({item}) => (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            addToJobViewedBy({
                              jobID: item.jobTitle,
                              jobUserID: item.key,
                            });
                            navigation.navigate('ServiceProviderProfile', {
                              userId: item.key,
                              jobId: jobId,
                            });
                          }}
                          key={item.id}
                          style={styles.card}>
                          <View
                            style={{
                              backgroundColor: '#333333',
                              height: '100%',
                              width: 120 * 1.2,
                            }}>
                            <Image
                              source={{
                                uri: item.jobImage
                                  ? item.jobImage
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
                              }}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontWeight: '700',
                                  fontSize: 16,
                                  marginRight: 10,
                                }}>
                                {item.name}
                              </Text>

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

                            <Text
                              style={{
                                color: '#cc0066',
                                fontWeight: '700',
                                fontSize: 12,
                              }}>
                              {Capitalize(item.jobTitle)}
                            </Text>

                            <Text
                              style={{
                                color: '#a6a6a6',
                                fontSize: 10,
                              }}>
                              {item.description.slice(0, 85) + '...'}
                            </Text>

                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 10,
                              }}>
                              <Text
                                style={{
                                  color: '#cccccc',
                                  fontSize: 12,
                                  fontWeight: '700',
                                }}>
                                {item.location}
                              </Text>

                              <Text
                                style={{
                                  color: '#cccccc',
                                  fontWeight: '700',
                                  fontSize: 12,
                                }}>
                                KSH. {item.rate}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </>
                    )}
                  />
                </View>
              </>
            ) : (
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                No data available for the selected area
              </Text>
            )}
          </View>
        </>
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
