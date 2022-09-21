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

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import axios from 'axios';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [disabled, setDisabled] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const empty = () => {
    setEmail('');
    setPassword('');
  };

  const validate = () => {
    if (!email || !password) {
      Alert.alert('All fields are required');
    } else {
      handleLogin();
      setIsPosting(true);
      setDisabled(true);
    }
  };

  async function handleLogin() {
    await axios
      .post('https://7820-41-80-98-150.ap.ngrok.io/user/signin', {
        email,
        password,
      })
      .then(response => {
        console.log(response.data);
        if (response.data.status == 'Success') {
          navigation.navigate('TabNavigator');
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
      });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 20,
          marginTop: 40,
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
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 10,
    flex: 1,
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
