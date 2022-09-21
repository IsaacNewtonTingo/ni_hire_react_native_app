import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function LocationBasedServices({route, navigation}) {
  const [noData, setNoData] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(true);

  const jobId = route.params.jobId;
  const newLocation = route.params.newLocation;

  useEffect(() => {
    searchArea();
  }, []);

  function searchArea() {
    try {
      const subscriber = firestore()
        .collection('Services')
        .doc(jobId)
        .collection('JobUsers')
        .where('location', '==', newLocation)
        .orderBy('rating', 'desc')
        .onSnapshot(querySnapshot => {
          const users = [];
          if (querySnapshot.size <= 0) {
            setNoData(true);
          } else {
            setNoData(false);
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setLoading(false);
            setUsersList(users);
            setLoading(false);
          }
        });
      return () => subscriber();
    } catch (error) {
      console.log(error);
    }
  }
  async function handleClicked({userId}) {
    const currentUser = auth().currentUser;

    await firestore()
      .collection('Services')
      .doc(jobId)
      .collection('JobUsers')
      .doc(userId)
      .collection('ViewdBy')
      .doc(currentUser.uid)
      .set({
        viewedByUserID: currentUser.uid,
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
        <FlatList
          data={usersList}
          renderItem={({item}) => (
            <>
              <TouchableOpacity
                onPress={() => {
                  handleClicked({userId: item.key});
                  navigation.navigate('ServiceProviderProfile', {
                    userId: item.key,
                    jobId: jobId,
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
                      {item.rating}
                    </Text>

                    {/* <Text style={{color: 'gray', marginLeft: 10}}>( 200)</Text> */}
                  </View>

                  <Text
                    style={{color: '#cc0066', fontWeight: '700', fontSize: 12}}>
                    {item.jobTitle}
                  </Text>

                  <Text
                    style={{
                      color: '#a6a6a6',
                      fontSize: 10,
                    }}>
                    {item.description}
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
});
