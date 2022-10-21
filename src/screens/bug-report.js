import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useState, useContext} from 'react';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {CredentialsContext} from '../components/credentials-context';
import axios from 'axios';

export default function BugReport({url, children}) {
  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);
  const {_id} = storedCredentials;

  const [isPosting, setIsPosting] = useState(false);

  const [message, setMessage] = useState('');

  async function reportBug() {
    const url = process.env.REPORT_BUG + _id;
    if (!message) {
      Alert.alert('Please write something');
    } else {
      setIsPosting(true);
      await axios
        .post(url, {
          message,
        })
        .then(response => {
          setIsPosting(false);

          Alert.alert(response.data.status, response.data.message);
          setMessage('');
        })
        .catch(err => {
          console.log(err);
          setIsPosting(false);
        });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.centerView}>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            marginHorizontal: 20,
            marginBottom: 20,
          }}>
          Experiencing any errors in our application? Please indicate the issue
          in detail and we will try our best to fix it.
        </Text>
        <TextInput
          style={styles.messageInput}
          placeholder="Write something here"
          value={message}
          placeholderTextColor="gray"
          onChangeText={setMessage}
          multiline={true}
        />

        <TouchableOpacity
          onPress={reportBug}
          style={[
            styles.buttonMain,
            {backgroundColor: '#660033', width: '80%'},
          ]}>
          {isPosting ? (
            <ActivityIndicator color="white" size="small" animating />
          ) : (
            <Text style={styles.buttonText}>Finish</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerView: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    width: '90%',
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
    height: 300,
  },
  messageInput: {
    height: 70,
    width: '80%',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderWidth: 1,
    marginBottom: 20,
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
});
