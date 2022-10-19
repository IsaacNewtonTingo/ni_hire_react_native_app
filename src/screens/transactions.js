import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';

import dateFormat from 'dateformat';

import {CredentialsContext} from '../components/credentials-context';

import axios from 'axios';

import {FlatList} from 'react-native-gesture-handler';

// import files from '../assets/filesToShare/filesBase64';

const A = props => <Text style={{fontWeight: '800'}}>{props.children}</Text>;
export default function Transactions({navigation}) {
  const [premiumRecords, setPremiumRecords] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [noData, setNoData] = useState(true);

  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);
  const {_id} = storedCredentials;

  useEffect(() => {
    // getUserData();
    getMyPremiumRecords();
  }, [(navigation, loading)]);

  navigation.addListener('focus', () => setLoading(!loading));

  //   const getUserData = async () => {
  //     setLoadingData(true);
  //     const url = process.env.GET_USER_DATA + _id;

  //     await axios
  //       .get(url)
  //       .then(response => {
  //         userData = response.data.data;

  //         setFirstName(userData.firstName);
  //         setLastName(userData.lastName);
  //         setProfilePicture(userData.profilePicture);

  //         setLoadingData(false);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         setLoadingData(false);
  //       });
  //   };

  async function getMyPremiumRecords() {
    const url = process.env.GET_MY_PREMIUM_RECORDS + _id;
    await axios
      .get(url)
      .then(response => {
        if (response.data.status == 'Failed') {
          setLoadingData(false);
        } else {
          setPremiumRecords(response.data);
          setLoadingData(false);
        }
        setNoData(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
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
    <View style={styles.container}>
      {noData == true ? (
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
            No data found
          </Text>
        </View>
      ) : (
        <FlatList
          data={premiumRecords}
          renderItem={({item}) => (
            <View key={item._id} style={styles.itemContainer}>
              <Text style={styles.dateText}>
                {dateFormat(item.datePromoted, 'fullDate')}
              </Text>

              <Text style={styles.contentText}>
                You paid for 7 day premium services that expired/expires on{' '}
                <A> {dateFormat(item.dateExpiring, 'fullDate')}</A>{' '}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  premText: {
    color: '#99c2ff',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#333333',
    marginBottom: 10,
    padding: 20,
  },
  dateText: {
    color: '#99c2ff',
    fontWeight: '800',
    fontSize: 16,
  },
  contentText: {
    marginTop: 20,
    color: '#cccccc',
  },
});
