import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

// import {GOOGLE_API_KEY} from '@env';

import uuid from 'react-native-uuid';

const {width} = Dimensions.get('window');

import DropDownPicker from 'react-native-dropdown-picker';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

const PostService = () => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText(location);
    ref.current?.getAddressText(location);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState(null);
  const [jobImage, setJobImage] = useState();

  const [transferred, setTransferred] = useState(0);
  const [uid, setUserId] = useState('');

  const [location, setLocation] = useState('');

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

  function validate() {
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !location ||
      !serviceTitle ||
      !description ||
      !rate
    ) {
      Alert.alert('All fields are required');
    } else if (description.length <= 100) {
      Alert.alert('Add more details to your description');
    } else {
      setIsSubmitting(true);
      sendToDB();
    }
  }

  //push

  async function sendToDB() {
    const userID = auth().currentUser.uid;
    let imageUrl = await uploadImage();

    await firestore()
      .collection('Services')
      .doc(service)
      .collection('JobUsers')
      .doc(userID)
      .set({
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        location: location,
        jobTitle: service,
        rate: parseInt(rate.replace(/,/g, '')),
        description: description,
        isPromoted: false,
        datePromoted: '',
        rating: 0,
        jobViewedBy: [],
        jobUserID: userID,
        uniqueID: uuid.v4(),
        savedBy: [],
        jobImage: imageUrl,
      })
      .catch(error => {
        setIsSubmitting(false);
        console.log(error);
      })
      .then(async () => {
        await firestore()
          .collection('Users')
          .doc(userID)
          .update({
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            location: location,
          })

          .catch(error => {
            setIsSubmitting(false);
            console.log(error);
          });

        await firestore()
          .collection('Services')
          .doc(service)
          .update({
            Users: firestore.FieldValue.arrayUnion(userID),
          })
          .catch(error => {
            setIsSubmitting(false);
            console.log(error);
          });
      })
      .finally(() => {
        Alert.alert('Posted successfully');
        setIsSubmitting(false);
      });
  }

  function selectedItem(item) {
    setService(item.label);
  }

  useEffect(() => {
    var loggedInUser = auth().currentUser;
    getData(loggedInUser);
  }, []);

  async function getData(loggedInUser) {
    const uid = loggedInUser.uid;

    if (uid) {
      setUserId(uid);
      const userEmail = loggedInUser.email;
      setEmail(userEmail);

      const subscriber = await firestore()
        .collection('Users')
        .doc(uid)
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
            Something went wrong
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
            No data found
          </Text>
        </View>
      );
    }

    return docData;
  }

  function onError(error) {
    console.log(error);
  }

  function openLibrary() {
    ImagePicker.openPicker({
      // width: 300,
      // height: 300,
      // cropping: true,
      compressImageQuality: 0.6,
      mediaType: 'photo',
    })
      .then(image => {
        setJobImage(image.path);
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  }

  const uploadImage = async () => {
    if (jobImage == null) {
      return null;
    }
    const uploadUri = jobImage;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setIsSubmitting(true);
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

      setIsSubmitting(false);
      setJobImage(null);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <View style={{backgroundColor: '#1a1a1a', padding: 20}}>
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
            marginTop: 10,
          }}
          searchTextInputStyle={{
            borderColor: 'white',
            color: 'white',
          }}
          disableBorderRadius={true}
          zIndex={2000}
          placeholder="Select job"
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
            borderBottomWidth: 1,
            borderWidth: 0,
          }}
        />

        <Text
          style={{
            color: 'gray',
            fontSize: 12,
            fontWeight: '700',
            alignSelf: 'flex-end',
          }}>
          {description.length} /200
        </Text>

        <View>
          <MaterialIcons
            style={styles.icons}
            name="description"
            size={20}
            color="#ff6600"
          />

          <TextInput
            placeholderTextColor="gray"
            placeholder="Short desciption"
            style={styles.input}
            value={description}
            maxLength={200}
            onChangeText={setDescription}
            return="done"
            blurOnSubmit={true}
          />
        </View>

        <View>
          <MaterialIcons
            style={styles.icons}
            name="payment"
            size={20}
            color="#66ff33"
          />
          <TextInput
            placeholderTextColor="gray"
            placeholder="Your rate (Per task) in KSH."
            style={styles.input}
            value={rate}
            onChangeText={setRate}
            keyboardType="numeric"
            maxLength={6}
          />
        </View>
      </View>

      {/* Lower container----------------------------------------------------------- */}

      <View
        style={{
          backgroundColor: '#1a1a1a',
          marginTop: 20,
          zIndex: -188,
          padding: 20,
        }}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={openLibrary}
            style={{position: 'absolute', zIndex: 1, alignItems: 'center'}}>
            <Entypo name="camera" color="#cc0066" size={50} />

            <Text style={{color: 'black', fontWeight: '900', fontSize: 20}}>
              Upload cover image
            </Text>
          </TouchableOpacity>

          <Image
            style={{width: '100%', height: '100%'}}
            source={{
              uri: jobImage
                ? jobImage
                : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png',
            }}
          />
        </View>

        <View>
          <Ionicons
            style={styles.icons}
            name="md-person-outline"
            size={20}
            color="#66ffff"
          />
          <TextInput
            value={name}
            maxLength={15}
            onChangeText={setName}
            placeholder="Name"
            style={styles.input}
          />
        </View>

        <View>
          <Feather
            style={styles.icons}
            name="phone"
            size={20}
            color="#ffcc00"
          />
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone number"
            style={styles.input}
          />
        </View>

        <View>
          <MaterialIcons
            style={styles.icons}
            name="email"
            size={20}
            color="#ff99ff"
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            style={styles.input}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Entypo
            style={styles.icons}
            name="location"
            size={20}
            color="black"
          />
          <GooglePlacesAutocomplete
            ref={ref}
            fetchDetails={true}
            placeholder="Enter location"
            onPress={(data, details = null) => {
              setLocation(data.description);
            }}
            query={{
              key: process.env.GOOGLE_API_KEY,
              language: 'en',
              components: 'country:ke',
              types: '(cities)',
            }}
            styles={{
              textInput: {
                backgroundColor: '#FFFFFF',
                height: 44,
                borderRadius: 5,
                paddingVertical: 5,
                paddingHorizontal: 40,
                fontSize: 15,
                flex: 1,
                borderBottomWidth: 1,
                color: 'black',
              },
            }}
          />
        </View>
      </View>

      <TouchableOpacity onPress={validate} style={styles.addButton}>
        {isSubmitting ? (
          <ActivityIndicator size="small" color="gray" animating />
        ) : (
          <Text style={styles.btnText}>Submit</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    paddingHorizontal: 40,
    marginBottom: 10,
    borderBottomColor: 'white',
    zIndex: 0,
    color: 'white',
    marginHorizontal: 5,
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
    marginBottom: 100,
  },
  btnText: {
    color: 'white',
    fontWeight: '700',
  },
  icons: {
    position: 'absolute',
    top: 13,
    zIndex: 1,
    left: 10,
  },
  dropDown: {
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  imageContainer: {
    height: width / 1.7,
    width: width - 60,
    backgroundColor: '#e6e6e6',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
