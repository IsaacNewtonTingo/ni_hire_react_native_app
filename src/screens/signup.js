import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';

function Signup({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPosting, setIsPosting] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const validate = () => {
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !phoneNumber
    ) {
      Alert.alert('All field are required');
    } else if (password != confirmPassword) {
      Alert.alert("Passwords don't match");
    } else if (password.length < 8) {
      Alert.alert('Password is too short');
    } else if (phoneNumber.length != 10) {
      Alert.alert(
        'Invalid phone number',
        "Make sure it's in the format, '0766789867'",
      );
    } else if (!phoneNumber.startsWith(0)) {
      Alert.alert(
        'Invalid phone number',
        "Make sure it's in the format, '0766789867'",
      );
    } else {
      setIsPosting(true);
      setDisabled(true);
      handleSignUp();
    }
  };

  const empty = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
  };

  const handleSignUp = async () => {
    const url = process.env.SERVER_BASE_URL + '/user/signup';
    await axios
      .post('https://7820-41-80-98-150.ap.ngrok.io/user/signup', {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber.replace(0, 254),
        email: email,
        password: password,
      })
      .then(response => {
        console.log(response.data);
        if (response.data.status == 'Pending') {
          // navigation.navigate('EmailVerificationScreen');
          Alert.alert(
            response.data.message,
            'Check your email then come back and login',
          );
          empty();
        } else {
          Alert.alert(response.data.message);
        }

        setIsPosting(false);
        setDisabled(false);
      })
      .catch(err => {
        console.log(err);
        setIsPosting(false);
        setDisabled(false);
        empty();
      });
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={{backgroundColor: 'black', flex: 1}}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 20,
          marginTop: 20,
          width: '90%',
          flex: 1,
          alignSelf: 'center',
          marginBottom: 40,
        }}>
        <View>
          <Ionicons
            style={styles.icons}
            name="md-person-outline"
            size={20}
            color="black"
          />
          <TextInput
            maxLength={14}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
            style={styles.input}
            placeholderTextColor="gray"
          />
        </View>

        <View>
          <Ionicons
            style={styles.icons}
            name="md-person"
            size={20}
            color="black"
          />
          <TextInput
            maxLength={14}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name"
            style={styles.input}
            placeholderTextColor="gray"
          />
        </View>

        <View>
          <Feather style={styles.icons} name="phone" size={20} color="black" />
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone number"
            style={styles.input}
            placeholderTextColor="gray"
            keyboardType="phone-pad"
          />
        </View>

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
            placeholder="Email"
            style={styles.input}
            placeholderTextColor="gray"
            keyboardType="email-address"
          />
        </View>

        <View>
          <Feather style={styles.icons} name="lock" size={20} color="black" />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            style={styles.input}
            placeholderTextColor="gray"
            secureTextEntry={true}
          />
        </View>

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
            placeholder="Confirm password"
            style={styles.input}
            placeholderTextColor="gray"
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          disabled={disabled}
          onPress={validate}
          style={styles.addButton}>
          {isPosting ? (
            <ActivityIndicator color="white" size="small" animating />
          ) : (
            <Text style={styles.buttonText}>Create account</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 16,
              color: '#e62e00',
              marginTop: 20,
            }}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 10,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 60,
    marginBottom: 10,
    zIndex: 0,
    color: 'black',
  },
  addButton: {
    height: 50,
    backgroundColor: '#660033',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    alignSelf: 'center',
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
  icons: {
    position: 'absolute',
    top: 13,
    zIndex: 1,
    left: 20,
  },
  dropDown: {
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
});
