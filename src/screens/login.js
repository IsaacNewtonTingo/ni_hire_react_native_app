import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
  Dimensions,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {CredentialsContext} from '../components/credentials-context';

const {width} = Dimensions.get('window');

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [disabled, setDisabled] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);

  const empty = () => {
    setEmail('');
    setPassword('');
  };

  const B = props => (
    <Text
      style={{
        color: '#33cccc',
        fontWeight: '900',
      }}>
      {props.children}
    </Text>
  );

  const validate = () => {
    if (!email || !password) {
      Alert.alert('All fields are required');
    } else {
      handleLogin();
      setIsPosting(true);
      setDisabled(true);
    }
  };

  const persistLogin = async values => {
    await AsyncStorage.setItem('loginCredentials', JSON.stringify(values))
      .then(() => {
        setStoredCredentials(values);
      })
      .catch(err => {
        console.log(err);
      });
  };

  async function handleLogin() {
    await axios
      .post(process.env.SIGNIN, {
        email,
        password,
      })
      .then(response => {
        const result = response.data;
        const {message, status, data} = result;

        if (response.data.status == 'Success') {
          persistLogin({...data[0]}, message, status);
          setIsPosting(false);
        } else {
          setIsPosting(false);
          Alert.alert(response.data.message);
        }
        setIsPosting(false);
        setDisabled(false);
      })
      .catch(err => {
        console.log(err);
        setIsPosting(false);
        setDisabled(false);
      });
  }

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <View>
        <Image
          style={styles.welcomeIMG}
          source={require('../assets/images/joint.png')}
        />

        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 20,
            marginTop: 20,
          }}>
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
              autoCapitalize="none"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            disabled={disabled}
            onPress={validate}
            style={styles.addButton}>
            {isPosting ? (
              <ActivityIndicator color="white" size="small" animating />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 16,
                color: '#e62e00',
                marginTop: 20,
              }}>
              Don't have an account? Signup
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 16,
                color: '#6699ff',
                marginTop: 20,
              }}>
              Forgot password? Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 10,
  },
  welcomeIMG: {
    width: width / 2,
    height: width / 2,
    alignSelf: 'center',
  },
  loginText: {
    color: 'black',
    fontWeight: '800',
    fontSize: 20,
    marginLeft: 20,
  },
  companyTextStyles: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'PaytoneOne-Regular',
    textShadowColor: '#993333',
    textShadowOffset: {
      height: 1,
      width: 2,
    },
    textShadowRadius: 10,
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
    borderRadius: 10,
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
