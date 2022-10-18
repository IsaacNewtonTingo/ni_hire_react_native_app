import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DropDownPicker from 'react-native-dropdown-picker';

import {CredentialsContext} from '../components/credentials-context';

import axios from 'axios';
import storage from '@react-native-firebase/storage';

const EditProfile = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState();
  const [password, setPassword] = useState('');

  const [newProfilePicture, setNewProfilePicture] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [editEmailModal, setEditEmailModal] = useState(false);
  const [editPhoneModal, setEditPhoneModal] = useState(false);

  const [isPosting, setIsPosting] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingPhone, setIsChangingPhone] = useState(false);

  const [loadingData, setLoadingData] = useState(true);

  const [displayButton, setDisplayButton] = useState(false);

  const [transferred, setTransferred] = useState(0);

  const [locationTitle, setlocationTitle] = useState(null);
  const [openlocation, setOpenlocation] = useState(false);
  const [itemslocation, setItemslocation] = useState([
    {
      value: 'Nairobi',
      lat: '-1.2864',
      lng: '36.8172',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Nairobi',
      capital: 'primary',
      population: '5545000',
      population_proper: '5545000',
    },
    {
      value: 'Meru',
      lat: '0.0500',
      lng: '37.6500',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Meru',
      capital: 'admin',
      population: '1833000',
      population_proper: '1833000',
    },
    {
      value: 'Mombasa',
      lat: '-4.0500',
      lng: '39.6667',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Mombasa',
      capital: 'admin',
      population: '1200000',
      population_proper: '1200000',
    },
    {
      value: 'Kisumu',
      lat: '-0.1000',
      lng: '34.7500',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kisumu',
      capital: 'admin',
      population: '409928',
      population_proper: '409928',
    },
    {
      value: 'Nakuru',
      lat: '-0.2833',
      lng: '36.0667',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Nakuru',
      capital: 'admin',
      population: '307990',
      population_proper: '307990',
    },
    {
      value: 'Eldoret',
      lat: '0.5167',
      lng: '35.2833',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Uasin Gishu',
      capital: 'admin',
      population: '193830',
      population_proper: '193830',
    },
    {
      value: 'Machakos',
      lat: '-1.5167',
      lng: '37.2667',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Machakos',
      capital: 'admin',
      population: '114109',
      population_proper: '114109',
    },
    {
      value: 'Kisii',
      lat: '-0.6698',
      lng: '34.7675',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kisii',
      capital: 'admin',
      population: '112417',
      population_proper: '112417',
    },
    {
      value: 'Mumias',
      lat: '0.3333',
      lng: '34.4833',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kakamega',
      capital: '',
      population: '99987',
      population_proper: '99987',
    },
    {
      value: 'Thika',
      lat: '-1.0396',
      lng: '37.0900',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kiambu',
      capital: '',
      population: '99322',
      population_proper: '87821',
    },
    {
      value: 'Nyeri',
      lat: '-0.4167',
      lng: '36.9500',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Nyeri',
      capital: 'admin',
      population: '98908',
      population_proper: '98908',
    },
    {
      value: 'Malindi',
      lat: '-3.2100',
      lng: '40.1000',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kilifi',
      capital: '',
      population: '94016',
      population_proper: '68304',
    },
    {
      value: 'Kakamega',
      lat: '0.2833',
      lng: '34.7500',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kakamega',
      capital: 'admin',
      population: '91778',
      population_proper: '91778',
    },
    {
      value: 'Kendu Bay',
      lat: '-0.3596',
      lng: '34.6400',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Homa Bay',
      capital: '',
      population: '91248',
      population_proper: '91248',
    },
    {
      value: 'Lodwar',
      lat: '3.1167',
      lng: '35.6000',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Turkana',
      capital: 'admin',
      population: '82970',
      population_proper: '82970',
    },
    {
      value: 'Athi River',
      lat: '-1.4500',
      lng: '36.9833',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Machakos',
      capital: '',
      population: '81302',
      population_proper: '81302',
    },
    {
      value: 'Kilifi',
      lat: '-3.6333',
      lng: '39.8500',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kilifi',
      capital: '',
      population: '80339',
      population_proper: '46118',
    },
    {
      value: 'Sotik',
      lat: '-0.6796',
      lng: '35.1200',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Bomet',
      capital: '',
      population: '71285',
      population_proper: '2600',
    },
    {
      value: 'Garissa',
      lat: '-0.4569',
      lng: '39.6583',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Garissa',
      capital: 'admin',
      population: '65881',
      population_proper: '65881',
    },
    {
      value: 'Kitale',
      lat: '1.0167',
      lng: '35.0000',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Trans Nzoia',
      capital: 'admin',
      population: '63245',
      population_proper: '63245',
    },
    {
      value: 'Bungoma',
      lat: '0.5666',
      lng: '34.5666',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Bungoma',
      capital: 'admin',
      population: '55857',
      population_proper: '55857',
    },
    {
      value: 'Isiolo',
      lat: '0.3500',
      lng: '37.5833',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Isiolo',
      capital: 'admin',
      population: '45989',
      population_proper: '45989',
    },
    {
      value: 'Wajir',
      lat: '1.7500',
      lng: '40.0667',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Wajir',
      capital: 'admin',
      population: '45771',
      population_proper: '34709',
    },
    {
      value: 'Embu',
      lat: '-0.5333',
      lng: '37.4500',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Embu',
      capital: 'admin',
      population: '41092',
      population_proper: '41092',
    },
    {
      value: 'Voi',
      lat: '-3.3696',
      lng: '38.5700',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Taita/Taveta',
      capital: '',
      population: '36487',
      population_proper: '19624',
    },
    {
      value: 'Homa Bay',
      lat: '-0.5167',
      lng: '34.4500',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Homa Bay',
      capital: 'admin',
      population: '32174',
      population_proper: '32174',
    },
    {
      value: 'Nanyuki',
      lat: '0.0167',
      lng: '37.0667',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Laikipia',
      capital: '',
      population: '31577',
      population_proper: '31577',
    },
    {
      value: 'Busia',
      lat: '0.4608',
      lng: '34.1108',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Busia',
      capital: 'admin',
      population: '30777',
      population_proper: '30777',
    },
    {
      value: 'Mandera',
      lat: '3.9167',
      lng: '41.8333',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Mandera',
      capital: 'admin',
      population: '30433',
      population_proper: '30433',
    },
    {
      value: 'Kericho',
      lat: '-0.3692',
      lng: '35.2839',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kericho',
      capital: 'admin',
      population: '30023',
      population_proper: '30023',
    },
    {
      value: 'Kitui',
      lat: '-1.3667',
      lng: '38.0167',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kitui',
      capital: 'admin',
      population: '29062',
      population_proper: '29062',
    },
    {
      value: 'Maralal',
      lat: '1.1000',
      lng: '36.7000',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Samburu',
      capital: 'admin',
      population: '20841',
      population_proper: '20841',
    },
    {
      value: 'Lamu',
      lat: '-2.2686',
      lng: '40.9003',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Lamu',
      capital: 'admin',
      population: '18382',
      population_proper: '18382',
    },
    {
      value: 'Kapsabet',
      lat: '0.2000',
      lng: '35.1000',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Nandi',
      capital: 'admin',
      population: '17918',
      population_proper: '17918',
    },
    {
      value: 'Marsabit',
      lat: '2.3333',
      lng: '37.9833',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Marsabit',
      capital: 'admin',
      population: '17127',
      population_proper: '17127',
    },
    {
      value: 'Hola',
      lat: '-1.5000',
      lng: '40.0300',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Tana River',
      capital: 'admin',
      population: '6931',
      population_proper: '6931',
    },
    {
      value: 'Kiambu',
      lat: '-1.1714',
      lng: '36.8356',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kiambu',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Kabarnet',
      lat: '0.4919',
      lng: '35.7430',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Baringo',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Migori',
      lat: '-1.0634',
      lng: '34.4731',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Migori',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Kerugoya',
      lat: '-0.4989',
      lng: '37.2803',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kirinyaga',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Iten',
      lat: '0.6703',
      lng: '35.5081',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Elgeyo/Marakwet',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Nyamira',
      lat: '-0.5633',
      lng: '34.9358',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Nyamira',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Murang’a',
      lat: '-0.7210',
      lng: '37.1526',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Murang’a',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Sotik Post',
      lat: '-0.7813',
      lng: '35.3416',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Bomet',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Siaya',
      lat: '0.0607',
      lng: '34.2881',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Siaya',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Kapenguria',
      lat: '1.2389',
      lng: '35.1119',
      country: 'Kenya',
      iso2: 'KE',
      label: 'West Pokot',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Wote',
      lat: '-1.7808',
      lng: '37.6288',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Makueni',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Mwatate',
      lat: '-3.5050',
      lng: '38.3772',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Taita/Taveta',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Kajiado',
      lat: '-1.8500',
      lng: '36.7833',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kajiado',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Ol Kalou',
      lat: '-0.2643',
      lng: '36.3788',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Nyandarua',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Narok',
      lat: '-1.0833',
      lng: '35.8667',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Narok',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Kwale',
      lat: '-4.1737',
      lng: '39.4521',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Kwale',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
    {
      value: 'Rumuruti',
      lat: '0.2725',
      lng: '36.5381',
      country: 'Kenya',
      iso2: 'KE',
      label: 'Laikipia',
      capital: 'admin',
      population: '',
      population_proper: '',
    },
  ]);

  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);
  const {_id} = storedCredentials;

  useEffect(() => {
    getUserData();
  }, []);

  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText(location);
    ref.current?.getAddressText(location);
  }, []);

  async function getUserData() {
    setLoadingData(true);
    const url = process.env.GET_USER_DATA + _id;

    await axios
      .get(url)
      .then(response => {
        userData = response.data.data;

        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setPhoneNumber(userData.phoneNumber.toString());
        setEmail(userData.email);
        setBio(userData.bio);
        setLocation(userData.location);
        setProfilePicture(userData.profilePicture);

        setLoadingData(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  function handleDisplayButton() {
    setDisplayButton(true);
  }

  function selectedItem(item) {
    setLocation(item.label);
  }

  async function editProfile() {
    setIsPosting(true);
    const url = process.env.EDIT_PROFILE + _id;

    await axios
      .put(url, {
        firstName,
        lastName,
        bio,
        profilePicture: newProfilePicture
          ? await uploadprofilePicture()
          : profilePicture,
        location,
        password,
        email,
      })
      .then(response => {
        Alert.alert(response.data.message);
        setIsPosting(false);
        setPassword('');
        setModalVisible(false);
      })
      .catch(err => {
        setIsPosting(false);
        console.log(err);
      });
  }

  function openLibrary() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.6,
      mediaType: 'photo',
    })
      .then(image => {
        setNewProfilePicture(image.path);
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  }

  const uploadprofilePicture = async () => {
    if (!newProfilePicture) {
      return null;
    } else {
      const uploadUri = newProfilePicture;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

      setIsPosting(true);
      setTransferred(0);

      const storageRef = storage().ref(`photos/${filename}`);
      const task = storageRef.putFile(uploadUri);

      // Set transferred state
      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );

        setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            10000,
        );
      });

      try {
        await task;

        const url = await storageRef.getDownloadURL();

        setIsPosting(false);
        return url;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  };

  async function changeEmail() {
    const url = process.env.CHANGE_EMAIL + _id;

    if (!password) {
      Alert.alert('Password is required');
    } else if (!email) {
      Alert.alert('Please input new email');
    } else {
      setIsChangingEmail(true);
      await axios
        .post(url, {
          newEmail: email,
          password,
        })
        .then(response => {
          Alert.alert(response.data.message);
          setIsChangingEmail(false);
          setEditEmailModal(false);
          setPassword('');
        })
        .catch(err => {
          console.log(err);
          setIsChangingEmail(false);
          setPassword('');
        });
    }
  }

  async function changePhoneNumber() {
    const url = process.env.CHANGE_PHONE_NUMBER + _id;
    setIsChangingPhone(true);
    await axios
      .post(url, {
        phoneNumber,
        password,
      })
      .then(response => {
        Alert.alert(response.data.message);
        setIsChangingPhone(false);
        setEditPhoneModal(false);
        setPassword('');
      })
      .catch(err => {
        console.log(err);
        setIsChangingPhone(false);
        setPassword('');
      });
  }

  if (loadingData === true) {
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
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <ImageBackground
        style={{
          width: '100%',
          height: 200,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        source={{
          uri: 'https://wallpaper.dog/large/20468100.jpg',
        }}>
        <View>
          <Image
            style={{width: 180, height: 180, borderRadius: 90}}
            source={{
              uri: newProfilePicture
                ? newProfilePicture
                : profilePicture
                ? profilePicture
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            handleDisplayButton(), openLibrary();
          }}
          style={{position: 'absolute'}}>
          <Entypo name="camera" color="white" size={50} />
        </TouchableOpacity>
      </ImageBackground>

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
            onChange={handleDisplayButton}
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
            onChange={handleDisplayButton}
            onChangeText={setLastName}
            placeholder="Last name"
            style={styles.input}
            placeholderTextColor="gray"
          />
        </View>

        <View>
          <MaterialCommunityIcons
            style={styles.icons}
            name="bio"
            size={20}
            color="black"
          />
          <TextInput
            value={bio}
            onChange={handleDisplayButton}
            onChangeText={setBio}
            placeholder="Bio"
            style={[styles.input, {height: 70}]}
            placeholderTextColor="gray"
            multiline={true}
            maxLength={90}
          />

          <Text
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              color: 'gray',
              fontSize: 10,
            }}>
            {bio.length}/90
          </Text>
        </View>

        <View style={{padding: 20}}>
          <DropDownPicker
            listItemLabelStyle={{
              color: 'white',
            }}
            categorySelectable={true}
            listMode="SCROLLVIEW"
            searchable={true}
            searchPlaceholder="Search a location..."
            searchContainerStyle={{
              borderBottomColor: 'transparent',
              marginTop: 10,
            }}
            searchTextInputStyle={{
              borderColor: 'white',
              color: 'white',
            }}
            disableBorderRadius={true}
            zIndex={2000}
            placeholder="Select location"
            open={openlocation}
            value={locationTitle}
            items={itemslocation}
            setOpen={setOpenlocation}
            setValue={setlocationTitle}
            setItems={setItemslocation}
            onSelectItem={item => {
              setDisplayButton(true);
              selectedItem(item);
            }}
            dropDownContainerStyle={{
              backgroundColor: '#262626',
              zIndex: 1,
              paddingHorizontal: 10,
            }}
            style={{
              borderBottomWidth: 1,
              borderWidth: 0,
            }}
          />
        </View>

        <View style={styles.phoneAndEmailContainer}>
          <TouchableOpacity
            onPress={() => setEditPhoneModal(true)}
            style={styles.phoneBTN}>
            <Text style={styles.phoneText}>Edit phone number</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setEditEmailModal(true);
            }}
            style={styles.phoneBTN}>
            <Text style={styles.phoneText}>Edit email</Text>
          </TouchableOpacity>
        </View>
      </View>

      {displayButton == true && (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: '#336699',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            marginHorizontal: 20,
            borderRadius: 10,
            marginBottom: 100,
            zIndex: -1,
          }}>
          <Text style={{color: 'white', fontWeight: '800'}}>Save</Text>
        </TouchableOpacity>
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text}>Enter password</Text>

            <TextInput
              style={styles.inputPass}
              placeholder="*******"
              value={password}
              secureTextEntry={true}
              placeholderTextColor="gray"
              onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity
              onPress={editProfile}
              style={[
                styles.buttonMain,
                {backgroundColor: '#660033', width: '80%'},
              ]}>
              {isPosting ? (
                <ActivityIndicator color="white" size="small" animating />
              ) : (
                <Text style={styles.buttonText}>Submit</Text>
              )}
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

      <Modal animationType="slide" transparent={true} visible={editEmailModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text}>New email</Text>
            <TextInput
              style={styles.inputPass}
              placeholder="e.g john@gmail.com"
              value={email}
              placeholderTextColor="gray"
              onChangeText={text => setEmail(text)}
            />

            <Text style={styles.text}>Enter password</Text>

            <TextInput
              style={styles.inputPass}
              placeholder="*******"
              value={password}
              secureTextEntry={true}
              placeholderTextColor="gray"
              onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity
              onPress={changeEmail}
              style={[
                styles.buttonMain,
                {backgroundColor: '#660033', width: '80%'},
              ]}>
              {isChangingEmail ? (
                <ActivityIndicator color="white" size="small" animating />
              ) : (
                <Text style={styles.buttonText}>Finish</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setEditEmailModal(false)}
              style={[
                styles.buttonMain,
                {backgroundColor: '#ff3300', width: '80%'},
              ]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={editPhoneModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text}>Phone number</Text>
            <TextInput
              style={styles.inputPass}
              placeholder="e.g 0725556676"
              value={phoneNumber}
              placeholderTextColor="gray"
              onChangeText={text => setPhoneNumber(text)}
            />

            <Text style={styles.text}>Enter password</Text>

            <TextInput
              style={styles.inputPass}
              placeholder="*******"
              value={password}
              secureTextEntry={true}
              placeholderTextColor="gray"
              onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity
              onPress={changePhoneNumber}
              style={[
                styles.buttonMain,
                {backgroundColor: '#660033', width: '80%'},
              ]}>
              {isChangingPhone ? (
                <ActivityIndicator color="white" size="small" animating />
              ) : (
                <Text style={styles.buttonText}>Finish</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setEditPhoneModal(false)}
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
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
    height: 50,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 60,
    marginBottom: 10,
    zIndex: 0,
    color: 'black',
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
  icons: {
    position: 'absolute',
    top: 13,
    zIndex: 1,
    left: 20,
  },
  phoneAndEmailContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  phoneBTN: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneText: {
    color: '#33cccc',
    fontWeight: '800',
  },
});
