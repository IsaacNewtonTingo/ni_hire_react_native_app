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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';
import {TINY_PESA_API_KEY} from '@env';

import auth from '@react-native-firebase/auth';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

import firestore from '@react-native-firebase/firestore';

export default function ServicePromotionPayment({route, navigation}) {
  const [showModal, setShowModal] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('254724753175');

  const userID = route.params.userID;
  const jobTitle = route.params.jobID;

  async function updateData() {
    await firestore()
      .collection('Services')
      .doc(jobTitle)
      .collection('JobUsers')
      .doc(userID)
      .update({
        isPromoted: true,
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Something went wrong');
        return null;
      });
  }

  const C = props => (
    <Text style={{color: '#66ffcc', fontWeight: '800'}}>{props.children}</Text>
  );
  const B = props => (
    <Text style={{color: '#66ffcc', fontWeight: '800'}}>{props.children}</Text>
  );

  const D = props => <Text style={{color: '#ff3300'}}>{props.children}</Text>;

  function handleResponse(data) {
    if (data.title === 'success') {
      setShowModal(false);
      console.log('Complete');
      updateData();
    } else if (data.title === 'cancel') {
      setShowModal(false);
      console.log('Canceled');
    } else if (data.title === 'error') {
      setShowModal(false);
      console.log('Something went wrong');
    } else {
      return;
    }
  }

  function promptMPesa() {
    Alert.alert(
      'Pay KSH. 200 with M-Pesa ?',
      'Click proceed to enter your phone number. You will be prompted your pin to finish transaction ',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Proceed',
          onPress: () => setModalVisible(true),
        },
      ],
    );
  }

  function submitForCheck() {
    if (!phoneNumber) {
      Alert.alert('Enter phone number');
    } else if (!phoneNumber.startsWith('2547')) {
      Alert.alert(
        'Wrong phone number format',
        "Make sure number starts with 2547. Don't include +",
      );
    } else if (phoneNumber < 12) {
      Alert.alert(
        'Invalid phone number',
        "Check and try again. Make sure number starts with 2547. Don't include +",
      );
    } else if (phoneNumber > 12) {
      Alert.alert(
        'Invalid phone number',
        "Check and try again. Make sure number starts with 2547. Don't include +",
      );
    } else if (!service) {
      Alert.alert('Select a service that describes you');
    } else {
      try {
        const url = 'https://tinypesa.com/api/v1/express/initialize';
        updateGeneralTitle();

        try {
          fetch(url, {
            body: 'amount=200&msisdn=' + phoneNumber + '&account_no=200',
            headers: {
              Apikey: {TINY_PESA_API_KEY},
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
          })
            .then(response => response.text())
            .then(result => console.log(result));
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        const userID = auth().currentUser.uid;
        const email = auth().currentUser.email;
        axios
          .post('http://ni-hire-paypal-backed.herokuapp.com/send-sms', {
            body:
              ' Account promotion : ' +
              userID +
              ' of phone number : ' +
              phoneNumber +
              ' Email : ' +
              email,
          })
          .catch(error => {
            console.log(error);
          });
        Alert.alert('Wait for M-Pesa prompt');
        setModalVisible(false);
      }
    }
  }
  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <View style={styles.instructionsContainer}>
        <Image
          style={styles.colorMega}
          source={require('../assets/images/colorMega.png')}
        />
        <Text style={styles.ideaText}>
          There are 3 places a <B>service</B> you wish to <B>promote</B> will
          appear :
        </Text>
      </View>

      <View style={styles.homeContainer}>
        <View style={styles.iconAndText}>
          <Ionicons name="home" size={30} color="#ffccff" />
          <Text style={styles.homeMainText}>Home</Text>
        </View>
        <Text style={styles.homeText}>
          At our home screen, there is <C>"Top Dawgs"</C> section where promoted
          services appear. Note tht this is not the same as{' '}
          <C>"Featured service providers"</C> at the top{' '}
        </Text>
      </View>

      <View style={styles.homeContainer}>
        <View style={styles.iconAndText}>
          <MaterialCommunityIcons name="fire" size={40} color="#ff3300" />
          <Text style={styles.homeMainText}>Discover</Text>
        </View>
        <Text style={styles.homeText}>
          At the top of our discover screen, promoted or rather featured
          services are also displayed. You can be a apart of that
        </Text>
      </View>

      <View style={styles.homeContainer}>
        <View style={styles.iconAndText}>
          <FontAwesome name="search" size={30} color="#66ffff" />
          <Text style={styles.homeMainText}>Search results</Text>
        </View>
        <Text style={styles.homeText}>
          When a user searches a given service and get a list of services
          providers, they will first see the promoted ones at the top.
        </Text>
      </View>

      <LinearGradient
        style={styles.payContainer}
        colors={['#000000', '#b3b3b3', '#000000']}>
        <Entypo name="price-tag" size={50} color="#cc0099" />
        <Text
          style={{
            fontSize: 30,
            color: '#d9d9d9',
            fontFamily: 'PaytoneOne-Regular',
            textShadowColor: '#000000',
            textShadowOffset: {
              height: 1,
              width: 1,
            },
            textShadowRadius: 1,
            marginLeft: 10,
          }}>
          <D>PAY </D> KSH. 200
        </Text>
      </LinearGradient>

      <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
        <WebView
          source={{uri: 'http://ni-hire-paypal-backed.herokuapp.com/'}}
          onNavigationStateChange={data => handleResponse(data)}
          injectedJavaScript={'document.initialBTN.submit()'}
        />
      </Modal>

      <View
        style={{
          borderWidth: 1,
          borderColor: 'white',
          marginVertical: 20,
          width: '10%',
          alignSelf: 'center',
        }}
      />

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text}>Enter phone number</Text>

            <TextInput
              style={styles.inputPass}
              placeholder="e.g 254724753175"
              value={phoneNumber}
              placeholderTextColor="gray"
              onChangeText={text => setPhoneNumber(text)}
            />

            <TouchableOpacity
              onPress={submitForCheck}
              style={[
                styles.buttonMain,
                {backgroundColor: '#006699', width: '80%'},
              ]}>
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={[
                styles.buttonMain,
                {backgroundColor: '#ff3300', width: '80%'},
              ]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{marginBottom: 100}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setShowModal(true);
          }}>
          <Image
            style={styles.logoImages}
            source={require('../assets/images/paypallogo.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={promptMPesa}>
          <Image
            style={[styles.logoImages, {width: 90}]}
            source={require('../assets/images/mpesalogo.png')}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    padding: 20,
    paddingBottom: 100,
  },
  btn: {
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  payBtnText: {
    color: 'white',
    fontWeight: '800',
  },
  payContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 40,
  },
  logoImages: {
    width: 120,
    height: 40,
  },

  instructionsContainer: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    height: 250,
    marginBottom: 20,
  },
  imgBG: {
    flex: 1,
  },
  colorMega: {
    width: 100,
    height: 100,
  },
  ideaText: {
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    color: 'black',
  },
  homeContainer: {
    height: 200,
    backgroundColor: '#4d0019',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  homeMainText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 30,
    marginLeft: 20,
  },
  homeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  lable: {
    color: 'white',
    fontWeight: '700',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 0,
  },
  input: {
    width: '80%',
    color: '#cc0066',
    padding: 0,
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
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    width: 300,
    height: 300,
    justifyContent: 'center',
    shadowColor: 'white',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
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
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
