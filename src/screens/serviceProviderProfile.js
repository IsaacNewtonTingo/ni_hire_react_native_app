import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
  Alert,
  Linking,
  Modal,
} from 'react-native';

import dateFormat from 'dateformat';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';

import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from '../components/credentials-context';

const {width} = Dimensions.get('window');

const B = props => <Text style={{color: 'gray'}}>{props.children}</Text>;

export default function ServiceProviderProfile({route, navigation}) {
  const [jobsList, setJobsList] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  const [noReviews, setNoReviews] = useState(false);
  const [noData, setNoData] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const [reLoading, setReLoading] = useState(false);
  const [posting, setIsPosting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isSaved, setSaved] = useState(false);

  const [serviceViews, setServiceViews] = useState();
  const [numberOfReviews, setNumberOfReviews] = useState();

  const [review, setReview] = useState('');
  const [defaultRating, setDefaultRating] = useState(1);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const [disabled, setDisabled] = useState(false);

  let serviceProviderID = route.params.serviceProviderID;
  let userID = route.params.userID;

  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);

  const {_id} = storedCredentials;

  navigation.addListener('focus', () => setLoading(!loading));

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  const [location, setLocation] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [bio, setBio] = useState('');

  const [serviceName, setServiceName] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState('');
  const [rating, setRating] = useState();
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    getServiceProviderData();
    getOtherServices();
    getReviewList();
    getNumberOfViews();
    checkIfSaved();

    return () => {
      getServiceProviderData();
      getOtherServices();
      getReviewList();
      getNumberOfViews();
      checkIfSaved();
    };
  }, [(loading, navigation)]);

  async function getServiceProviderData() {
    setLoadingData(true);
    const url = process.env.GET_SERVICE_PROVIDER_DATA + serviceProviderID;
    await axios
      .get(url)
      .then(response => {
        if (response.data.status != 'Failed') {
          setFirstName(response.data.provider.firstName);
          setLastName(response.data.provider.lastName);
          setEmail(response.data.provider.email);
          setPhoneNumber(response.data.provider.phoneNumber);
          setLocation(response.data.provider.location);
          setProfilePicture(response.data.provider.profilePicture);
          setBio(response.data.provider.bio);

          setServiceName(response.data.service.serviceName);
          setRating(response.data.rating);
          setRate(response.data.rate);
          setDescription(response.data.description);
          setIsFeatured(response.data.isPromoted);
          setImage1(response.data.image1);
          setImage2(response.data.image2);
          setImage3(response.data.image3);
        } else {
          setFirstName('');
          setLastName('');
          setEmail('');
          setPhoneNumber('');
          setLocation('');
          setProfilePicture('');
          setBio('');

          setServiceName('');
          setRating(null);
          setRate(null);
          setDescription('');
          setIsFeatured(false);
          setImage1('');
          setImage2('');
          setImage3('');
        }

        setLoadingData(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  async function getOtherServices() {
    const url = process.env.GET_MY_OTHER_SERVICES + userID;
    await axios
      .get(url)
      .then(response => {
        if (response.data.status == 'Failed') {
          setNoData(true);
        } else {
          setJobsList(response.data);

          setNoData(false);
        }
      })
      .catch(err => {
        setLoadingData(false);
        console.log(err);
      });
  }

  async function getNumberOfViews() {
    setLoadingData(true);
    const url =
      process.env.GET_NUMBER_OF_VIEWS +
      serviceProviderID +
      '?providerID=' +
      userID;
    await axios
      .get(url)
      .then(response => {
        setServiceViews(response.data.data.length);
        setLoadingData(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  async function getReviewList() {
    const url = process.env.GET_JOB_REVIEWS + serviceProviderID;
    await axios
      .get(url)
      .then(response => {
        if (response.data.status == 'Failed') {
          setNoReviews(true);
          setNumberOfReviews(0);
        } else {
          setReviewList(response.data);
          setNumberOfReviews(response.data.length);
          setNoReviews(false);
        }
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  async function checkIfSaved() {
    setLoadingData(true);
    const url =
      process.env.CHECK_SAVED + serviceProviderID + '?currentUserID=' + _id;

    await axios
      .get(url)
      .then(response => {
        if (response.data.status === 'Success') {
          setSaved(true);
          setLoadingData(false);
        } else {
          setSaved(false);
          setLoadingData(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function saveServiceProvider() {
    const url = process.env.SAVE_SERVICE;
    setLoadingData(true);
    await axios
      .post(url, {
        serviceProviderID,
        userID: _id,
      })
      .then(response => {
        console.log(response.data);
        checkIfSaved();
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function unsaveServiceProvider() {
    setLoadingData(true);
    const url =
      process.env.DELETE_SAVED_SERVICE +
      serviceProviderID +
      '?currentUserID=' +
      _id;
    console.log(url);
    await axios
      .delete(url)
      .then(response => {
        console.log(response.data);
        checkIfSaved();
      })
      .catch(err => {
        console.log(err);
      });
  }

  const starImgFilled = () => {
    return <AntDesign name="star" color="orange" size={20} />;
  };

  const starImgCorner = () => {
    return <AntDesign name="staro" color="orange" size={20} />;
  };

  const CustomRatingBar = () => {
    return (
      <View style={styles.customratingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              onPress={() => setDefaultRating(item)}
              activeOpacity={0.7}
              key={key}>
              {item <= defaultRating ? starImgFilled() : starImgCorner()}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const validateReview = () => {
    if (!review) {
      Alert.alert('Add something in review');
      setDisabled(false);
      setIsPosting(false);
    } else {
      setIsPosting(true);
      setDisabled(true);
      postReview();
    }
  };

  async function postReview() {
    const url = process.env.POST_REVIEW + serviceProviderID;
    await axios
      .post(url, {
        userID: _id,
        reviewMessage: review,
        rating: defaultRating,
      })
      .then(response => {
        Alert.alert(response.data.message);
        setIsPosting(false);
        setDisabled(false);
        getReviewList();
        getServiceProviderData();
        setReview('');
      })
      .catch(err => {
        console.log(err);
        setIsPosting(false);
        setDisabled(false);
      });
  }

  async function deleteReview({item}) {
    const url = process.env.DELETE_REVIEW + item._id + '?userID=' + _id;

    await axios
      .delete(url)
      .then(response => {
        Alert.alert(response.data.message);
        getReviewList();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function deleteService() {
    const url =
      process.env.DELETE_SERVICE_PROVIDER +
      serviceProviderID +
      '?userID=' +
      _id;
    Alert.alert(
      'Delete this service you offer?',
      "You'll forever lose your data",
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            setIsDeleting(true);
            await axios
              .delete(url)
              .then(response => {
                Alert.alert(response.data.message);
                setIsDeleting(false);
                navigation.navigate('HomeStack', {screen: 'Home'});
              })
              .catch(err => {
                console.log(err);
                setIsDeleting(false);
              });
          },
        },
      ],
    );
  }

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
          Loading
        </Text>
      </View>
    );
  }

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled={true}
        style={{
          backgroundColor: '#333333',
          height: width / 1.7,
          width: width,
          flex: 1,
        }}>
        <Image
          source={{
            uri: image1
              ? image1.toString()
              : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png',
          }}
          style={{
            width: width - 40,
            height: width / 1.7,
            marginRight: 10,
          }}
        />
        <Image
          source={{
            uri: image2
              ? image2.toString()
              : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png',
          }}
          style={{
            width: width - 40,
            height: width / 1.7,
            marginRight: 10,
          }}
        />

        <Image
          source={{
            uri: image3
              ? image3.toString()
              : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png',
          }}
          style={{
            width: width - 40,
            height: width / 1.7,
            marginRight: 10,
          }}
        />
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          addToProfileVisits({
            providerID: userID,
          });
          navigation.navigate('PublicProfile', {
            userID: userID,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            bio: bio,
            location: location,
            profilePicture: profilePicture,
          });
        }}
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        }}>
        <Image
          source={{
            uri: profilePicture
              ? profilePicture
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            marginRight: 20,
            borderWidth: 2,
            borderColor: '#ccf5ff',
          }}
        />

        <View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: 16,
                marginRight: 10,
              }}>
              {firstName} {lastName}
            </Text>
            <AntDesign name="star" size={15} color="orange" />
            <Text
              style={{
                color: 'orange',
                fontWeight: '700',
                fontSize: 16,
                marginLeft: 10,
              }}>
              {rating}
            </Text>
            <Text style={{color: 'gray', marginLeft: 10, fontWeight: '700'}}>
              ( {numberOfReviews} )
            </Text>
          </View>

          <Text style={{color: '#cc0066', fontWeight: '700', fontSize: 20}}>
            {Capitalize(serviceName)}
          </Text>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Entypo
              style={{marginRight: 10}}
              name="eye"
              size={15}
              color="#ffbf80"
            />
            <Text style={{color: '#ffbf80', fontWeight: '800', fontSize: 12}}>
              {serviceViews} view(s)
            </Text>
          </View>
        </View>

        {isFeatured === true && (
          <Foundation
            style={{position: 'absolute', right: 20, bottom: 10}}
            name="crown"
            size={20}
            color="orange"
          />
        )}
        {_id != route.params.userID && (
          <>
            {isSaved == true ? (
              <TouchableOpacity
                onPress={unsaveServiceProvider}
                style={{position: 'absolute', right: 20, top: 10}}>
                <AntDesign name="heart" size={20} color="#00ccff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={saveServiceProvider}
                style={{position: 'absolute', right: 20, top: 10}}>
                <AntDesign name="hearto" size={20} color="#00ccff" />
              </TouchableOpacity>
            )}
          </>
        )}
      </TouchableOpacity>

      <View style={{borderWidth: 0.2, borderColor: '#404040'}} />

      <View style={{padding: 20}}>
        <Text style={{color: '#b3b3b3', marginVertical: 40, fontSize: 18}}>
          {description}
        </Text>
      </View>

      <View
        style={{
          borderWidth: 0.2,
          borderColor: '#404040',
          width: '100%',
          alignSelf: 'center',
        }}
      />

      <View style={{padding: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Entypo
            style={styles.icons}
            name="location-pin"
            size={20}
            color="#cc0066"
          />
          <Text style={{color: 'white', fontWeight: '700'}}>
            <B>Location</B> : {location}
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <MaterialIcons
            style={styles.icons}
            name="payment"
            size={20}
            color="orange"
          />
          <Text style={{color: 'white', fontWeight: '700'}}>
            <B>Rate</B> : KSH. {rate}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
          style={{flexDirection: 'row'}}>
          <Feather style={styles.icons} name="phone" size={20} color="purple" />
          <Text style={{color: 'white', fontWeight: '700'}}>
            <B>Phone number</B> : {phoneNumber}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL(`mailto:${email}`)}
          style={{flexDirection: 'row'}}>
          <MaterialIcons
            style={styles.icons}
            name="email"
            size={20}
            color="#00ccff"
          />
          <Text style={{color: 'white', fontWeight: '700'}}>
            <B>Email</B> : {email}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderWidth: 0.2,
          borderColor: '#404040',
          width: '100%',
          alignSelf: 'center',
        }}
      />

      {noReviews == false && (
        <View>
          <Text
            style={{
              color: 'orange',
              marginTop: 40,
              fontSize: 20,
              fontWeight: '700',
              marginLeft: 20,
            }}>
            Reviews
          </Text>
        </View>
      )}

      <FlatList
        style={{flex: 1, marginTop: 20, marginLeft: 20}}
        horizontal={true}
        data={reviewList}
        renderItem={({item}) => (
          <View
            key={item._id}
            style={{
              backgroundColor: '#1a1a1a',
              width: width - 40,
              marginRight: 10,
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
              <Text style={{color: 'gray', fontWeight: '700', marginRight: 10}}>
                {item.whoReviewed.firstName} {item.whoReviewed.lastName}
              </Text>

              <AntDesign name="star" size={15} color="orange" />

              <Text style={{color: 'white', marginLeft: 10, fontWeight: '700'}}>
                {item.rating}
              </Text>
            </View>

            {_id === item.whoReviewed._id && (
              <TouchableOpacity
                style={{position: 'absolute', zIndex: 1, right: 10, top: 10}}
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
        )}
      />

      {_id != userID && (
        <View
          style={{
            backgroundColor: '#1a1a1a',
            paddingVertical: 20,
            marginVertical: 40,
          }}>
          <Text
            style={{
              color: 'orange',
              fontSize: 20,
              fontWeight: '700',
              marginLeft: 20,
            }}>
            Write your review
          </Text>

          <Text
            style={{
              color: 'white',
              fontWeight: '700',
              alignSelf: 'flex-end',
              marginVertical: 20,
              marginRight: 20,
            }}>
            {review.length}/90
          </Text>

          <TextInput
            placeholder="Your text here"
            placeholderTextColor="gray"
            multiline={false}
            maxLength={90}
            value={review}
            onChangeText={setReview}
            style={{
              marginBottom: 40,
              marginHorizontal: 10,
              backgroundColor: 'white',
              borderRadius: 10,
              color: 'black',
              paddingHorizontal: 20,
            }}
          />

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: 'orange',
                fontSize: 20,
                fontWeight: '700',
                marginLeft: 20,
                marginRight: 20,
              }}>
              Rate me
            </Text>

            <CustomRatingBar />

            <Text style={{color: 'white', fontWeight: '700', marginLeft: 20}}>
              {defaultRating + '/' + maxRating.length}
            </Text>
          </View>

          <TouchableOpacity
            disabled={disabled}
            onPress={validateReview}
            style={styles.button}>
            {posting ? (
              <ActivityIndicator size="small" color="white" animating />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      <View>
        {noData == false && (
          <View>
            <Text
              style={{
                color: 'orange',
                fontSize: 20,
                fontWeight: '700',
                marginLeft: 20,
                marginVertical: 20,
              }}>
              My other services
            </Text>
          </View>
        )}

        {jobsList.map(item => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PublicProfile', {
                userID: userID,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                bio: bio,
                location: location,
                profilePicture: profilePicture,
              });
            }}
            style={styles.jobTitleContainer}
            key={item._id}>
            <Text
              style={{
                fontWeight: '700',
                color: 'white',
              }}>
              {item.service.serviceName}
            </Text>

            <FontAwesome name="location-arrow" size={15} color="gray" />
          </TouchableOpacity>
        ))}
      </View>

      {_id === userID && (
        <View style={styles.payAndDeleteContainer}>
          {route.params.isFeatured == false && (
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                navigation.navigate('ServicePromotionPayment', {
                  userID: _id,
                  jobID: jobId,
                })
              }>
              <Text style={styles.payBtnText}>Promote this service</Text>
            </TouchableOpacity>
          )}

          {/* <TouchableOpacity
            onPress={() => navigation.navigate('EditService')}
            style={{
              backgroundColor: '#0099cc',
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              marginTop: 20,
              marginHorizontal: 20,
              borderRadius: 10,
            }}>
            <Text style={{color: 'white', fontWeight: '700'}}>Edit</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={deleteService}
            style={{
              backgroundColor: '#ff6600',
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              marginBottom: 100,
              marginTop: 20,
              marginHorizontal: 20,
              borderRadius: 10,
            }}>
            <Text style={{color: 'white', fontWeight: '700'}}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  icons: {
    marginRight: 10,
  },
  jobTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  button: {
    height: 50,
    backgroundColor: '#990033',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
  customratingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  starImgStyle: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  payAndDeleteContainer: {
    marginTop: 40,
  },
  btn: {
    backgroundColor: '#0066cc',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  payBtnText: {
    color: 'white',
    fontWeight: '800',
  },
});
