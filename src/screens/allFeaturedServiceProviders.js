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

import axios from 'axios';

import Foundation from 'react-native-vector-icons/Foundation';

const {width} = Dimensions.get('window');

const AllFeaturedServiceProviders = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [featuredServiceProviders, setFeaturedServiceProviders] = useState([]);

  const [noData, setNoData] = useState(false);

  useEffect(() => {
    getFeaturedServiceProviders();
  }, [(navigation, loading)]);

  navigation.addListener('focus', () => setLoading(!loading));

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function getFeaturedServiceProviders() {
    setLoadingData(true);
    await axios
      .get(process.env.GET_FEATURED_SERVICE_PROVIDERS)
      .then(response => {
        setFeaturedServiceProviders(response.data);
        setLoadingData(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  async function getMore() {}

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
            data={featuredServiceProviders}
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

export default AllFeaturedServiceProviders;

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
    height: 130,
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
