import React, {useState, useEffect, useContext} from 'react';
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

import LinearGradient from 'react-native-linear-gradient';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from '../components/credentials-context';

const data = require('../assets/data/categories.json');
const servicesData = require('../assets/data/services.json');
const topServices = require('../assets/data/topServices.json');

const Home = ({navigation}) => {
  const [noData, setNoData] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [viewedUsersList, setViewedUsersList] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(true);

  const [noRecentlyViewed, setNoRecentlyViewed] = useState(false);
  const [noFeaturedServices, setNoFeaturedServices] = useState(false);

  const [filtered, setFiltered] = useState(servicesData);
  const [searching, setSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [displayX, setDisplayX] = useState(false);

  const [currentUserId, setCurrentUserId] = useState('');

  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);
  const {_id} = storedCredentials;

  useEffect(() => {
    getFeaturedUsers();
    getFeaturedServiceProviders();
    getRecentlyViewed();
    getCategoryList();
  }, [(navigation, loading)]);

  function onSearch(text) {
    if (text) {
      setSearching(true);
      const temp = text.toLowerCase();

      const tempList = servicesData.filter(item => {
        if (item.name.match(temp)) return item.name;
      });
      setFiltered(tempList);
    } else {
      setSearching(false);
      setFiltered(servicesData);
    }
  }

  async function getFeaturedServiceProviders() {
    setLoadingData(true);
    await axios
      .get(process.env.GET_FEATURED_SERVICE_PROVIDERS)
      .then(response => {
        setFeaturedServices(response.data);
        setLoadingData(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  // function Capitalize(str) {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // }

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

  async function addToJobViewedBy({userID, serviceProviderID}) {
    const url = process.env.ADD_TO_MY_VIEWS;
    if (userID != _id) {
      await axios
        .post(url, {
          serviceProviderID,
          userID,
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

  async function getRecentlyViewed() {
    const url = process.env.GET_RECENTLY_VIEWED + _id;

    await axios
      .get(url)
      .then(response => {
        setLoadingData(false);
        if (response.data.status == 'Failed') {
          setNoRecentlyViewed(true);
          setLoadingData(false);
        } else {
          setViewedUsersList(response.data);
          setNoRecentlyViewed(false);
          setLoadingData(false);
        }
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  navigation.addListener('focus', () => setLoading(!loading));

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

  function handleDisplayX() {
    setDisplayX(true);
  }

  async function getCategoryList() {
    setLoadingData(true);
    await axios
      .get(process.env.GET_CATEGORIES)
      .then(response => {
        setCategoryList(response.data.categories);
        setLoadingData(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  // if (loadingData == true) {
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
      {/* ---------------------------------Search---------------------------------------------------- */}

      <View style={styles.searchIconAndBarContainer}>
        <Ionicons
          style={styles.searchIcon}
          name="search"
          size={20}
          color="black"
        />
        <TextInput
          onChange={() => setDisplayX(true)}
          placeholder="Search a service"
          placeholderTextColor="#808080"
          style={styles.input}
          onChangeText={text => {
            onSearch(text);
            setSearchValue();
          }}
          value={searchValue}
        />
        {searchValue != '' && (
          <TouchableOpacity
            onPress={() => {
              setDisplayX(false), setSearching(false), setSearchValue('');
            }}
            style={{position: 'absolute', right: 10, top: 10}}>
            <Feather name="x-circle" size={20} color="black" />
          </TouchableOpacity>
        )}
      </View>

      <View style={{flex: 1}}>
        {searching && (
          <FlatList
            keyboardShouldPersistTaps="always"
            style={{marginTop: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filtered}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('JobMembers', {
                    jobId: item.name,
                  }),
                    setSearching(false);
                }}
                key={item.key}
                style={{
                  backgroundColor: 'gray',
                  padding: 10,
                  marginRight: 10,
                  borderRadius: 10,
                }}>
                <Text style={{color: 'white'}}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <View style={{flex: 1, marginBottom: 100}}>
        {/* ----------------------------------Featured users-------------------------------------------------- */}

        <View style={styles.topAndViewContainer}>
          <Text style={styles.topText}>Featured service providers</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('FeaturedUsers')}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, marginTop: 20}}>
          <FlatList
            scrollEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
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
                style={{
                  marginRight: 10,
                  height: 180,
                  width: 150,
                  backgroundColor: '#262626',
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}
                key={item._id}>
                <View style={{height: '70%', width: '100%'}}>
                  <Image
                    source={{
                      uri: item.profilePicture
                        ? item.profilePicture
                        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '700',
                      fontSize: 12,
                      marginRight: 10,
                    }}>
                    {item.firstName.length <= 15
                      ? item.firstName
                      : item.firstName.slice(0, 15) + '...'}
                  </Text>

                  <AntDesign name="star" size={12} color="orange" />
                </View>

                <Text
                  style={{
                    color: '#cc0066',
                    fontWeight: '700',
                    fontSize: 12,
                    marginLeft: 5,
                  }}>
                  {item.generalPromotedTitle.length <= 30
                    ? item.generalPromotedTitle
                    : item.generalPromotedTitle.slice(0, 30) + '...'}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* ----------------------------------Top texts-------------------------------------------------- */}

        <View style={styles.topAndViewContainer}>
          <Text style={styles.topText}>Top services</Text>
        </View>

        {/* -----------------------------------Top services---------------------------------------------- */}

        <View style={styles.topServScrollView}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={topServices}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('JobMembers', {
                    serviceName: item.name,
                  })
                }
                key={item.key}
                style={styles.topServContainer}>
                <Image style={styles.topServImg} source={{uri: item.image}} />
                <Text style={styles.topServText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* -------------------------Categories text------------------------------------------------- */}

        <View style={styles.topAndViewContainer}>
          <Text style={styles.topText}>Categories</Text>
        </View>

        {/* -------------------------Categories ------------------------------------------------- */}

        <View style={styles.categoriesContainer}>
          {categoryList.map(item => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('JobsInCategories', {
                  categoryID: item.categoryID,
                  categoryName: item.categoryName,
                })
              }
              style={styles.categoriesContainerMini}
              key={item.categoryID}>
              <LinearGradient
                style={{
                  height: '100%',
                  width: '100%',
                  backgroundColor: '#1a1a1a',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}
                colors={['rgba(0,0,0,0.8)', 'transparent']}>
                <Text style={styles.catText}>{item.categoryName}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* -------------------------Featured service providers--------------------------------- */}

        {featuredServices.length > 0 && (
          <>
            <View style={styles.topAndViewContainer}>
              <Text style={styles.topText}> Top dawgs</Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AllFeaturedServiceProviders')
                }>
                <Text style={styles.viewAll}>View all</Text>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, marginTop: 20}}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={featuredServices}
                renderItem={({item}) => (
                  <>
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
                          bio: item.provider.bio,
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
                          width: 120,
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

                      <View
                        style={{flex: 1, margin: 10, justifyContent: 'center'}}>
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
                            {item.provider.firstName.length <= 15
                              ? item.provider.firstName
                              : item.provider.firstName.slice(0, 15) + '...'}
                          </Text>

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
                            ? item.service.serviceName
                            : item.service.serviceName.slice(0, 30) + '...'}
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
                              color: '#33cccc',
                              fontSize: 12,
                              fontWeight: '700',
                              marginRight: 20,
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
                  </>
                )}
              />
            </View>
          </>
        )}

        {/* -------------------------Recently viewed------------------------------------------------- */}

        {viewedUsersList.length > 0 && (
          <>
            <View style={styles.topAndViewContainer}>
              <Text style={styles.topText}>Recently viewed</Text>
              <Text style={styles.viewAll}>View all</Text>
            </View>

            <View style={{flex: 1, marginTop: 20}}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={viewedUsersList}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ServiceProviderProfile', {
                        serviceProviderID: item.provider._id,
                        userID: item.provider.provider._id,
                        firstName: item.provider.provider.firstName,
                        lastName: item.provider.provider.lastName,
                        email: item.provider.provider.email,
                        phoneNumber: item.provider.provider.phoneNumber,
                        profilePicture: item.provider.provider.profilePicture,
                        location: item.provider.provider.location,
                        bio: item.provider.provider.bio,
                        image1: item.provider.image1,
                        image2: item.provider.image2,
                        image3: item.provider.image3,
                        rate: item.provider.rate,
                        rating: item.provider.rating,
                        description: item.provider.description,
                        isPromoted: item.provider.isPromoted,
                        serviceName: item.provider.service.serviceName,
                      });
                    }}
                    key={item._id}
                    style={styles.card}>
                    <View
                      style={{
                        backgroundColor: '#333333',
                        height: '100%',
                        width: 120,
                      }}>
                      <Image
                        source={{
                          uri: item.provider.image1
                            ? item.provider.image1
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
                          width: '100%',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: '700',
                            fontSize: 16,
                            marginRight: 10,
                          }}>
                          {item.provider.provider.firstName.length <= 15
                            ? item.provider.provider.firstName
                            : item.provider.provider.firstName.slice(0, 15) +
                              '...'}
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
                            {item.provider.rating.toFixed(1)}
                          </Text>
                        </View>
                      </View>

                      <Text
                        style={{
                          color: '#cc0066',
                          fontWeight: '700',
                          fontSize: 12,
                        }}>
                        {item.provider.service.serviceName.length <= 30
                          ? item.provider.service.serviceName
                          : item.provider.service.serviceName.slice(0, 30) +
                            '...'}
                      </Text>

                      <Text
                        style={{
                          color: '#a6a6a6',
                          fontSize: 10,
                        }}>
                        {item.provider.description.length <= 75
                          ? item.provider.description
                          : item.provider.description.slice(0, 75) + '...'}
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
                            color: '#33cccc',
                            fontSize: 12,
                            fontWeight: '700',
                            marginRight: 20,
                          }}>
                          {item.provider.provider.location.length <= 20
                            ? item.provider.provider.location
                            : item.provider.provider.location.slice(0, 20) +
                              '...'}
                        </Text>

                        <Text
                          style={{
                            color: '#ff6600',
                            fontWeight: '700',
                            fontSize: 12,
                          }}>
                          KSH. {item.provider.rate}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    paddingBottom: 100,
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
  topAndViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 10,
  },
  topText: {
    fontWeight: '700',
    fontFamily: 'RobotoBlack',
    color: 'orange',
  },
  viewAll: {
    fontWeight: '700',
    color: '#99c2ff',
    textDecorationLine: 'underline',
  },
  topServScrollView: {
    flex: 1,
    marginTop: 10,
  },
  topServImg: {
    resizeMode: 'cover',
    width: '100%',
    height: 100,
  },
  topServText: {
    textAlign: 'center',
    marginTop: 15,
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
  topServContainer: {
    height: 150,
    width: 150,
    backgroundColor: '#262626',
    marginRight: 10,
    borderRadius: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  itemAndCat: {
    flexDirection: 'column',
  },
  catText: {
    color: '#d9d9d9',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '700',
  },
  categoriesContainerMini: {
    height: 50,
    width: '30%',
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#1a1a1a',
    height: 120,
    flexDirection: 'row',
    width: width - 50,
    flex: 1,
    marginRight: 10,
  },
});
