import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

const servicesData = require('../assets/data/services.json');
const filterData = require('../assets/data/filterOptions.json');
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const {width} = Dimensions.get('window');

const Search = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [noFeaturedServices, setNoFeaturedServices] = useState(false);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [allServiceProviders, setAllServiceProviders] = useState([]);
  const [noDataInArea, setNoDataInArea] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [startAfter, setstartAfter] = useState(Object);

  const ref = useRef();

  function handleXPress() {
    ref.current?.setAddressText('');
    getAllUsersList();
    setNewLocation('');
    setNoDataInArea(false);
  }

  useEffect(() => {
    getFeaturedServices();
    getAllUsersList();
  }, [(navigation, loading)]);

  navigation.addListener('focus', () => setLoading(!loading));

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getFeaturedServices() {
    const subscriber = firestore()
      .collectionGroup('JobUsers')
      .where('isPromoted', '==', true)
      .get()
      .then(querySnapshot => {
        const users = [];

        if (querySnapshot.size <= 0) {
          setNoFeaturedServices(true);
          setLoadingData(false);
        } else {
          setNoFeaturedServices(false);
          querySnapshot.forEach(documentSnapshot => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.data().uniqueID,
            });
          });
          setFeaturedServices(users);
          setLoadingData(false);
        }
      });
    return () => subscriber();
  }

  function getAllUsersList() {
    setLoadingData(true);
    const subscriber = firestore()
      .collectionGroup('JobUsers')
      .orderBy('rating', 'desc')
      .limit(10)
      .onSnapshot(querySnapshot => {
        const users = [];
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        if (querySnapshot.size <= 0) {
          setLoadingData(false);
        } else {
          setNoFeaturedServices(false);
          querySnapshot.forEach(documentSnapshot => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.data().uniqueID,
            });
          });
          setAllServiceProviders([...allServiceProviders, ...users]);
          setLoadingData(false);
          setstartAfter(lastVisible);
        }
      });
    return () => subscriber();
  }

  function getMoreJobUsers() {
    setLoadingData(true);
    const subscriber = firestore()
      .collectionGroup('JobUsers')
      .orderBy('rating', 'desc')
      .startAfter(startAfter)
      .limit(10)
      .onSnapshot(querySnapshot => {
        const users = [];
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        if (querySnapshot.size <= 0) {
          setLoadingData(false);
        } else {
          setNoFeaturedServices(false);
          querySnapshot.forEach(documentSnapshot => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.data().uniqueID,
            });
          });
          setAllServiceProviders([...allServiceProviders, ...users]);
          setLoadingData(false);
          setstartAfter(lastVisible);
        }
      });
    return () => subscriber();
  }

  function handleLocationPress({newLocation}) {
    try {
      ref.current?.setAddressText(newLocation);
      setNewLocation(newLocation);
      const subscriber = firestore()
        .collectionGroup('JobUsers')
        .where('location', '==', newLocation)
        .get()
        .then(querySnapshot => {
          const users = [];

          if (querySnapshot.size <= 0) {
            setNoDataInArea(true);
          } else {
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setAllServiceProviders(users);
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
      if (newLocation) {
        const subscriber = firestore()
          .collectionGroup('JobUsers')
          .orderBy('rate', 'asc')
          .where('location', '==', newLocation)
          .get()
          .then(querySnapshot => {
            const users = [];
            if (querySnapshot.size <= 0) {
              setNoDataInArea(true);
            } else {
              setNoDataInArea(false);
              querySnapshot.forEach(documentSnapshot => {
                users.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
                });
              });
              setAllServiceProviders(users);
              setNoDataInArea(false);
            }
            return () => subscriber();
          });
      } else {
        const subscriber = firestore()
          .collectionGroup('JobUsers')
          .orderBy('rate', 'asc')
          .onSnapshot(querySnapshot => {
            const users = [];
            if (querySnapshot.size <= 0) {
              setNoDataInArea(true);
            } else {
              setNoDataInArea(false);
              querySnapshot.forEach(documentSnapshot => {
                users.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
                });
              });
              setAllServiceProviders(users);
              setNoDataInArea(false);
            }
          });
        return () => subscriber();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function searchPriceHighToLow() {
    try {
      if (newLocation) {
        const subscriber = firestore()
          .collectionGroup('JobUsers')
          .orderBy('rate', 'desc')
          .where('location', '==', newLocation)
          .get()
          .then(querySnapshot => {
            const users = [];
            if (querySnapshot.size <= 0) {
              setNoDataInArea(true);
            } else {
              setNoDataInArea(false);
              querySnapshot.forEach(documentSnapshot => {
                users.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
                });
              });
              setAllServiceProviders(users);
              setNoDataInArea(false);
            }
          });
        return () => subscriber();
      } else {
        const subscriber = firestore()
          .collectionGroup('JobUsers')
          .orderBy('rate', 'desc')
          .onSnapshot(querySnapshot => {
            const users = [];
            if (querySnapshot.size <= 0) {
              setNoDataInArea(true);
            } else {
              setNoDataInArea(false);
              querySnapshot.forEach(documentSnapshot => {
                users.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
                });
              });
              setAllServiceProviders(users);
              setNoDataInArea(false);
            }
          });
        return () => subscriber();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function searchNoOfRevLowToHigh() {}

  function searchNoOfRevHighToLow() {}

  function searchRatingLowToHigh() {
    try {
      if (newLocation) {
        const subscriber = firestore()
          .collectionGroup('JobUsers')
          .orderBy('rating', 'asc')
          .where('location', '==', newLocation)
          .get()
          .then(querySnapshot => {
            const users = [];
            if (querySnapshot.size <= 0) {
              setNoDataInArea(true);
            } else {
              setNoDataInArea(false);
              querySnapshot.forEach(documentSnapshot => {
                users.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
                });
              });
              setAllServiceProviders(users);
            }
          });
        return () => subscriber();
      } else {
        const subscriber = firestore()
          .collectionGroup('JobUsers')
          .orderBy('rating', 'asc')
          .onSnapshot(querySnapshot => {
            const users = [];
            if (querySnapshot.size <= 0) {
              setNoDataInArea(true);
            } else {
              setNoDataInArea(false);
              querySnapshot.forEach(documentSnapshot => {
                users.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
                });
              });
              setAllServiceProviders(users);
            }
          });
        return () => subscriber();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function searchRatingHighToLow() {
    try {
      if (newLocation) {
        const subscriber = firestore()
          .collectionGroup('JobUsers')
          .orderBy('rating', 'desc')
          .where('location', '==', newLocation)
          .get()
          .then(querySnapshot => {
            const users = [];
            if (querySnapshot.size <= 0) {
              setNoDataInArea(true);
            } else {
              setNoDataInArea(false);
              querySnapshot.forEach(documentSnapshot => {
                users.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
                });
              });
              setAllServiceProviders(users);
            }
          });
        return () => subscriber();
      } else {
        const subscriber = firestore()
          .collectionGroup('JobUsers')
          .orderBy('rating', 'desc')
          .onSnapshot(querySnapshot => {
            const users = [];
            if (querySnapshot.size <= 0) {
              setNoDataInArea(true);
            } else {
              setNoDataInArea(false);
              querySnapshot.forEach(documentSnapshot => {
                users.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
                });
              });
              setAllServiceProviders(users);
            }
          });
        return () => subscriber();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addToJobViewedBy({jobID, jobUserID}) {
    const currentUserId = auth().currentUser.uid;
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

  // if (loadingData) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         backgroundColor: 'black',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}>
  //       <ActivityIndicator color="white" size="large" />
  //       <Text style={{color: 'white', fontWeight: '700', marginTop: 10}}>
  //         Loading data
  //       </Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <View style={{height: 100}}>
        <Entypo style={styles.icons} name="location" size={20} color="black" />

        <GooglePlacesAutocomplete
          ref={ref}
          keyboardShouldPersistTaps="always"
          fetchDetails={true}
          placeholder="Search jobs in a given location"
          onPress={(data, details = null) => {
            handleLocationPress({newLocation: data.description});
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
              onPress={handleXPress}>
              <Feather name="x-circle" color="gray" size={25} />
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

      {noFeaturedServices == false && (
        <View style={styles.topAndViewContainer}>
          <Text style={styles.topText}> Top service providers</Text>
        </View>
      )}

      <View style={{marginBottom: 40}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={featuredServices}
          renderItem={({item}) => (
            <>
              <TouchableOpacity
                onPress={() => {
                  addToJobViewedBy({
                    jobID: item.jobTitle,
                    jobUserID: item.jobUserID,
                  });
                  navigation.navigate('ServiceProviderProfile', {
                    userId: item.jobUserID,
                    jobId: item.jobTitle,
                  });
                }}
                key={item.uniqueID}
                style={styles.card}>
                <View
                  style={{
                    backgroundColor: '#333333',
                    height: '100%',
                    width: 120,
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

                <View style={{flex: 1, margin: 10, justifyContent: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      position: 'absolute',
                      top: 0,
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '700',
                        fontSize: 16,
                        marginRight: 10,
                      }}>
                      {item.name.length <= 15
                        ? Capitalize(item.name)
                        : Capitalize(item.name.slice(0, 15) + '...')}
                    </Text>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                    {item.jobTitle.length <= 30
                      ? Capitalize(item.jobTitle)
                      : Capitalize(item.jobTitle.slice(0, 30) + '...')}
                  </Text>

                  <Text
                    style={{
                      color: '#a6a6a6',
                      fontSize: 10,
                    }}>
                    {item.description.length <= 65
                      ? item.description
                      : item.description.slice(0, 65) + '...'}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        color: '#009999',
                        fontSize: 12,
                        fontWeight: '700',
                        marginRight: 20,
                      }}>
                      {item.location.length <= 15
                        ? item.location
                        : item.location.slice(0, 15) + '...'}
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
            </>
          )}
        />
      </View>

      {noDataInArea == false ? (
        <>
          <View style={styles.topAndViewContainer}>
            <Text style={styles.topText}> Other service providers</Text>
          </View>

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

          {allServiceProviders ? (
            <View style={{flex: 1}}>
              <FlatList
                data={allServiceProviders}
                onEndReached={getMoreJobUsers}
                onEndReachedThreshold={0.01}
                scrollEventThrottle={150}
                ListFooterComponent={() => (
                  <ActivityIndicator
                    color="white"
                    size="small"
                    styles={{marginBottom: 100}}
                  />
                )}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      addToJobViewedBy({
                        jobID: item.jobTitle,
                        jobUserID: item.jobUserID,
                      });
                      navigation.navigate('ServiceProviderProfile', {
                        userId: item.jobUserID,
                        jobId: item.jobTitle,
                      });
                    }}
                    key={item.uniqueID}
                    style={styles.allUsersCard}>
                    <View
                      style={{
                        backgroundColor: '#333333',
                        height: '100%',
                        width: 120,
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

                    <View
                      style={{flex: 1, margin: 10, justifyContent: 'center'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          position: 'absolute',
                          top: 0,
                          justifyContent: 'space-between',
                          width: '90%',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: '700',
                            fontSize: 16,
                            marginRight: 10,
                          }}>
                          {item.name.length <= 15
                            ? Capitalize(item.name)
                            : Capitalize(item.name.slice(0, 15) + '...')}
                        </Text>

                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
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

                      <View
                        style={{
                          flex: 1,
                          width: '90%',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#cc0066',
                            fontWeight: '700',
                            fontSize: 12,
                          }}>
                          {item.jobTitle.length <= 30
                            ? Capitalize(item.jobTitle)
                            : Capitalize(item.jobTitle.slice(0, 30) + '...')}
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
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 10,
                          position: 'absolute',
                          bottom: 0,
                          width: '90%',
                        }}>
                        <Text
                          style={{
                            color: '#009999',
                            fontSize: 12,
                            fontWeight: '700',
                          }}>
                          {item.location.length <= 15
                            ? item.location
                            : item.location.slice(0, 15) + '...'}
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
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                No data available
              </Text>
            </View>
          )}
        </>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text
            style={{
              color: 'white',
              fontWeight: '700',
              textAlign: 'center',
            }}>
            No data available for selected area
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
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
  searchIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  card: {
    backgroundColor: '#1a1a1a',
    height: 120,
    flexDirection: 'row',
    width: width - 50,
    flex: 1,
    marginRight: 10,
  },
  topAndViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  topText: {
    fontWeight: '700',
    fontFamily: 'RobotoBlack',
    color: 'orange',
  },
  allUsersCard: {
    backgroundColor: '#1a1a1a',
    height: 120,
    flexDirection: 'row',
    width: width,
    flex: 1,
    marginBottom: 20,
  },
  icons: {
    position: 'absolute',
    top: 13,
    zIndex: 1,
    left: 10,
  },
});
