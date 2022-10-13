import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  View,
  ActivityIndicator,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useRef, useContext} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';

import axios from 'axios';

import {CredentialsContext} from '../components/credentials-context';

import {RadioButton} from 'react-native-paper';

import DropDownPicker from 'react-native-dropdown-picker';

const {width} = Dimensions.get('window');

export default function JobMembers({route, navigation}) {
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(true);

  let [usersList, setUsersList] = useState([]);

  const [noData, setNoData] = useState(false);
  let [reachedEnd, setReachedEnd] = useState(false);

  let [location, setLocation] = useState('');
  let [rate, setRate] = useState('1');
  let [rating, setRating] = useState('-1');
  let [isPromoted, setIsPromoted] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  let pageNumber = 0;
  const limit = 20;

  const serviceName = route.params.serviceName.toLowerCase();

  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);
  const {_id} = storedCredentials;

  useEffect(() => {
    getUsers();
  }, [(navigation, loading)]);

  navigation.addListener('focus', () => setLoading(!loading));

  async function getUsers() {
    setLoadingData(true);
    let url = `${process.env.GET_USERS_OF_A_SERVICE}${serviceName}?location=${location}&serviceName=${serviceName}&rate=${rate}&rating=${rating}&isPromoted=${isPromoted}&pageNumber=${pageNumber}&limit=${limit}`;
    await axios
      .get(url)
      .then(response => {
        if (response.data.serviceProviders.length <= 0) {
          setReachedEnd(true);
          setLoadingData(false);
          setNoData(true);
        } else {
          setUsersList(response.data.serviceProviders);
          setLoadingData(false);
          setNoData(false);
        }
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  async function getMorePosts() {
    pageNumber += 1;
    let url = `${process.env.FILTER_SERVICE_PROVIDERS}?location=${location}&serviceName=${serviceName}&rate=${rate}&rating=${rating}&isPromoted=${isPromoted}&pageNumber=${pageNumber}&limit=${limit}`;

    if (reachedEnd === true) {
      return;
    } else {
      await axios.get(url).then(response => {
        if (response.data.serviceProviderCount === usersList.length) {
          setReachedEnd(true);
        } else {
          setUsersList([...usersList, ...response.data.serviceProviders]);
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

  const [locationTitle, setlocationTitle] = useState(null);
  const [openlocation, setOpenlocation] = useState(false);
  const [itemslocation, setItemslocation] = useState([
    {label: 'all', value: '', category: '630e24b284e428f126a46dfd'},

    {
      value: 'Nairobi',
      lat: '-1.2864',
      lng: '36.8172',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Nairobi',
      capital: 'primary',
      population: '5545000',
      population_proper: '5545000',
    },
    {
      value: 'Meru',
      lat: '0.0500',
      lng: '37.6500',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Meru',
      capital: 'admin',
      population: '1833000',
      population_proper: '1833000',
    },
    {
      value: 'Mombasa',
      lat: '-4.0500',
      lng: '39.6667',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Mombasa',
      capital: 'admin',
      population: '1200000',
      population_proper: '1200000',
    },
    {
      value: 'Kisumu',
      lat: '-0.1000',
      lng: '34.7500',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kisumu',
      capital: 'admin',
      population: '409928',
      population_proper: '409928',
    },
    {
      value: 'Nakuru',
      lat: '-0.2833',
      lng: '36.0667',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Nakuru',
      capital: 'admin',
      population: '307990',
      population_proper: '307990',
    },
    {
      value: 'Eldoret',
      lat: '0.5167',
      lng: '35.2833',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Uasin Gishu',
      capital: 'admin',
      population: '193830',
      population_proper: '193830',
    },
    {
      value: 'Machakos',
      lat: '-1.5167',
      lng: '37.2667',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Machakos',
      capital: 'admin',
      population: '114109',
      population_proper: '114109',
    },
    {
      value: 'Kisii',
      lat: '-0.6698',
      lng: '34.7675',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kisii',
      capital: 'admin',
      population: '112417',
      population_proper: '112417',
    },
    {
      value: 'Mumias',
      lat: '0.3333',
      lng: '34.4833',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kakamega',
      capital: '',
      population: '99987',
      population_proper: '99987',
    },
    {
      value: 'Thika',
      lat: '-1.0396',
      lng: '37.0900',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kiambu',
      capital: '',
      population: '99322',
      population_proper: '87821',
    },
    {
      value: 'Nyeri',
      lat: '-0.4167',
      lng: '36.9500',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Nyeri',
      capital: 'admin',
      population: '98908',
      population_proper: '98908',
    },
    {
      value: 'Malindi',
      lat: '-3.2100',
      lng: '40.1000',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kilifi',
      capital: '',
      population: '94016',
      population_proper: '68304',
    },
    {
      value: 'Kakamega',
      lat: '0.2833',
      lng: '34.7500',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kakamega',
      capital: 'admin',
      population: '91778',
      population_proper: '91778',
    },
    {
      value: 'Kendu Bay',
      lat: '-0.3596',
      lng: '34.6400',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Homa Bay',
      capital: '',
      population: '91248',
      population_proper: '91248',
    },
    {
      value: 'Lodwar',
      lat: '3.1167',
      lng: '35.6000',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Turkana',
      capital: 'admin',
      population: '82970',
      population_proper: '82970',
    },
    {
      value: 'Athi River',
      lat: '-1.4500',
      lng: '36.9833',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Machakos',
      capital: '',
      population: '81302',
      population_proper: '81302',
    },
    {
      value: 'Kilifi',
      lat: '-3.6333',
      lng: '39.8500',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kilifi',
      capital: '',
      population: '80339',
      population_proper: '46118',
    },
    {
      value: 'Sotik',
      lat: '-0.6796',
      lng: '35.1200',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Bomet',
      capital: '',
      population: '71285',
      population_proper: '2600',
    },
    {
      value: 'Garissa',
      lat: '-0.4569',
      lng: '39.6583',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Garissa',
      capital: 'admin',
      population: '65881',
      population_proper: '65881',
    },
    {
      value: 'Kitale',
      lat: '1.0167',
      lng: '35.0000',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Trans Nzoia',
      capital: 'admin',
      population: '63245',
      population_proper: '63245',
    },
    {
      value: 'Bungoma',
      lat: '0.5666',
      lng: '34.5666',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Bungoma',
      capital: 'admin',
      population: '55857',
      population_proper: '55857',
    },
    {
      value: 'Isiolo',
      lat: '0.3500',
      lng: '37.5833',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Isiolo',
      capital: 'admin',
      population: '45989',
      population_proper: '45989',
    },
    {
      value: 'Wajir',
      lat: '1.7500',
      lng: '40.0667',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Wajir',
      capital: 'admin',
      population: '45771',
      population_proper: '34709',
    },
    {
      value: 'Embu',
      lat: '-0.5333',
      lng: '37.4500',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Embu',
      capital: 'admin',
      population: '41092',
      population_proper: '41092',
    },
    {
      value: 'Voi',
      lat: '-3.3696',
      lng: '38.5700',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Taita/Taveta',
      capital: '',
      population: '36487',
      population_proper: '19624',
    },
    {
      value: 'Homa Bay',
      lat: '-0.5167',
      lng: '34.4500',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Homa Bay',
      capital: 'admin',
      population: '32174',
      population_proper: '32174',
    },
    {
      value: 'Nanyuki',
      lat: '0.0167',
      lng: '37.0667',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Laikipia',
      capital: '',
      population: '31577',
      population_proper: '31577',
    },
    {
      value: 'Busia',
      lat: '0.4608',
      lng: '34.1108',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Busia',
      capital: 'admin',
      population: '30777',
      population_proper: '30777',
    },
    {
      value: 'Mandera',
      lat: '3.9167',
      lng: '41.8333',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Mandera',
      capital: 'admin',
      population: '30433',
      population_proper: '30433',
    },
    {
      value: 'Kericho',
      lat: '-0.3692',
      lng: '35.2839',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kericho',
      capital: 'admin',
      population: '30023',
      population_proper: '30023',
    },
    {
      value: 'Kitui',
      lat: '-1.3667',
      lng: '38.0167',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kitui',
      capital: 'admin',
      population: '29062',
      population_proper: '29062',
    },
    {
      value: 'Maralal',
      lat: '1.1000',
      lng: '36.7000',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Samburu',
      capital: 'admin',
      population: '20841',
      population_proper: '20841',
    },
    {
      value: 'Lamu',
      lat: '-2.2686',
      lng: '40.9003',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Lamu',
      capital: 'admin',
      population: '18382',
      population_proper: '18382',
    },
    {
      value: 'Kapsabet',
      lat: '0.2000',
      lng: '35.1000',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Nandi',
      capital: 'admin',
      population: '17918',
      population_proper: '17918',
    },
    {
      value: 'Marsabit',
      lat: '2.3333',
      lng: '37.9833',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Marsabit',
      capital: 'admin',
      population: '17127',
      population_proper: '17127',
    },
    {
      value: 'Hola',
      lat: '-1.5000',
      lng: '40.0300',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Tana River',
      capital: 'admin',
      population: '6931',
      population_proper: '6931',
    },
    {
      value: 'Kiambu',
      lat: '-1.1714',
      lng: '36.8356',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kiambu',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Kabarnet',
      lat: '0.4919',
      lng: '35.7430',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Baringo',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Migori',
      lat: '-1.0634',
      lng: '34.4731',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Migori',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Kerugoya',
      lat: '-0.4989',
      lng: '37.2803',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kirinyaga',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Iten',
      lat: '0.6703',
      lng: '35.5081',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Elgeyo/Marakwet',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Nyamira',
      lat: '-0.5633',
      lng: '34.9358',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Nyamira',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Murang’a',
      lat: '-0.7210',
      lng: '37.1526',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Murang’a',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Sotik Post',
      lat: '-0.7813',
      lng: '35.3416',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Bomet',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Siaya',
      lat: '0.0607',
      lng: '34.2881',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Siaya',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Kapenguria',
      lat: '1.2389',
      lng: '35.1119',
      country: 'Kenya',
      iso2: 'KE',
      label: 'West Pokot',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Wote',
      lat: '-1.7808',
      lng: '37.6288',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Makueni',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Mwatate',
      lat: '-3.5050',
      lng: '38.3772',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Taita/Taveta',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Kajiado',
      lat: '-1.8500',
      lng: '36.7833',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kajiado',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Ol Kalou',
      lat: '-0.2643',
      lng: '36.3788',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Nyandarua',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Narok',
      lat: '-1.0833',
      lng: '35.8667',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Narok',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Kwale',
      lat: '-4.1737',
      lng: '39.4521',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kwale',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Rumuruti',
      lat: '0.2725',
      lng: '36.5381',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Laikipia',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
  ]);

  if (loadingData === true) {
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
      {noData == true ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text
            style={{
              color: 'white',
              fontWeight: '700',
              textAlign: 'center',
            }}>
            No data found
          </Text>
        </View>
      ) : (
        <FlatList
          onEndReached={() => {
            getMorePosts();
          }}
          onEndReachedThreshold={0}
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
          ListFooterComponent={() => {
            return reachedEnd ? (
              <Text
                style={{
                  fontWeight: '700',
                  color: '#d9d9d9',
                  textAlign: 'center',
                  padding: 15,
                  marginBottom: 100,
                }}>
                No more data
              </Text>
            ) : (
              <ActivityIndicator size="large" color="white" />
            );
          }}
        />
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontWeight: '800',
                marginBottom: 10,
              }}>
              Filter options
            </Text>

            <DropDownPicker
              listItemLabelStyle={{
                color: 'white',
              }}
              categorySelectable={true}
              listMode="SCROLLVIEW"
              searchable={true}
              searchPlaceholder="Search a location..."
              searchContainerStyle={{
                borderBottomColor: 'transparent',
                marginTop: 10,
              }}
              searchTextInputStyle={{
                borderColor: 'white',
                color: 'white',
              }}
              disableBorderRadius={true}
              zIndex={2000}
              placeholder="Filter by location"
              open={openlocation}
              value={locationTitle}
              items={itemslocation}
              setOpen={setOpenlocation}
              setValue={setlocationTitle}
              setItems={setItemslocation}
              onSelectItem={item => {
                setLocation(item.value);
                setIsPromoted('');
              }}
              dropDownContainerStyle={{
                backgroundColor: '#262626',
                zIndex: 1,
                paddingHorizontal: 10,
                width: '80%',
                alignSelf: 'center',
              }}
              style={{
                backgroundColor: '#b3d9ff',
                width: '80%',
                alignSelf: 'center',
                marginBottom: 10,
              }}
            />

            <View style={styles.radiosContainer}>
              <Text style={styles.label}>Filter by rate</Text>
              <View style={styles.radioAndText}>
                <RadioButton
                  value="-1"
                  status={rate === '-1' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setRate('-1');
                    setIsPromoted('-1');
                  }}
                />
                <Text style={styles.transText}>High to low</Text>
              </View>

              <View style={styles.radioAndText}>
                <RadioButton
                  value="1"
                  status={rate === '1' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setRate('1');
                    setIsPromoted('-1');
                  }}
                />
                <Text style={styles.transText}>Low to high</Text>
              </View>
            </View>

            <View style={styles.radiosContainer}>
              <Text style={styles.label}>Filter by rating</Text>
              <View style={styles.radioAndText}>
                <RadioButton
                  value="-1"
                  status={rating === '-1' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setRating('-1');
                    setIsPromoted('-1');
                  }}
                />
                <Text style={styles.transText}>High to low</Text>
              </View>

              <View style={styles.radioAndText}>
                <RadioButton
                  value="1"
                  status={rating === '1' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setRating('1');
                    setIsPromoted('-1');
                  }}
                />
                <Text style={styles.transText}>Low to high</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                getUsers();
                setModalVisible(false);
              }}
              style={[
                styles.buttonMain,
                {backgroundColor: '#660033', width: '80%'},
              ]}>
              {isFiltering ? (
                <ActivityIndicator color="white" size="small" animating />
              ) : (
                <Text style={styles.buttonText}>Submit</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={[
                styles.buttonMain,
                {backgroundColor: '#ff3300', width: '80%'},
              ]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.filterContainer}>
        <AntDesign name="filter" size={40} color="white" />
      </TouchableOpacity>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    width: '90%',
    height: 600,
    justifyContent: 'center',
    shadowColor: 'white',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    paddingTop: 10,
  },
  filterContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: 'white',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'gray',
  },
  buttonMain: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#336699',
    borderRadius: 10,
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  radiosContainer: {
    backgroundColor: '#ccdcff',
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  radioAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: '800',
    color: 'black',
    marginLeft: 10,
    marginBottom: 10,
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
