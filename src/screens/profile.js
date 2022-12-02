import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  Animated,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';

const {width} = Dimensions.get('window');

import dateFormat from 'dateformat';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {CredentialsContext} from '../components/credentials-context';

import axios from 'axios';

export default function Profile({route, navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [generalPromotedTitle, setGeneralTitle] = useState('');

  const [jobsList, setJobsList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [profileVisits, setProfileVisits] = useState();

  const [noReviews, setNoReviews] = useState(false);

  const [noJobsData, setNoJobsData] = useState(false);

  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(true);

  const currentUserID = route.params.userID;

  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);
  const {_id} = storedCredentials;

  const scrollSwitching = useRef();
  const animation = useRef(new Animated.Value(0)).current;

  navigation.addListener('focus', () => setLoading(!loading));

  useEffect(() => {
    getUserData();
    getJobs();
    getProfileVisits();
    getReviews();
  }, [(navigation, loading)]);

  async function getUserData() {
    setLoadingData(true);
    const url = process.env.GET_USER_DATA + currentUserID;

    await axios
      .get(url)
      .then(response => {
        userData = response.data.data;

        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setPhoneNumber(userData.phoneNumber);
        setLocation(userData.location);
        setGeneralTitle(userData.generalPromotedTitle);
        setBio(userData.bio);
        setProfilePicture(userData.profilePicture);

        setLoadingData(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  async function getJobs() {
    const url = process.env.GET_MY_OTHER_SERVICES + currentUserID;

    await axios
      .get(url)
      .then(response => {
        if (response.data.status == 'Failed') {
          setNoJobsData(true);
          setLoadingData(false);
        } else {
          setJobsList(response.data);
          setLoadingData(false);
          setNoJobsData(false);
        }
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  async function getReviews() {
    const url = process.env.GET_ALL_REVIEWS + currentUserID;

    await axios
      .get(url)
      .then(response => {
        if (response.data.length <= 0) {
          setNoReviews(true);
          setLoadingData(false);
        } else {
          setReviewList(response.data);
          setLoadingData(false);
          setNoReviews(false);
        }
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function getProfileVisits() {
    const url = process.env.GET_PROFILE_VISITS + currentUserID;
    await axios
      .get(url)
      .then(response => {
        setProfileVisits(response.data.data.length);
        setLoadingData(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  async function opneImageURL() {
    if (profilePicture) {
      const supported = Linking.canOpenURL(profilePicture);

      if (supported) {
        await Linking.openURL(profilePicture);
        console.log(profilePicture);
      } else {
        Alert.alert('Error', 'Not able to open image location');
      }
    } else {
      return null;
    }
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
    <ScrollView style={styles.container}>
      <ImageBackground
        style={{
          width: '100%',
          height: 170,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        source={{
          uri: 'https://cutewallpaper.org/21/background-images-hd-1080p-free-download/Download-Hd-Video-Backgrounds-1080p-Free-Download-High-.jpg',
        }}>
        <TouchableOpacity>
          <Image
            style={{width: 120, height: 120, borderRadius: 60}}
            source={{
              uri: profilePicture
                ? profilePicture
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            }}
          />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.detailsContainer}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            style={{
              position: 'absolute',
              zIndex: 1,
              right: 20,
              flex: 1,
            }}>
            <AntDesign name="edit" color="#00ffff" size={25} />
          </TouchableOpacity>
        </View>

        <View>
          <Fontisto
            style={[styles.icons, {left: 1}]}
            name="person"
            size={20}
            color="#ff4d4d"
          />
          <Text style={[styles.text, {marginTop: 0}]}>
            {firstName} {lastName}
          </Text>
        </View>

        <View>
          <MaterialIcons
            style={[styles.icons, {top: 10}]}
            name="miscellaneous-services"
            size={20}
            color="#ff4d4d"
          />
          <Text style={[styles.text, {marginTop: 10}]}>
            {generalPromotedTitle}
          </Text>
        </View>

        <View>
          <Ionicons
            style={[styles.icons, {top: 10}]}
            name="mail"
            size={20}
            color="#9494b8"
          />
          <Text style={styles.text}>{email}</Text>
        </View>

        <View>
          <Entypo
            style={[styles.icons, {top: 10}]}
            name="old-phone"
            size={20}
            color="#80ff80"
          />
          <Text style={styles.text}>{phoneNumber}</Text>
        </View>

        <View>
          <Ionicons
            style={[styles.icons, {top: 10}]}
            name="location"
            size={20}
            color="#cc6600"
          />
          <Text style={styles.text}>{location}</Text>
        </View>

        <View>
          <MaterialCommunityIcons
            style={[styles.icons, {top: 10}]}
            name="bio"
            size={20}
            color="#df9fbf"
          />
          <Text style={[styles.text, {color: '#8c8c8c'}]}>{bio}</Text>
        </View>

        <View style={{marginTop: 10}}>
          <Entypo
            style={[styles.icons, {top: 10}]}
            name="eye"
            size={20}
            color="white"
          />
          <Text style={[styles.text, {color: '#8c8c8c'}]}>
            {profileVisits} unique profile visit(s)
          </Text>
        </View>
      </View>

      <View style={{marginTop: 240, padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          {noJobsData == true ? (
            <>
              <TouchableWithoutFeedback>
                <Animated.View
                  style={{
                    width: '50%',
                    backgroundColor: '#1a1a1a',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      color: 'orange',
                      fontWeight: '700',
                      fontSize: 20,
                    }}>
                    My jobs
                  </Text>
                </Animated.View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback>
                <Animated.View
                  style={{
                    width: '50%',
                    backgroundColor: '#333333',
                    padding: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'orange',
                      fontWeight: '700',
                      fontSize: 20,
                    }}>
                    All reviews
                  </Text>
                </Animated.View>
              </TouchableWithoutFeedback>
            </>
          ) : (
            <>
              <TouchableWithoutFeedback
                onPress={() => scrollSwitching.current.scrollTo({x: 0})}>
                <Animated.View
                  style={{
                    width: '50%',
                    backgroundColor: '#1a1a1a',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      color: 'orange',
                      fontWeight: '700',
                      fontSize: 20,
                    }}>
                    My jobs
                  </Text>
                </Animated.View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => scrollSwitching.current.scrollTo({x: width})}>
                <Animated.View
                  style={{
                    width: '50%',
                    backgroundColor: '#333333',
                    padding: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'orange',
                      fontWeight: '700',
                      fontSize: 20,
                    }}>
                    All reviews
                  </Text>
                </Animated.View>
              </TouchableWithoutFeedback>
            </>
          )}
        </View>

        {noJobsData == false ? (
          <ScrollView
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: animation}}}],
              {useNativeDriver: false},
            )}
            ref={scrollSwitching}
            scrollEventThrottle={16}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{}}>
            <View style={{width: width - 20, flex: 1}}>
              {jobsList.map(item => (
                <TouchableOpacity
                  onPress={() => {
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
                  style={styles.jobContainer}
                  key={item._id}>
                  <Image
                    source={{
                      uri: item.image1
                        ? item.image1
                        : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png',
                    }}
                    style={{
                      height: '100%',
                      width: 120,
                    }}
                  />

                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      marginLeft: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: '#cc0066',
                          fontWeight: '700',
                          marginRight: 10,
                        }}>
                        {item.service.serviceName.length <= 20
                          ? Capitalize(item.service.serviceName)
                          : Capitalize(
                              item.service.serviceName.slice(0, 20) + '...',
                            )}
                      </Text>

                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AntDesign name="star" size={15} color="orange" />

                        <Text
                          style={{
                            color: 'orange',
                            fontWeight: '700',
                            marginLeft: 10,
                          }}>
                          {item.rating.toFixed(1)}
                        </Text>
                      </View>
                    </View>

                    <Text style={{color: 'white', fontSize: 12}}>
                      {item.description.length <= 85
                        ? item.description
                        : item.description.slice(0, 85) + '...'}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          color: '#ff6600',
                          fontSize: 12,
                        }}>
                        KSH. {item.rate}
                      </Text>

                      {/* <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Entypo
                          style={{}}
                          name="eye"
                          size={13}
                          color="#ffbf80"
                        />
                        <Text
                          style={{
                            color: '#ffbf80',
                            fontWeight: '800',
                            fontSize: 10,
                            marginLeft: 10,
                          }}>
                          {item.jobViewedBy.length} view(s)
                        </Text>
                      </View> */}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View
              style={{
                flex: 1,
                width: width,
                alignItems: 'center',
              }}>
              {noReviews == true ? (
                <View
                  style={{
                    width: width,
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '700',
                      textAlign: 'center',
                      marginTop: 40,
                    }}>
                    You have no reviews
                  </Text>
                </View>
              ) : (
                <>
                  {reviewList.map(item => (
                    <View
                      key={item._id}
                      style={{
                        backgroundColor: '#1a1a1a',
                        width: width - 40,
                        marginBottom: 20,
                        height: 140,
                        borderRadius: 10,
                        padding: 10,
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          position: 'absolute',
                          zIndex: 1,
                          top: 10,
                          left: 10,
                        }}>
                        <Text
                          style={{
                            color: 'gray',
                            fontWeight: '700',
                            marginRight: 10,
                          }}>
                          {item.whoReviewed.firstName}{' '}
                          {item.whoReviewed.lastName}
                        </Text>

                        <AntDesign name="star" size={15} color="orange" />

                        <Text
                          style={{
                            color: 'white',
                            marginLeft: 10,
                            fontWeight: '700',
                          }}>
                          {item.rating}
                        </Text>
                      </View>

                      {_id === item.whoReviewed._id && (
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            zIndex: 1,
                            right: 10,
                            top: 10,
                          }}
                          onPress={() => deleteReview({item})}>
                          <Ionicons name="trash" size={20} color="orange" />
                        </TouchableOpacity>
                      )}

                      <Text
                        style={{
                          fontWeight: '700',
                          color: 'white',
                          fontSize: 16,
                        }}>
                        {item.reviewMessage}
                      </Text>

                      <Text
                        style={{
                          color: 'gray',
                          fontWeight: '700',
                          position: 'absolute',
                          zIndex: 1,
                          bottom: 10,
                          left: 10,
                        }}>
                        {dateFormat(item.createdAt, 'default')}
                      </Text>
                    </View>
                  ))}
                </>
              )}
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              width: width,
              flex: 1,
              marginTop: 40,
              alignItems: 'center',
              padding: 20,
              marginBottom: 40,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
              }}>
              You haven't posted any jobs
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  icons: {
    position: 'absolute',
    zIndex: 1,
  },
  text: {
    marginTop: 10,
    color: 'white',
    fontWeight: '700',
    marginLeft: 30,
  },
  detailsContainer: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: 'absolute',
    alignSelf: 'center',
    top: 150,
    elevation: 5,
    shadowColor: 'white',
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderColor: 'white',
    width: '90%',
    height: 280,
  },
  jobContainer: {
    height: 140,
    backgroundColor: '#0d0d0d',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
});
