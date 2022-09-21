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

import React, {useEffect, useState} from 'react';
import axios from 'axios';

const {width} = Dimensions.get('window');

const B = props => <Text style={{color: 'gray'}}>{props.children}</Text>;

export default function ServiceProviderProfile({route, navigation}) {
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState('');
  const [rating, setRating] = useState('');
  const [totalRating, setTotalRating] = useState(0);
  const [location, setLocation] = useState('');
  const [jobUniqueID, setJobUniqueID] = useState('');
  const [jobViewedBy, setJobViewedBy] = useState();
  const [jobImage, setJobImage] = useState('');
  const [isPromoted, setIsPromoted] = useState();

  const [jobsList, setJobsList] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  const [noReviews, setNoReviews] = useState(false);
  const [noData, setNoData] = useState(false);

  const [loading, setLoading] = useState(true);
  const [newLoading, setNewLoading] = useState(true);
  const [reLoading, setReLoading] = useState(false);
  const [posting, setIsPosting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isSaved, setSaved] = useState(false);

  const [review, setReview] = useState('');
  const [defaultRating, setDefaultRating] = useState(1);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const [currentUserID, setCurrentUserID] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');

  const [disabled, setDisabled] = useState(false);

  const serviceProviderID = route.params.serviceProviderID;
  const userID = route.params.userID;

  navigation.addListener('focus', () => setNewLoading(!newLoading));

  useEffect(() => {
    // getUserData();
    getOtherServices();
    getCurrentUser();
    getReviewList();
  }, [(newLoading, navigation)]);

  // async function getUserData() {
  //   setLoading(true);
  //   await axios
  //     .get()
  //     .then(response => {
  //       console.log(response.data)
  //       setLoading(false)
  //     })
  //     .catch((err)=>{
  //       console.log(err)
  //       setLoading(false)
  //     })
  // }

  async function getOtherServices() {
    const url = process.env.GET_MY_OTHER_SERVICES + userID;

    await axios
      .get(url)
      .then(response => {
        setJobsList(response.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }

  async function getReviewList() {}

  const starImgFilled =
    'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
  const starImgCorner =
    'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

  // const CustomRatingBar = () => {
  //   return (
  //     <View style={styles.customratingBarStyle}>
  //       {maxRating.map((item, key) => {
  //         return (
  //           <TouchableOpacity
  //             onPress={() => setDefaultRating(item)}
  //             activeOpacity={0.7}
  //             key={item._id}>
  //             <Image
  //               style={styles.starImgStyle}
  //               source={
  //                 item <= defaultRating
  //                   ? {uri: starImgFilled}
  //                   : {uri: starImgCorner}
  //               }
  //             />
  //           </TouchableOpacity>
  //         );
  //       })}
  //     </View>
  //   );
  // };

  const getCurrentUser = async () => {};

  const validate = () => {
    if (!review) {
      Alert.alert('Add something in review');
      setDisabled(false);
      setIsPosting(false);
    } else {
      setIsPosting(true);
      setDisabled(true);
      sendToDB();
    }
  };

  async function sendToDB() {}

  function deleteReview({item}) {}

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function save() {}

  async function Unsave() {}

  async function deletePost() {
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
          onPress: async () => {},
        },
      ],
    );
  }

  // if (noData == true) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         backgroundColor: 'black',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}>
  //       <Text style={{color: 'white', fontWeight: '700', marginTop: 10}}>
  //         Data might have been deleted
  //       </Text>
  //     </View>
  //   );
  // }

  // if (loading == true) {
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
      <View
        style={{
          backgroundColor: '#333333',
          height: width / 1.7,
          width: width,
        }}>
        <Image
          source={{
            uri: route.params.image1
              ? route.params.image1
              : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png',
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          // navigation.navigate('PublicProfile', {
          //   userID: userId,
          //   userName: name,
          // })
        }}
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: route.params.profilePicture
              ? route.params.profilePicture
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
              {route.params.firstName} {route.params.lastName}
            </Text>
            <AntDesign name="star" size={15} color="orange" />
            <Text
              style={{
                color: 'orange',
                fontWeight: '700',
                fontSize: 16,
                marginLeft: 10,
              }}>
              {route.params.rating}
            </Text>
            {/* <Text style={{color: 'gray', marginLeft: 10, fontWeight: '700'}}>
              ( {totalRating} )
            </Text> */}
          </View>

          <Text style={{color: '#cc0066', fontWeight: '700', fontSize: 20}}>
            {Capitalize(route.params.serviceName)}
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
            {/* <Text style={{color: '#ffbf80', fontWeight: '800', fontSize: 12}}>
              {jobViewedBy ? jobViewedBy.length : 0} view(s)
            </Text> */}
          </View>
        </View>

        {isPromoted == true && (
          <Text
            style={{
              color: '#ff8c1a',
              fontWeight: '800',
              position: 'absolute',
              right: 20,
              bottom: 10,
              fontSize: 12,
            }}>
            Promoted
          </Text>
        )}

        {/* {isSaved == true ? (
          <AntDesign
            onPress={Unsave}
            style={{position: 'absolute', right: 20, top: 10}}
            name="heart"
            size={20}
            color="#00ccff"
          />
        ) : (
          <AntDesign
            onPress={save}
            style={{position: 'absolute', right: 20, top: 10}}
            name="hearto"
            size={20}
            color="#00ccff"
          />
        )} */}
      </TouchableOpacity>

      <View style={{borderWidth: 0.2, borderColor: '#404040'}} />

      <View style={{padding: 20}}>
        <Text style={{color: '#b3b3b3', marginVertical: 40, fontSize: 18}}>
          {route.params.description}
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
            <B>Location</B> : {route.params.location}
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
            <B>Rate</B> : KSH. {route.params.rate}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => Linking.openURL(`tel:${route.params.phoneNumber}`)}
          style={{flexDirection: 'row'}}>
          <Feather style={styles.icons} name="phone" size={20} color="purple" />
          <Text style={{color: 'white', fontWeight: '700'}}>
            <B>Phone number</B> : {route.params.phoneNumber}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL(`mailto:${route.params.email}`)}
          style={{flexDirection: 'row'}}>
          <MaterialIcons
            style={styles.icons}
            name="email"
            size={20}
            color="#00ccff"
          />
          <Text style={{color: 'white', fontWeight: '700'}}>
            <B>Email</B> : {route.params.email}
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

      {/* {noReviews == false && (
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
            key={item.key}
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
                {item.whoRated}
              </Text>

              <AntDesign name="star" size={15} color="orange" />

              <Text style={{color: 'white', marginLeft: 10, fontWeight: '700'}}>
                {item.myStars}
              </Text>
            </View>

            {currentUserID === item.whoRatedID && (
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
              {item.comment}
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

      {currentUserID != userId && (
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
            multiline={true}
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
            onPress={validate}
            style={styles.button}>
            {posting ? (
              <ActivityIndicator size="small" color="gray" animating />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      )} */}

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
          <>
            <TouchableOpacity style={styles.jobTitleContainer} key={item._id}>
              <Text
                style={{
                  fontWeight: '700',
                  color: 'white',
                }}>
                {item.service.serviceName}
              </Text>

              <FontAwesome name="location-arrow" size={15} color="gray" />
            </TouchableOpacity>

            {/* <View
              style={{
                borderWidth: 0.2,
                borderColor: '#262626',
                marginVertical: 5,
              }}
            /> */}
          </>
        ))}
      </View>

      {/* {currentUserID == userId && (
        <View style={styles.payAndDeleteContainer}>
          {isPromoted == false && (
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                navigation.navigate('ServicePromotionPayment', {
                  userID: currentUserID,
                  jobID: jobId,
                })
              }>
              <Text style={styles.payBtnText}>Promote this service</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={deletePost}
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
      )} */}
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
