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
import React, {useState, useEffect, useContext} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {CredentialsContext} from '../components/credentials-context';
import axios from 'axios';

export default function Saved({navigation}) {
  const [noData, setNoData] = useState(false);
  const [savedList, setSavedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);
  const {_id} = storedCredentials;

  navigation.addListener('focus', () => setLoading(!loading));

  useEffect(() => {
    getSavedJobs();
  }, [(navigation, loading)]);

  async function getSavedJobs() {
    setLoadingData(true);
    const url = process.env.GET_SAVED_SERVICES + _id;

    await axios
      .get(url)
      .then(response => {
        if (response.data.length > 0) {
          setSavedList(response.data);
          setLoadingData(false);
        } else {
          setNoData(true);
          setLoadingData(false);
        }
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  async function Unsave({serviceProviderID}) {
    setLoadingData(true);
    const url =
      process.env.DELETE_SAVED_SERVICE +
      serviceProviderID +
      '?currentUserID=' +
      _id;
    await axios
      .delete(url)
      .then(response => {
        console.log(response.data);
        getSavedJobs();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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
      {noData == false ? (
        <View style={{flex: 1}}>
          <FlatList
            data={savedList}
            renderItem={({item}) => (
              <>
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
                      width: 120 * 1.2,
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
                        {item.provider.provider.firstName}
                      </Text>

                      <AntDesign name="star" size={15} color="orange" />

                      <Text
                        style={{
                          marginLeft: 10,
                          color: 'orange',
                          fontWeight: '700',
                        }}>
                        {item.provider.rating.toFixed(1)}
                      </Text>

                      <AntDesign
                        onPress={() =>
                          Unsave({
                            serviceProviderID: item.provider._id,
                          })
                        }
                        style={{position: 'absolute', right: 0}}
                        name="heart"
                        size={20}
                        color="#00ccff"
                      />
                    </View>

                    <Text
                      style={{
                        color: '#cc0066',
                        fontWeight: '700',
                        fontSize: 12,
                      }}>
                      {Capitalize(item.provider.service.serviceName)}
                    </Text>

                    <Text
                      style={{
                        color: '#a6a6a6',
                        fontSize: 10,
                      }}>
                      {item.provider.description.slice(0, 85) + '...'}
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
                        {item.provider.provider.location}
                      </Text>

                      <Text
                        style={{
                          color: '#cccccc',
                          fontWeight: '700',
                          fontSize: 12,
                        }}>
                        KSH. {item.provider.rate}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
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
            No saved items
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
