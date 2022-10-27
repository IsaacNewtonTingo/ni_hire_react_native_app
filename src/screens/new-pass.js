import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NewPassword({route, navigation}) {
  const [resetString, setResetString] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const userID = route.params.userID;

  async function resetPassword() {
    if (!resetString) {
      Alert.alert('Error', 'Please enter secret code');
    } else if (!password) {
      Alert.alert('Error', 'Please enter password');
    } else if (password.length < 8) {
      Alert.alert(
        'Error',
        'Password is too short. Should be over 8 characters.',
      );
    } else if (confirmPassword.length < 8) {
      Alert.alert(
        'Error',
        'Password is too short. Should be over 8 characters.',
      );
    } else if (password != confirmPassword) {
      Alert.alert('Error', "Passwords don't match");
    } else {
      setSubmitting(true);
      setDisabled(true);
      const url = process.env.RESET_PASSWORD;

      await axios
        .post(url, {
          userId: userID,
          newPassword: password,
          resetString: resetString,
        })
        .then(response => {
          setSubmitting(false);
          setDisabled(false);

          if (response.data.status == 'Success') {
            Alert.alert('Success', `${response.data.message}.Please login.`);
            navigation.navigate('Login');
          } else {
            Alert.alert(response.data.message);
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
        source={require('../assets/images/lock.png')}
      />

      <View style={styles.emailContainer}>
        <Text style={styles.text}>Secret code (sent to your email)</Text>

        <View>
          <MaterialCommunityIcons
            style={styles.icons}
            name="code-string"
            size={23}
            color="black"
          />

          <TextInput
            value={resetString}
            onChangeText={setResetString}
            placeholder="e.g 4890"
            style={styles.textInput}
          />
        </View>

        <Text style={styles.text}>New password</Text>

        <View>
          <Feather style={styles.icons} name="lock" size={20} color="black" />

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="********"
            secureTextEntry={true}
            style={styles.textInput}
          />
        </View>

        <Text style={styles.text}>Confirm password</Text>

        <View>
          <Fontisto
            style={styles.icons}
            name="locked"
            size={20}
            color="black"
          />
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="********"
            secureTextEntry={true}
            style={styles.textInput}
          />
        </View>

        <TouchableOpacity
          disabled={disabled}
          onPress={resetPassword}
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
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  emailContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignSelf: 'center',
    marginTop: 20,
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
