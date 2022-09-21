import React, {useState, useEffect, useRef} from 'react';
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
} from 'react-native';

const {width} = Dimensions.get('window');

import LinearGradient from 'react-native-linear-gradient';
import dateFormat from 'dateformat';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Profile({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');

  const [jobsList, setJobsList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [viewList, setViewList] = useState();

  const [noReviews, setNoReviews] = useState(false);
  const [noData, setNoData] = useState(false);

  const [noJobsData, setNoJobsData] = useState(false);

  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(true);

  const currentUserID = auth().currentUser.uid;
  navigation.addListener('focus', () => setLoading(!loading));

  const scrollSwitching = useRef();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getUserData();
    getJobs();
    getProfileVisits();
    getReviews();
  }, [(navigation, loading)]);

  async function getUserData() {
    const subscriber = firestore()
      .collection('Users')
      .doc(currentUserID)
      .onSnapshot(onResult, onError);

    return () => subscriber();
  }

  function onResult(QuerySnapshot) {
    const docData = QuerySnapshot.data();
    try {
      if (docData) {
        setName(docData.name);
        setEmail(docData.email);
        setPhoneNumber(docData.phoneNumber);
        setLocation(docData.location);
        setBio(docData.bio);
        setImage(docData.profilePicture);
      } else {
        setLocation('');
        setBio('');

        setLoadingData(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingData(false);
    }

    return docData;
  }

  function onError(error) {
    console.log(error);
  }

  function getJobs() {
    const subscriber = firestore()
      .collectionGroup('JobUsers')
      .where('jobUserID', '==', currentUserID)
      .get()
      .then(querySnapshot => {
        const jobs = [];
        if (querySnapshot.size <= 0) {
          setNoJobsData(true);
        } else {
          setNoJobsData(false);
          querySnapshot.forEach(documentSnapshot => {
            jobs.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.data().uniqueID,
            });
          });
          setLoading(false);
          setJobsList(jobs);
        }
      });
    return () => subscriber();
  }

  async function getReviews() {
    await firestore()
      .collectionGroup('Reviews')
      .where('jobUserID', '==', currentUserID)
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get()
      .then(querySnapshot => {
        const reviews = [];
        if (querySnapshot.size <= 0) {
          setNoReviews(true);
        } else {
          setNoReviews(false);
          querySnapshot.forEach(documentSnapshot => {
            reviews.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.key,
            });
          });
          setLoading(false);
          setReviewList(reviews);
        }
      });
  }

  async function addToJobViewedBy({jobID, userID}) {
    await firestore()
      .collection('Services')
      .doc(jobID)
      .update({
        recentViews: firestore.FieldValue.arrayUnion(currentUserID),
      })
      .catch(error => {
        console.log(error);
      });

    await firestore()
      .collection('Services')
      .doc(jobID)
      .collection('JobUsers')
      .doc(userID)
      .update({
        jobViewedBy: firestore.FieldValue.arrayUnion(currentUserID),
      })
      .catch(error => {
        console.log(error);
      });
  }

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getProfileVisits() {
    const subscriber = firestore()
      .collection('Users')
      .doc(currentUserID)
      .collection('ViewedBy')
      .onSnapshot(querySnapshot => {
        const viewList = [];

        querySnapshot.forEach(documentSnapshot => {
          viewList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setLoading(false);
        setViewList(viewList.length);
      });
    return () => subscriber();
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
        <Image
          style={{width: 120, height: 120, borderRadius: 60}}
          source={{
            uri: image
              ? image
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          }}
        />
      </ImageBackground>

      <View style={styles.detailsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={{
            position: 'absolute',
            right: 20,
            top: 10,
          }}>
          <Text
            style={{
              color: '#00ffff',
              fontWeight: '800',
              fontSize: 18,
            }}>
            Edit
          </Text>
        </TouchableOpacity>

        <View>
          <Fontisto
            style={[styles.icons, {left: 1}]}
            name="person"
            size={20}
            color="#ff4d4d"
          />
          <Text style={[styles.text, {marginTop: 0}]}>{name}</Text>
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
            {viewList} unique profile visit(s)
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
                    addToJobViewedBy({
                      jobID: item.jobTitle,
                      userID: item.jobUserID,
                    });

                    navigation.navigate('ServiceProviderProfile', {
                      userId: currentUserID,
                      jobId: item.jobTitle,
                    });
                  }}
                  style={styles.jobContainer}
                  key={item.uniqueID}>
                  <Image
                    source={{
                      uri: item.jobImage
                        ? item.jobImage
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
                        {item.jobTitle.length <= 20
                          ? Capitalize(item.jobTitle)
                          : Capitalize(item.jobTitle.slice(0, 20) + '...')}
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

                      <View
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
                      </View>
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
                      key={item.key}
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
                          {item.whoRated}
                        </Text>

                        <AntDesign name="star" size={15} color="orange" />

                        <Text
                          style={{
                            color: 'white',
                            marginLeft: 10,
                            fontWeight: '700',
                          }}>
                          {item.myStars}
                        </Text>
                      </View>

                      {currentUserID === item.whoRatedID && (
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
    elevation: 50,
    shadowColor: 'white',
    shadowOffset: {
      height: 10,
      width: 25,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderColor: 'white',
    width: '90%',
    height: 260,
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
