import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  ActivityIndicator,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useContext} from 'react';
const {width} = Dimensions.get('window');

import Entypo from 'react-native-vector-icons/Entypo';

import ImagePicker from 'react-native-image-crop-picker';

import {CredentialsContext} from '../components/credentials-context';
import axios from 'axios';

import storage from '@react-native-firebase/storage';

export default function BugReport({url, children}) {
  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);
  const {_id} = storedCredentials;

  const [isPosting, setIsPosting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [message, setMessage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');

  const [transferred1, setTransferred1] = useState(0);
  const [transferred2, setTransferred2] = useState(0);
  const [transferred3, setTransferred3] = useState(0);

  const noImage =
    'https://csp-clients.s3.amazonaws.com/easttexasspa/wp-content/uploads/2021/06/no-image-icon-23485.png';

  async function reportBug() {
    const url = process.env.REPORT_BUG + _id;
    if (!message) {
      Alert.alert('Please write something');
    } else {
      setIsPosting(true);
      await axios
        .post(url, {
          message,
          image1: image1 != '' ? await uploadImage1() : '',
          image2: image2 != '' ? await uploadImage2() : '',
          image3: image3 != '' ? await uploadImage3() : '',
        })
        .then(response => {
          setIsPosting(false);

          Alert.alert(response.data.status, response.data.message);
          setMessage('');
          setImage1('');
          setImage2('');
          setImage2('');
        })
        .catch(err => {
          console.log(err);
          setIsPosting(false);
        });
    }
  }

  function openLibrary1() {
    ImagePicker.openPicker({
      // width: 300,
      // height: 300,
      // cropping: true,
      compressImageQuality: 0.6,
      mediaType: 'photo',
    })
      .then(image => {
        setImage1(image.path);
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  }

  function openLibrary2() {
    ImagePicker.openPicker({
      // width: 300,
      // height: 300,
      // cropping: true,
      compressImageQuality: 0.6,
      mediaType: 'photo',
    })
      .then(image => {
        setImage2(image.path);
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  }

  function openLibrary3() {
    ImagePicker.openPicker({
      // width: 300,
      // height: 300,
      // cropping: true,
      compressImageQuality: 0.6,
      mediaType: 'photo',
    })
      .then(image => {
        setImage3(image.path);
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  }

  const uploadImage1 = async () => {
    if (!image1) {
      return null;
    } else {
      const uploadUri = image1;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

      setIsSubmitting(true);
      setTransferred1(0);

      const storageRef = storage().ref(`photos/${filename}`);
      const task = storageRef.putFile(uploadUri);

      // Set transferred state
      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );

        setTransferred1(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes),
        ) * 10000;
      });

      try {
        await task;

        const url = await storageRef.getDownloadURL();

        setIsSubmitting(false);
        return url;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  };

  const uploadImage2 = async () => {
    if (image2 == null) {
      return null;
    }
    const uploadUri = image2;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    setIsSubmitting(true);
    setTransferred2(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred2(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes),
      ) * 10000;
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setIsSubmitting(false);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const uploadImage3 = async () => {
    if (image3 == null) {
      return null;
    }
    const uploadUri = image3;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    setIsSubmitting(true);
    setTransferred3(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred3(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes),
      ) * 10000;
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setIsSubmitting(false);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.container}>
      <View style={styles.centerView}>
        <Text
          style={{
            color: 'white',
            marginBottom: 40,
            fontSize: 16,
          }}>
          Experiencing any errors in our application? Please indicate the issue
          in detail and we will try our best to fix it.
        </Text>

        <TextInput
          style={styles.messageInput}
          placeholder="Write something here"
          value={message}
          placeholderTextColor="gray"
          onChangeText={setMessage}
          multiline={true}
        />

        <Text style={{color: 'white', fontWeight: '800'}}>
          Add image screenshots
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={openLibrary1}
              style={{position: 'absolute', zIndex: 1, alignItems: 'center'}}>
              <Entypo name="camera" color="#cc0066" size={30} />
            </TouchableOpacity>

            <Image
              style={{width: '100%', height: '100%'}}
              source={{
                uri: image1 ? image1 : noImage,
              }}
            />
          </View>

          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={openLibrary2}
              style={{position: 'absolute', zIndex: 1, alignItems: 'center'}}>
              <Entypo name="camera" color="#cc0066" size={30} />
            </TouchableOpacity>

            <Image
              style={{width: '100%', height: '100%'}}
              source={{
                uri: image2 ? image2 : noImage,
              }}
            />
          </View>

          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={openLibrary3}
              style={{position: 'absolute', zIndex: 1, alignItems: 'center'}}>
              <Entypo name="camera" color="#cc0066" size={30} />
            </TouchableOpacity>

            <Image
              style={{width: '100%', height: '100%'}}
              source={{
                uri: image3 ? image3 : noImage,
              }}
            />
          </View>
        </View>

        <TouchableOpacity onPress={reportBug} style={styles.buttonMain}>
          {isPosting ? (
            <ActivityIndicator color="white" size="small" animating />
          ) : (
            <Text style={styles.buttonText}>Finish</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerView: {
    backgroundColor: '#262626',
    borderRadius: 20,
    width: '90%',
    shadowColor: 'white',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    padding: 20,
    paddingTop: 40,
  },
  messageInput: {
    height: 100,
    borderRadius: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 40,
    color: 'white',
  },
  buttonMain: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#800060',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignSelf: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  imageContainer: {
    height: 100,
    width: width / 3.8,
    backgroundColor: '#e6e6e6',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 5,
  },
  bugAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bugIMG: {
    width: 100,
    height: 100,
  },
  bugText: {
    fontSize: 30,
    fontWeight: '800',
    color: 'white',
  },
});
