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
import React, {useState, useEffect} from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default function JobMembers({navigation}) {
  const [noData, setNoData] = useState(false);
  const [savedList, setSavedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingD, setLoadingD] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');

  navigation.addListener('focus', () => setLoadingD(!loadingD));

  function getCurrentUser() {
    const currentUserId = auth().currentUser.uid;
    setCurrentUserId(currentUserId);
  }

  useEffect(() => {
    getCurrentUser();
    getSavedJobs();
  }, [(navigation, loadingD)]);

  async function addToJobViewedBy({jobID, jobUserID}) {
    await firestore()
      .collection('Services')
      .doc(jobID)
      .update({
        recentViews: firestore.FieldValue.arrayUnion(currentUserId),
      })
      .catch(error => {
        console.log(error);
      });

    await firestore()
      .collection('Services')
      .doc(jobID)
      .collection('JobUsers')
      .doc(jobUserID)
      .update({
        jobViewedBy: firestore.FieldValue.arrayUnion(currentUserId),
      })
      .catch(error => {
        console.log(error);
      });
  }

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getSavedJobs() {
    setLoading(true);
    setNoData(true);
    const subscriber = firestore()
      .collectionGroup('JobUsers')
      .where('savedBy', 'array-contains', currentUserId)
      .get()
      .then(querySnapshot => {
        const users = [];

        if (querySnapshot.size <= 0) {
          setNoData(true);
          setLoading(false);
        } else {
          querySnapshot.forEach(documentSnapshot => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.data().uniqueID,
            });
          });
          setSavedList(users);
          setLoading(false);
          setNoData(false);
        }
      });
    return () => subscriber();
  }

  async function Unsave({jobUserID, jobID}) {
    await firestore()
      .collection('Services')
      .doc(jobID)
      .collection('JobUsers')
      .doc(jobUserID)
      .update({
        savedBy: firestore.FieldValue.arrayRemove(currentUserId),
      })
      .then(() => {
        getSavedJobs();
      })
      .catch(error => {
        console.log(error);
      });
  }

  if (loading) {
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
                    addToJobViewedBy({
                      jobID: item.jobTitle,
                      jobUserID: item.jobUserID,
                    });
                    navigation.navigate('ServiceProviderProfile', {
                      userId: item.jobUserID,
                      jobId: item.jobTitle,
                    });
                  }}
                  key={item.id}
                  style={styles.card}>
                  <View
                    style={{
                      backgroundColor: '#333333',
                      height: '100%',
                      width: 120 * 1.2,
                    }}>
                    <Image
                      source={{
                        uri: 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png',
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
                        {item.name}
                      </Text>

                      <AntDesign name="star" size={15} color="orange" />

                      <Text
                        style={{
                          marginLeft: 10,
                          color: 'orange',
                          fontWeight: '700',
                        }}>
                        {item.rating.toFixed(1)}
                      </Text>

                      <AntDesign
                        onPress={() =>
                          Unsave({
                            jobID: item.jobTitle,
                            jobUserID: item.jobUserID,
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
                      {Capitalize(item.jobTitle)}
                    </Text>

                    <Text
                      style={{
                        color: '#a6a6a6',
                        fontSize: 10,
                      }}>
                      {item.description.slice(0, 85) + '...'}
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
                        {item.location}
                      </Text>

                      <Text
                        style={{
                          color: '#cccccc',
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
