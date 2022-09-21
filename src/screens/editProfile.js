import React, {useState, useEffect} from 'react';
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

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import Entypo from 'react-native-vector-icons/Entypo';

const width = Dimensions.get('window');

const EditProfile = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const currentUserId = auth().currentUser.uid;

  const [password, setPassword] = useState('');

  const [isPosting, setIsPosting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [displayButton, setDisplayButton] = useState(false);

  const [transferred, setTransferred] = useState(0);
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const user = auth().currentUser;
    if (user) {
      const userID = user.uid;
      const email = user.email;
      setEmail(email);

      const subscriber = firestore()
        .collection('Users')
        .doc(userID)
        .onSnapshot(onResult, onError);
      return subscriber;
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: '700', marginTop: 10}}>
            No user found
          </Text>
        </View>
      );
    }
  }

  function onResult(QuerySnapshot) {
    const docData = QuerySnapshot.data();

    if (docData) {
      setName(docData.name);
      setPhoneNumber(docData.phoneNumber);
      setLocation(docData.location);
      setBio(docData.bio);
      setProfileImage(docData.profilePicture);
    } else {
      setLocation('');
      setBio('');
    }

    return docData;
  }

  function onError(error) {
    console.log(error);
    return null;
  }

  function handleDisplayButton() {
    setDisplayButton(true);
  }

  async function reauthenticate(currentPassword) {
    var user = auth().currentUser;
    var cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  async function changeEmailInDB() {
    await firestore().collection('Users').doc(currentUserId).update({
      email: email,
    });
    setIsPosting(false);
  }

  async function updateEmail() {
    reauthenticate(password)
      .then(async () => {
        await auth()
          .currentUser.updateEmail(email)
          .then(function () {
            changeEmailInDB(email);

            setIsPosting(false);
            setPassword('');
          })
          .catch(error => {
            Alert.alert(error.message);
            setIsPosting(false);
          })
          .finally(() => {
            Alert.alert('Profile updated successfully');
            setModalVisible(!modalVisible);
            setDisplayButton(false);
          });
        return updateEmail;
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Wrong password');
        } else {
          Alert.alert(error.message);
        }

        setIsPosting(false);
      });
  }

  async function editProfile() {
    if (!password) {
      Alert.alert('Must enter password');
    } else {
      setIsPosting(true);
      reauthenticate(password)
        .then(async () => {
          let imageUrl = await uploadImage();

          const update = await firestore()
            .collection('Users')
            .doc(currentUserId)
            .update({
              name: name,
              phoneNumber: phoneNumber,
              location: location,
              bio: bio,
              profilePicture: imageUrl != null ? imageUrl : profileImage,
            });
          updateEmail();
          return update;
        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            Alert.alert('Wrong password');
          } else {
            Alert.alert(error.message);
          }
        })
        .finally(() => {
          setIsPosting(false);
        });
    }
  }

  async function handleDelete() {
    if (!password) {
      Alert.alert('Password is required');
    } else {
      setIsDeleting(true);
      reauthenticate(password)
        .then(async () => {
          await auth().currentUser.delete();
          await firestore().collection('Users').doc(currentUserId).delete();
          setIsDeleting(false);
        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            Alert.alert('Wrong password');
          } else {
            Alert.alert(error.message);
          }

          console.log(error.message);
          setIsDeleting(false);
        })
        .finally(() => {
          Alert.alert('Account deleted successfully');
          setIsDeleting(false);
          return null;
        });
    }
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
        setProfileImage(image.path);
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  }

  const uploadImage = async () => {
    if (profileImage == null) {
      return null;
    } else if (profileImage.startsWith('https')) {
      return null;
    } else {
      const uploadUri = profileImage;
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
        setProfileImage(null);
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
              uri: profileImage
                ? profileImage
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
          <Text style={styles.lable}>Name :</Text>
          <TextInput
            onChange={handleDisplayButton}
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

        <View
          style={{borderWidth: 0.3, marginTop: 10, borderColor: '#404040'}}
        />

        <View style={styles.lableAndInputContainer}>
          <Text style={styles.lable}>Email :</Text>
          <TextInput
            onChange={handleDisplayButton}
            value={email}
            onChangeText={setEmail}
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
            onChangeText={setPhoneNumber}
            style={styles.input}
          />
        </View>

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
