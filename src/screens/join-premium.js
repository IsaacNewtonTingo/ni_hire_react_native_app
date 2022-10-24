import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {CredentialsContext} from '../components/credentials-context';
import axios from 'axios';

export default function JoinPremium({navigation}) {
  const benefits = [
    'All services you offer will appear at the top of search results.',
    'Your profile will appear among featured service providers at home page.',
    'Services you offer will appear at the “Top dawgs” section at the home page.',
    'You can see the people who visited your profile.',
    'You can see the people who viewed a service you offer.',
  ];

  const [payModal, setPayModal] = useState(false);

  const [isPaying, setIsPaying] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  let [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPremium, setIsPremium] = useState(false);

  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);
  const {_id} = storedCredentials;

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const url = process.env.GET_USER_DATA + _id;
    await axios
      .get(url)
      .then(response => {
        const userData = response.data.data;
        setPhoneNumber(userData.phoneNumber.toString());
        setIsPremium(userData.isFeatured);
        setIsLoadingData(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoadingData(false);
      });
  }

  async function joinPremium() {
    const url = process.env.JOIN_PREMIUM + _id;
    setIsPaying(true);
    phoneNumber = parseInt(phoneNumber);
    console.log(phoneNumber);

    if (!password) {
      setIsPaying(false);
      Alert.alert('Please enter password');
    } else {
      await axios
        .post(url, {
          phoneNumber,
          password,
        })
        .then(response => {
          console.log(response.data);
          if (response.data.status == 'Failed') {
            Alert.alert('Failed', response.data.message);
            setIsPaying(false);
            setPassword('');
          } else if (response.data.CustomerMessage) {
            setIsPaying(false);
            Alert.alert(
              'Success',
              response.data.CustomerMessage + '. Wait for M-PESA prompt',
            );
            setPassword('');
          } else if (response.data.errorMessage) {
            setIsPaying(false);
            Alert.alert('Failed', response.data.errorMessage);
            setPassword('');
          } else {
            setIsPaying(false);
            console.log(response.data);
            setPassword('');
          }
        })
        .catch(err => {
          console.log(err);
          setIsPaying(false);
        });
    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <View style={styles.priceContainer}>
        <Text style={styles.sub}>7 Day plan</Text>
        <Text style={styles.cashText}>KSH. 350</Text>
        <Text style={styles.sub}>Renewed after 7 days</Text>
      </View>

      <Text style={styles.premText}>Premium benefits</Text>

      <View>
        {benefits.map((item, index) => (
          <Text style={styles.benefitsText} key={item}>
            {index + 1}: {item}
          </Text>
        ))}
      </View>

      <Text style={styles.premText}>How to pay</Text>

      <Text style={styles.howToText}>
        Make sure the number that appears on your profile is your M-Pesa number
        as you will use that for payment.
      </Text>

      {isPremium == true ? (
        <TouchableOpacity disabled={true} style={styles.premiumBTN}>
          <Text style={styles.premiumBTNText}>You're a premium user</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setPayModal(true)}
          style={styles.joinBTN}>
          <Text style={styles.joinBTNText}>Join now</Text>
        </TouchableOpacity>
      )}

      <Modal animationType="slide" transparent={true} visible={payModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text}>Phone number</Text>

            <TextInput
              style={styles.inputPass}
              placeholder="e.g 0725556676"
              value={phoneNumber}
              placeholderTextColor="gray"
              onChangeText={text => setPhoneNumber(text)}
              editable={false}
            />

            <Text style={styles.text}>Password</Text>

            <TextInput
              style={styles.inputPass}
              placeholder="*******"
              secureTextEntry={true}
              value={password}
              placeholderTextColor="gray"
              onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity
              onPress={joinPremium}
              style={[
                styles.buttonMain,
                {backgroundColor: '#660033', width: '80%'},
              ]}>
              {isPaying ? (
                <ActivityIndicator color="white" size="small" animating />
              ) : (
                <Text style={styles.buttonText}>Finish</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPayModal(false)}
              style={[
                styles.buttonMain,
                {backgroundColor: '#ff3300', width: '80%'},
              ]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    padding: 20,
  },
  priceContainer: {
    width: '100%',
    height: 125,
    borderRadius: 10,
    backgroundColor: '#363944',
    borderWidth: 1,
    borderColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
  premText: {
    color: '#FF5C00',
    fontWeight: '700',
    fontSize: 20,
    marginVertical: 20,
  },
  benefitsText: {
    color: 'white',
    fontSize: 16,
  },
  howToText: {
    color: 'white',
    fontSize: 16,
  },
  joinBTN: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#445C81',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 100,
  },
  joinBTNText: {
    color: 'white',
    fontWeight: '700',
  },

  premiumBTN: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#cdd6e5',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 100,
  },
  premiumBTNText: {
    color: 'black',
    fontWeight: '700',
  },

  inputPass: {
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {height: 5, width: 5},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 10,
    backgroundColor: '#e6e6ff',
    height: 50,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    color: 'black',
    alignSelf: 'center',
    width: '80%',
  },
  text: {
    fontWeight: '700',
    marginBottom: 10,
    marginLeft: 10,
    color: 'black',
  },
  lableAndInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  modalView: {
    margin: 20,
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
  },
  phoneIcon: {
    position: 'absolute',
  },
  sub: {
    color: 'gray',
    fontWeight: '700',
  },
  cashText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 25,
    marginVertical: 10,
  },
});
