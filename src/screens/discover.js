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
  Button,
  RefreshControl,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LinearGradient from 'react-native-linear-gradient';

const servicesData = require('../assets/data/services.json');
const filterData = require('../assets/data/filterOptions.json');
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import axios from 'axios';

const {width} = Dimensions.get('window');

const Discover = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [noFeaturedServices, setNoFeaturedServices] = useState(false);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [allServiceProviders, setAllServiceProviders] = useState([]);

  const [noDataInArea, setNoDataInArea] = useState(false);
  const [noData, setNoData] = useState(false);
  const [newLocation, setNewLocation] = useState('');

  const [filtered, setFiltered] = useState(servicesData);
  const [searching, setSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [displayX, setDisplayX] = useState(false);

  let onEndReachedCalledDuringMomentum = false;
  const [lastDoc, setLastDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const ref = useRef();

  function handleXPress() {
    ref.current?.setAddressText('');
    // getAllUsersList();
    setNewLocation('');
    setNoDataInArea(false);
  }

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

  useEffect(() => {
    getFeaturedServices();
    getAllServiceProviders();
  }, [(navigation, loading)]);

  navigation.addListener('focus', () => setLoading(!loading));

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getFeaturedServices() {}

  async function getAllServiceProviders() {
    const url = process.env.GET_SERVICE_PROVIDERS;
    await axios
      .get(url)
      .then(response => {
        if (response.data.status == 'Failed') {
          setNoDataInArea(true);
          setLoadingData(false);
        } else {
          setNoDataInArea(false);
          setAllServiceProviders(response.data);
          setLoadingData(false);
        }
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  async function getMore() {}

  function handleLocationPress({newLocation}) {}

  function findKeyAndSearch({item}) {}

  async function addToJobViewedBy({jobID, jobUserID}) {}

  const onRefresh = () => {
    setTimeout(() => {
      getAllUsersList();
    }, 1000);
  };

  const renderFooter = () => {
    if (!isMoreLoading) return true;

    return (
      <ActivityIndicator
        size="small"
        color={'#D83E64'}
        style={{marginBottom: 10}}
      />
    );
  };

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
    <View style={styles.container}>
      {noData == false ? (
        <View style={{flex: 1}}>
          <FlatList
            data={allServiceProviders}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  // addToJobViewedBy({
                  //   jobID: item.jobTitle,
                  //   jobUserID: item.key,
                  // });

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
                style={styles.allUsersCard}>
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
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '700',
                        fontSize: 16,
                        marginRight: 10,
                      }}>
                      {item.provider.firstName.length <= 15
                        ? Capitalize(item.provider.firstName)
                        : Capitalize(
                            item.provider.firstName.slice(0, 15) + '...',
                          )}
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
};

export default Discover;

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
    height: 140,
    flexDirection: 'row',
    width: width,
    flex: 1,
    marginRight: 10,
  },
  topAndViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    width: width - 20,
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
