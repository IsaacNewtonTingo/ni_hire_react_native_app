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
import DropDownPicker from 'react-native-dropdown-picker';
import {TINY_PESA_API_KEY} from '@env';
import auth from '@react-native-firebase/auth';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

import firestore from '@react-native-firebase/firestore';

export default function PromoteProfile({navigation}) {
  const [showModal, setShowModal] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [paypalModalVisible, setPaypalModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();

  const [service, setService] = useState();
  const [serviceTitle, setServiceTitle] = useState(null);
  const [openService, setOpenService] = useState(false);
  const [itemsService, setItemsService] = useState([
    {label: 'a & R administrator', value: 'a & R administrator'},
    {label: 'accessory designer', value: 'accessory designer'},
    {label: 'actor', value: 'actor'},
    {label: 'aesthetician', value: 'aesthetician'},
    {
      label: 'affiliate marketing specialist',
      value: 'affiliate marketing specialist',
    },
    {label: 'airbrush artist', value: 'airbrush artist'},
    {label: 'album cover designer', value: 'album cover designer'},
    {label: 'animator', value: 'animator'},
    {label: 'api engineer', value: 'api engineer'},
    {label: 'app designer', value: 'app designer'},
    {label: 'app developer', value: 'app developer'},
    {label: 'architectural illustrator', value: 'architectural illustrator'},
    {label: 'art auctioneer', value: 'art auctioneer'},
    {label: 'astrologist', value: 'astrologist'},
    {label: 'audio ads producer', value: 'audio ads producer'},
    {label: 'audio editor', value: 'audio editor'},
    {label: 'audiobook producer', value: 'audiobook producer'},
    {label: 'back end developer', value: 'back end developer'},
    {label: 'barber', value: 'barber'},
    {label: 'beatmaker', value: 'beatmaker'},
    {label: 'beauty school instructor', value: 'beauty school instructor'},
    {label: 'blockchain developer', value: 'blockchain developer'},
    {label: 'blogger', value: 'blogger'},
    {label: 'book designer', value: 'book designer'},
    {label: 'book editor', value: 'book editor'},
    {label: 'bot developer', value: 'bot developer'},
    {label: 'brochure designer', value: 'brochure designer'},
    {label: 'business cards designer', value: 'business cards designer'},
    {label: 'business consultant', value: 'business consultant'},
    {label: 'business names developer', value: 'business names developer'},
    {label: 'c developer', value: 'c developer'},
    {label: 'c++ developer', value: 'c++ developer'},
    {label: 'car cleaner', value: 'car cleaner'},
    {label: 'career counselor', value: 'career counselor'},
    {label: 'carpenter', value: 'carpenter'},
    {label: 'carpet cleaner', value: 'carpet cleaner'},
    {label: 'cartoonist', value: 'cartoonist'},
    {label: 'catalog designer', value: 'catalog designer'},
    {label: 'cctv expert', value: 'cctv expert'},
    {label: 'character animator', value: 'character animator'},
    {label: 'beauty', value: 'character modelling'},
    {label: 'chef', value: 'chef'},
    {label: 'commedian', value: 'commedian'},
    {label: 'commercial photographer', value: 'commercial photographer'},
    {
      label: 'community management specialist',
      value: 'community management specialist',
    },
    {label: 'computer systems analyst', value: 'computer systems analyst'},
    {label: 'concert promoter', value: 'concert promoter'},
    {label: 'content strategist', value: 'content strategist'},
    {
      label: 'corporate team photographer',
      value: 'corporate team photographer',
    },
    {label: 'corporate videos creator', value: 'corporate videos creator'},
    {label: 'cosmetic surgeon', value: 'cosmetic surgeon'},
    {label: 'cosmetologist', value: 'cosmetologist'},
    {label: 'courtroom artist', value: 'courtroom artist'},
    {label: 'cover letter designer', value: 'cover letter designer'},
    {label: 'cover letter specialist', value: 'cover letter specialist'},
    {label: 'critic', value: 'critic'},
    {label: 'crm manager', value: 'crm manager'},
    {label: 'curator', value: 'curator'},
    {label: 'cv designer', value: 'cv designer'},
    {label: 'cv specialist', value: 'cv specialist'},
    {label: 'cyber security expert', value: 'cyber security expert'},
    {label: 'dance coach', value: 'dance coach'},
    {label: 'data analyst', value: 'data analyst'},
    {label: 'data entry specialist', value: 'data entry specialist'},
    {
      label: 'data visualization speciaist',
      value: 'data visualization speciaist',
    },
    {label: 'delivery driver', value: 'delivery driver'},
    {label: 'delivery person', value: 'delivery person'},
    {label: 'dermatologist', value: 'dermatologist'},
    {label: 'desktop app developer', value: 'desktop app developer'},
    {label: 'dialect coach', value: 'dialect coach'},
    {label: 'digital marketing manager', value: 'digital marketing manager'},
    {label: 'dish washer', value: 'dish washer'},
    {label: 'dj', value: 'dj'},
    {label: 'django developer', value: 'django developer'},
    {label: 'dressmaker', value: 'dressmaker'},
    {label: 'drone pilot', value: 'drone pilot'},
    {label: 'drummer', value: 'drummer'},
    {label: 'e-commerce manager', value: 'e-commerce manager'},
    {
      label: 'e-commerce product video creator',
      value: 'e-commerce product video creator',
    },
    {
      label: 'eLearning content developer',
      value: 'eLearning content developer',
    },
    {label: 'electrician', value: 'electrician'},
    {label: 'email marketing specialist', value: 'email marketing specialist'},
    {label: 'embroiderer', value: 'embroiderer'},
    {label: 'erp manager', value: 'erp manager'},
    {label: 'event photographer', value: 'event photographer'},
    {label: 'event planner', value: 'event planner'},
    {label: 'eyelash technician', value: 'eyelash technician'},
    {label: 'fashion consultant', value: 'fashion consultant'},
    {label: 'fashion designer', value: 'fashion designer'},
    {label: 'fencing specialist', value: 'fencing specialist'},
    {label: 'fibre artist', value: 'fibre artist'},
    {label: 'film crew', value: 'film crew'},
    {label: 'flyer designer', value: 'flyer designer'},
    {label: 'food photographer', value: 'food photographer'},
    {label: 'foreman', value: 'foreman'},
    {label: 'front end developer', value: 'front end developer'},
    {label: 'full stack developer', value: 'full stack developer'},
    {label: 'game designer', value: 'game designer'},
    {label: 'game developer', value: 'game developer'},
    {label: 'gamer', value: 'gamer'},
    {label: 'gardener', value: 'gardener'},
    {label: 'glass artist', value: 'glass artist'},
    {label: 'grant writer', value: 'grant writer'},
    {label: 'groundsman', value: 'groundsman'},
    {label: 'guitarist', value: 'guitarist'},
    {label: 'gutter cleaner', value: 'gutter cleaner'},
    {label: 'hair dresser', value: 'hair dresser'},
    {label: 'hair stylist', value: 'hair stylist'},
    {label: 'home cleaner', value: 'home cleaner'},
    {label: 'hr consultant', value: 'hr consultant'},
    {label: 'icon designer', value: 'icon designer'},
    {label: 'illustrator', value: 'illustrator'},
    {
      label: 'influencer marketing specialist',
      value: 'influencer marketing specialist',
    },
    {label: 'infographics designer', value: 'infographics designer'},
    {label: 'interiror designer', value: 'interiror designer'},
    {
      label: 'internet of things specialist',
      value: 'internet of things specialist',
    },
    {
      label: 'intro & outro video creator',
      value: 'intro & outro video creator',
    },
    {label: 'invitation designer', value: 'invitation designer'},
    {label: 'java developer', value: 'java developer'},
    {label: 'javascript developer', value: 'javascript developer'},
    {label: 'jewelery designer', value: 'jewelery designer'},
    {label: 'jeweller', value: 'jeweller'},
    {label: 'landing page designer', value: 'landing page designer'},
    {label: 'landscape designer', value: 'landscape designer'},
    {label: 'laravel developer', value: 'laravel developer'},
    {
      label: 'laser hair removal technician',
      value: 'laser hair removal technician',
    },
    {label: 'legal consultant', value: 'legal consultant'},
    {label: 'life coach', value: 'life coach'},
    {label: 'lifestyle photographer', value: 'lifestyle photographer'},
    {label: 'lighting setup expert', value: 'lighting setup expert'},
    {label: 'linen designer', value: 'linen designer'},
    {label: 'logo designer', value: 'logo designer'},
    {label: 'lyric video creator', value: 'lyric video creator'},
    {label: 'makeup artist', value: 'makeup artist'},
    {label: 'mama fua', value: 'mama fua'},
    {label: 'market advisor', value: 'market advisor'},
    {label: 'market research specialist', value: 'market research specialist'},
    {label: 'marketing assistant', value: 'marketing assistant'},
    {label: 'mason', value: 'mason'},
    {label: 'massage therapist', value: 'massage therapist'},
    {label: 'master of ceremony', value: 'master of ceremony'},
    {label: 'mechanic', value: 'mechanic'},
    {label: 'menu designer', value: 'menu designer'},
    {
      label: 'mixing & mastering engineer',
      value: 'mixing & mastering engineer',
    },
    {label: 'mobile app developer', value: 'mobile app developer'},
    {
      label: 'mobile app marketing specialist',
      value: 'mobile app marketing specialist',
    },
    {label: 'model', value: 'model'},
    {label: 'mover', value: 'mover'},
    {label: 'movie director', value: 'movie director'},
    {label: 'movie editor', value: 'movie editor'},
    {label: 'movie producer', value: 'movie producer'},
    {label: 'mural artist', value: 'mural artist'},
    {label: 'museum curator', value: 'museum curator'},
    {label: 'museum director', value: 'museum director'},
    {label: 'music producer', value: 'music producer'},
    {label: 'music promoter', value: 'music promoter'},
    {label: 'music publisher', value: 'music publisher'},
    {label: 'music therapist', value: 'music therapist'},
    {
      label: 'music transcription specialist',
      value: 'music transcription specialist',
    },
    {label: 'music video director', value: 'music video director'},
    {label: 'nail technician', value: 'nail technician'},
    {label: 'nft animator', value: 'nft animator'},
    {label: 'node js developer', value: 'node js developer'},
    {label: 'office cleaner', value: 'office cleaner'},
    {
      label: 'operations research analyst',
      value: 'operations research analyst',
    },
    {label: 'packaging & label designer', value: 'packaging & label designer'},
    {label: 'painter', value: 'painter'},
    {label: 'passport photographer', value: 'passport photographer'},
    {label: 'patrol officer', value: 'patrol officer'},
    {label: 'patter maker', value: 'patter maker'},
    {label: 'personal stylist', value: 'personal stylist'},
    {label: 'personal trainer', value: 'personal trainer'},
    {label: 'photo editor', value: 'photo editor'},
    {label: 'photographer', value: 'photographer'},
    {label: 'photoshop expert', value: 'photoshop expert'},
    {label: 'pianist', value: 'pianist'},
    {label: 'plumber', value: 'plumber'},
    {label: 'podcast cover designer', value: 'podcast cover designer'},
    {
      label: 'podcast marketing specialist',
      value: 'podcast marketing specialist',
    },
    {label: 'portrait artist', value: 'portrait artist'},
    {label: 'poster designer', value: 'poster designer'},
    {label: 'printmaker', value: 'printmaker'},
    {label: 'private art teacher', value: 'private art teacher'},
    {label: 'product designer', value: 'product designer'},
    {label: 'product photographer', value: 'product photographer'},
    {label: 'professional artist', value: 'professional artist'},
    {label: 'professional crafter', value: 'professional crafter'},
    {label: 'professional speaker', value: 'professional speaker'},
    {label: 'project manager', value: 'project manager'},
    {label: 'proofreader', value: 'proofreader'},
    {label: 'prop designer', value: 'prop designer'},
    {label: 'protection officer', value: 'protection officer'},
    {label: 'publicist', value: 'publicist'},
    {label: 'python developer', value: 'python developer'},
    {label: 'rapper', value: 'rapper'},
    {label: 'react developer', value: 'react developer'},
    {label: 'react native developer', value: 'react native developer'},
    {label: 'resume designer', value: 'resume designer'},
    {label: 'resume specialist', value: 'resume specialist'},
    {label: 'roof cleaner', value: 'roof cleaner'},
    {label: 'ruby developer', value: 'ruby developer'},
    {label: 'screener', value: 'screener'},
    {label: 'script editor', value: 'script editor'},
    {label: 'script writer', value: 'script writer'},
    {label: 'security analyst', value: 'security analyst'},
    {label: 'security consultant', value: 'security consultant'},
    {label: 'security engineer', value: 'security engineer'},
    {label: 'security escort', value: 'security escort'},
    {label: 'security guard', value: 'security guard'},
    {label: 'security manager', value: 'security manager'},
    {label: 'security officer', value: 'security officer'},
    {label: 'security specialist', value: 'security specialist'},
    {label: 'seo & sem specialist', value: 'seo & sem specialist'},
    {label: 'singer & vocalist', value: 'singer & vocalist'},
    {label: 'social media marketer', value: 'social media marketer'},
    {label: 'social media photographer', value: 'social media photographer'},
    {label: 'software developer', value: 'software developer'},
    {label: 'songwriter', value: 'songwriter'},
    {label: 'speech writer', value: 'speech writer'},
    {label: 'spray painter', value: 'spray painter'},
    {label: 'story board illustrator', value: 'story board illustrator'},
    {label: 'stunt person', value: 'stunt person '},
    {label: 'stylist', value: 'stylist'},
    {label: 'subtitles & captions pro', value: 'subtitles & captions pro'},
    {label: 'supply chain manager', value: 'supply chain manager'},
    {label: 'surveillance officer', value: 'surveillance officer'},
    {label: 't-shirt designer', value: 't-shirt designer'},
    {label: 'tattoo artist', value: 'tattoo artist'},
    {label: 'tattoo designer', value: 'tattoo designer'},
    {label: 'technical writer', value: 'technical writer'},
    {label: 'text message marketer', value: 'text message marketer'},
    {label: 'texttile designer', value: 'texttile designer'},
    {label: 'theatre consultant', value: 'theatre consultant'},
    {label: 'tiling specialist', value: 'tiling specialist'},
    {label: 'toy designer', value: 'toy designer'},
    {label: 'trailer video creator', value: 'trailer video creator'},
    {label: 'transcriber', value: 'transcriber'},
    {label: 'translator', value: 'translator'},
    {label: 'truck driver', value: 'truck driver'},
    {label: 'ui & ux designer', value: 'ui & ux designer'},
    {label: 'vfx creator', value: 'vfx creator'},
    {label: 'video director', value: 'video director'},
    {label: 'video editor', value: 'video editor'},
    {label: 'video marketer', value: 'video marketer'},
    {
      label: 'virtual assistant specialist',
      value: 'virtual assistant specialist',
    },
    {label: 'virtual reality developer', value: 'virtual reality developer'},
    {label: 'vocal coach', value: 'vocal coach'},
    {label: 'voice over artist', value: 'voice over artist'},
    {label: 'web developer', value: 'web developer'},
    {label: 'web designer', value: 'web designer'},
    {label: 'website content developer', value: 'website content developer'},
    {label: 'window washing expert', value: 'window washing expert'},
    {label: 'wix developer', value: 'wix developer'},
    {label: 'wordpress developer', value: 'wordpress developer'},
  ]);

  const userID = auth().currentUser.uid;

  async function updateData() {
    await firestore()
      .collection('Users')
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

  function payPalSubmit() {
    if (!service) {
      Alert.alert('Please select a job that describes you');
    } else {
      updateGeneralTitle();
      setShowModal(true);
    }
  }

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
  async function updateGeneralTitle() {
    await firestore().collection('Users').doc(userID).update({
      generalPromotedTitle: service,
    });
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

  function selectedItem(item) {
    setService(item.label);
  }

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <View style={styles.instructionsContainer}>
        <Image
          style={styles.colorMega}
          source={require('../assets/images/colorMega.png')}
        />
        <Text style={styles.ideaText}>
          Get a chance to be at the top. You will be among the{' '}
          <B>"Featured service"</B> providers at the home screen. This will
          drive traffic to your page"
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={paypalModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DropDownPicker
              listItemLabelStyle={{
                color: 'white',
              }}
              categorySelectable={true}
              listMode="SCROLLVIEW"
              searchable={true}
              searchPlaceholder="Search a service..."
              searchContainerStyle={{
                borderBottomColor: 'transparent',
              }}
              searchTextInputStyle={{
                borderColor: 'white',
                color: 'white',
              }}
              disableBorderRadius={true}
              zIndex={2000}
              placeholder="Select job that describes you"
              open={openService}
              value={serviceTitle}
              items={itemsService}
              setOpen={setOpenService}
              setValue={setServiceTitle}
              setItems={setItemsService}
              onSelectItem={item => selectedItem(item)}
              dropDownContainerStyle={{
                backgroundColor: '#262626',
                zIndex: 2000,
                paddingHorizontal: 10,
              }}
              style={{
                marginBottom: 10,
                backgroundColor: '#e6e6ff',
                borderWidth: 0,
                width: '80%',
                alignSelf: 'center',
              }}
            />

            <TouchableOpacity
              onPress={payPalSubmit}
              style={[
                styles.buttonMain,
                {backgroundColor: '#006699', width: '80%'},
              ]}>
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPaypalModalVisible(false)}
              style={[
                styles.buttonMain,
                {backgroundColor: '#ff3300', width: '80%'},
              ]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
              maxLength={12}
              keyboardType="phone-pad"
            />

            <DropDownPicker
              listItemLabelStyle={{
                color: 'white',
              }}
              categorySelectable={true}
              listMode="SCROLLVIEW"
              searchable={true}
              searchPlaceholder="Search a service..."
              searchContainerStyle={{
                borderBottomColor: 'transparent',
              }}
              searchTextInputStyle={{
                borderColor: 'white',
                color: 'white',
              }}
              disableBorderRadius={true}
              zIndex={2000}
              placeholder="Select job that describes you"
              open={openService}
              value={serviceTitle}
              items={itemsService}
              setOpen={setOpenService}
              setValue={setServiceTitle}
              setItems={setItemsService}
              onSelectItem={item => selectedItem(item)}
              dropDownContainerStyle={{
                backgroundColor: '#262626',
                zIndex: 2000,
                paddingHorizontal: 10,
              }}
              style={{
                marginBottom: 10,
                backgroundColor: '#e6e6ff',
                borderWidth: 0,
                width: '80%',
                alignSelf: 'center',
              }}
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
            setPaypalModalVisible(true);
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
    backgroundColor: '#4d0026',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    height: 300,
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
    color: 'white',
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
    marginBottom: 10,
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
    marginBottom: 10,
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
    height: 350,
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
