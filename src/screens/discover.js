import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';

import axios from 'axios';
import {CredentialsContext} from '../components/credentials-context';

const {width} = Dimensions.get('window');

const Discover = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [allServiceProviders, setAllServiceProviders] = useState([]);

  const [location, setLocation] = useState('');
  const [serviceName, setServiceName] = useState('');

  const [rate, setRate] = useState('1');
  const [rating, setRating] = useState('-1');
  const [isPromoted, setIsPromoted] = useState('-1');

  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);

  const {_id} = storedCredentials;

  const [busy, setBusy] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);

  const ref = useRef();

  let pageNumber = 0;
  const limit = 20;

  useEffect(() => {
    // getFeaturedServiceProviders();
    getAllServiceProviders();

    return () => {
      pageNo = 0;
      setReachedEnd(false);
    };
  }, [(navigation, loading)]);

  navigation.addListener('focus', () => setLoading(!loading));

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // async function getFeaturedServiceProviders() {
  //   setLoadingData(true);
  //   await axios
  //     .get(process.env.GET_FEATURED_SERVICE_PROVIDERS)
  //     .then(response => {
  //       setFeaturedServiceProviders(response.data);
  //       setLoadingData(false);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setLoadingData(false);
  //     });
  // }

  async function getAllServiceProviders() {
    const url = `${process.env.GET_ALL_SERVICE_PROVIDERS}?pageNumber=${pageNumber}&limit=${limit}`;
    const filterURL = `${process.env.FILTER_SERVICE_PROVIDERS}?location=${location}&serviceName=${serviceName}&rate=${rate}&rating=${rating}&isPromoted=${isPromoted}&pageNumber=${pageNumber}&limit=${limit}`;

    console.log(filterURL);
    await axios
      .get(filterURL)
      .then(response => {
        setAllServiceProviders(response.data.serviceProviders);
        setLoadingData(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  async function getMorePosts() {
    pageNumber += 1;
    const url = `${process.env.GET_ALL_SERVICE_PROVIDERS}?pageNumber=${pageNumber}&limit=${limit}`;

    if (reachedEnd == true) {
      return;
    } else {
      await axios.get(url).then(response => {
        if (response.data.serviceProviderCount === allServiceProviders.length) {
          setReachedEnd(true);
        } else {
          setAllServiceProviders([
            ...allServiceProviders,
            ...response.data.serviceProviders,
          ]);
        }
      });
    }
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
          console.log('Adding to views', response.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return;
    }
  }

  if (loadingData == true) {
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
      <FlatList
        // onEndReached={() => {
        //   getMorePosts();
        // }}
        onEndReachedThreshold={0}
        data={allServiceProviders}
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
            style={styles.allUsersCard}>
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
                  : Capitalize(item.service.serviceName.slice(0, 30) + '...')}
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
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  justifyContent: 'space-between',
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
        // ListFooterComponent={() => {
        //   return reachedEnd ? (
        //     <Text
        //       style={{
        //         fontWeight: '700',
        //         color: '#d9d9d9',
        //         textAlign: 'center',
        //         padding: 15,
        //         marginBottom: 100,
        //       }}>
        //       No more data
        //     </Text>
        //   ) : (
        //     <ActivityIndicator size="large" color="white" />
        //   );
        // }}
      />
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
    height: 120,
    flexDirection: 'row',
    width: width - 50,
    flex: 1,
    marginRight: 10,
  },
  topAndViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
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
  viewAll: {
    fontWeight: '700',
    color: '#99c2ff',
    textDecorationLine: 'underline',
  },
});
