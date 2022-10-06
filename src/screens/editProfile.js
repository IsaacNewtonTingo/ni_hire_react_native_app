import React, {useState, useEffect, useContext} from 'react';
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

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from '../components/credentials-context';

import axios from 'axios';
import storage from '@react-native-firebase/storage';

const width = Dimensions.get('window');

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
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [isPosting, setIsPosting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [displayButton, setDisplayButton] = useState(false);

  const [transferred, setTransferred] = useState(0);

  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);
  const {_id} = storedCredentials;

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    setIsLoading(true);
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

        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }

  function handleDisplayButton() {
    setDisplayButton(true);
  }

  async function reauthenticate(currentPassword) {}

  async function changeEmailInDB() {}

  async function updateEmail() {}

  async function editProfile() {
    setIsPosting(true);
    const url = process.env.EDIT_PROFILE + _id;
    console.log(url);

    await axios
      .put(url, {
        firstName,
        lastName,
        bio,
        profilePicture: newProfilePicture ? await uploadprofilePicture() : '',
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

  async function handleDelete() {}

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

  const uploadImage = async () => {
    if (profilePicture == null) {
      return null;
    } else if (profilePicture.startsWith('https')) {
      return null;
    } else {
      const uploadUri = profilePicture;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

      // Add timestamp to File Name
      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');
      filename = name + Date.now() + '.' + extension;

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
            100,
        );
      });

      try {
        await task;

        const url = await storageRef.getDownloadURL();

        setIsPosting(false);
        setProfilePicture(null);
        return url;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  };

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
              uri: profilePicture
                ? profilePicture
                : newProfilePicture
                ? newProfilePicture
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

      <View style={{paddingBottom: 10, margin: 10}}>
        <View style={styles.lableAndInputContainer}>
          <Text style={styles.lable}>First name :</Text>
          <TextInput
            onChange={handleDisplayButton}
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
        </View>

        <View
          style={{borderWidth: 0.3, marginTop: 10, borderColor: '#404040'}}
        />

        <View style={styles.lableAndInputContainer}>
          <Text style={styles.lable}>Last name :</Text>
          <TextInput
            onChange={handleDisplayButton}
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />
        </View>

        <View
          style={{borderWidth: 0.3, marginTop: 10, borderColor: '#404040'}}
        />

        {/* <View style={styles.lableAndInputContainer}>
          <Text style={styles.lable}>Email :</Text>
          <TextInput
            onChange={handleDisplayButton}
            value={email}
            onChangeText={setEmail}
            editable={false}
            style={styles.input}
          />
        </View>

        <View
          style={{borderWidth: 0.3, marginTop: 10, borderColor: '#404040'}}
        />

        <View style={styles.lableAndInputContainer}>
          <Text style={styles.lable}>Phone :</Text>
          <TextInput
            onChange={handleDisplayButton}
            value={phoneNumber}
            editable={false}
            onChangeText={setPhoneNumber}
            style={styles.input}
          />
        </View> */}

        <View
          style={{borderWidth: 0.3, marginTop: 10, borderColor: '#404040'}}
        />

        <View style={styles.lableAndInputContainer}>
          <Text style={styles.lable}>Location :</Text>
          <TextInput
            onChange={handleDisplayButton}
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />
        </View>

        <View
          style={{borderWidth: 0.3, marginTop: 10, borderColor: '#404040'}}
        />

        <View style={styles.lableAndInputContainer}>
          <Text style={styles.lable}>Bio :</Text>
          <TextInput
            onChange={handleDisplayButton}
            maxLength={80}
            multiline={true}
            value={bio}
            onChangeText={setBio}
            style={styles.input}
            placeholder="Write something"
            placeholderTextColor="gray"
          />
        </View>

        <View
          style={{
            borderWidth: 0.3,
            marginTop: 10,
            marginBottom: 20,
            borderColor: '#404040',
          }}
        />
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}>
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
              onPress={handleDelete}
              style={[
                styles.buttonMain,
                {backgroundColor: '#660033', width: '80%'},
              ]}>
              {isDeleting ? (
                <ActivityIndicator color="white" size="small" animating />
              ) : (
                <Text style={styles.buttonText}>Finish</Text>
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

      {/* <TouchableOpacity
        onPress={() =>
          auth()
            .signOut()
            .then(() => {
              return null;
            })
        }
        style={styles.buttonMain}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity> */}

      {/* 
      <TouchableOpacity
        onPress={() => setDeleteModalVisible(true)}
        style={[styles.buttonMain, {backgroundColor: '#ff6600'}]}>
        {isDeleting ? (
          <ActivityIndicator color="white" size="small" animating />
        ) : (
          <Text style={styles.buttonText}>Delete account</Text>
        )}
      </TouchableOpacity> */}
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
    width: '80%',
    color: '#cc0066',
    padding: 0,
    fontWeight: '700',
    marginTop: 10,
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
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
    height: 300,
    justifyContent: 'center',
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
});
