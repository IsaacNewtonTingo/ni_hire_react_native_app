import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [disabled, setDisabled] = useState(false);

  async function requestReset() {
    if (!email) {
      Alert.alert('Please input email');
    } else {
      setSubmitting(true);
      setDisabled(true);
      const url = process.env.REQUEST_PASSWORD_RESET;

      await axios
        .post(url, {email})
        .then(response => {
          setSubmitting(false);
          setDisabled(false);

          if (response.data.status == 'Pending') {
            Alert.alert('Reset password email sent');

            navigation.navigate('NewPassword', {
              userID: response.data.message,
            });
            setDisabled(false);
          } else {
            Alert.alert(response.data.message);
            setDisabled(false);
          }
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
          setDisabled(false);
        });
    }
  }
  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <Image
        style={styles.displayIMG}
        source={require('../assets/images/mail.png')}
      />

      <View style={styles.emailContainer}>
        <Text style={styles.text}>Enter your email to reset password</Text>

        <View>
          <MaterialIcons
            style={styles.icons}
            name="email"
            size={20}
            color="black"
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="e.g doe@gmail.com"
            keyboardType="email-address"
            style={styles.textInput}
          />
        </View>

        <TouchableOpacity
          disabled={disabled}
          onPress={requestReset}
          style={styles.BTN}>
          {submitting == true ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.BTNText}>Submit</Text>
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
  },
  displayIMG: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  emailContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignSelf: 'center',
    marginTop: 20,
    flex: 1,
  },
  text: {
    fontWeight: '800',
    color: 'black',
  },
  textInput: {
    height: 50,
    borderRadius: 10,
    width: '100%',
    borderWidth: 1,
    marginVertical: 20,
    paddingHorizontal: 40,
  },
  BTN: {
    height: 50,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#660033',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BTNText: {
    color: 'white',
    fontWeight: '700',
  },
  icons: {
    position: 'absolute',
    top: 35,
    zIndex: 1,
    left: 15,
  },
});
