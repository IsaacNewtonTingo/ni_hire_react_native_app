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

import DropDownPicker from 'react-native-dropdown-picker';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';

function Signup({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPosting, setIsPosting] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [service, setService] = useState();
  const [category, setCategory] = useState();

  const [serviceTitle, setServiceTitle] = useState(null);
  const [openService, setOpenService] = useState(false);
  const [itemsService, setItemsService] = useState([
    {label: 'none', value: '', category: ''},
    {label: 'actor', value: 'actor', category: '630e24b284e428f126a46dfd'},
    {
      label: 'aesthetician',
      value: 'aesthetician',
      category: '631050b55cdf1279f53d12c7',
    },
    {
      label: 'affiliate marketing specialist',
      value: 'affiliate marketing specialist',
      category: '6310618798efad78d9c71599',
    },
    {
      label: 'airbrush artist',
      value: 'airbrush artist',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'album cover designer',
      value: 'album cover designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'animator',
      value: 'animator',
      category: '631050d05cdf1279f53d12cd',
    },
    {
      label: 'api engineer',
      value: 'api engineer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'app designer',
      value: 'app designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'app developer',
      value: 'app developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'architectural illustrator',
      value: 'architectural illustrator',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'art auctioneer',
      value: 'art auctioneer',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'astrologist',
      value: 'astrologist',
      category: '6310629198efad78d9c715a1',
    },
    {
      label: 'audio ads producer',
      value: 'audio ads producer',
      category: '631062a098efad78d9c715a3',
    },
    {
      label: 'audio editor',
      value: 'audio editor',
      category: '631062a098efad78d9c715a3',
    },
    {
      label: 'audiobook producer',
      value: 'audiobook producer',
      category: '631062a098efad78d9c715a3',
    },
    {
      label: 'back end developer',
      value: 'back end developer',
      category: '631062b998efad78d9c715a7',
    },
    {label: 'barber', value: 'barber', category: '631050b55cdf1279f53d12c7'},
    {
      label: 'beatmaker',
      value: 'beatmaker',
      category: '631062a098efad78d9c715a3',
    },
    {
      label: 'beauty school instructor',
      value: 'beauty school instructor',
      category: '631050b55cdf1279f53d12c7',
    },
    {
      label: 'blockchain developer',
      value: 'blockchain developer',
      category: '631062b998efad78d9c715a7',
    },
    {label: 'blogger', value: 'blogger', category: '6310758461622de83a87de01'},
    {
      label: 'book designer',
      value: 'book designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'book editor',
      value: 'book editor',
      category: '6310758461622de83a87de01',
    },
    {
      label: 'bot developer',
      value: 'bot developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'brochure designer',
      value: 'brochure designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'business cards designer',
      value: 'business cards designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'business consultant',
      value: 'business consultant',
      category: '63107894c7ee61d823cdb853',
    },
    {
      label: 'business labels developer',
      value: 'business labels developer',
      category: '6310758461622de83a87de01',
    },
    {
      label: 'c developer',
      value: 'c developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'car cleaner',
      value: 'car cleaner',
      category: '6310628098efad78d9c7159f',
    },
    {
      label: 'career counselor',
      value: 'career counselor',
      category: '63107894c7ee61d823cdb853',
    },
    {
      label: 'carpenter',
      value: 'carpenter',
      category: '6310628098efad78d9c7159f',
    },
    {
      label: 'carpet cleaner',
      value: 'carpet cleaner',
      category: '6310628098efad78d9c7159f',
    },
    {
      label: 'cartoonist',
      value: 'cartoonist',
      category: '631050d05cdf1279f53d12cd',
    },
    {
      label: 'catalog designer',
      value: 'catalog designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'cctv expert',
      value: 'cctv expert',
      category: '631051035cdf1279f53d12d9',
    },
    {
      label: 'character animator',
      value: 'character animator',
      category: '631050d05cdf1279f53d12cd',
    },
    {
      label: 'character modelling',
      value: 'character modelling',
      category: '631050d05cdf1279f53d12cd',
    },
    {label: 'chef', value: 'chef', category: '6310629198efad78d9c715a1'},
    {
      label: 'commedian',
      value: 'commedian',
      category: '630e24b284e428f126a46dfd',
    },
    // {
    //   label: 'photographer',
    //   value: 'photographer',
    //   category: '631062ae98efad78d9c715a5',
    // },
    {
      label: 'community management specialist',
      value: 'community management specialist',
      category: '6310618798efad78d9c71599',
    },
    {
      label: 'computer systems analyst',
      value: 'computer systems analyst',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'concert promoter',
      value: 'concert promoter',
      category: '630e24b284e428f126a46dfd',
    },
    {
      label: 'content strategist',
      value: 'content strategist',
      category: '6310618798efad78d9c71599',
    },
    {
      label: 'corporate team photographer',
      value: 'corporate team photographer',
      category: '631062ae98efad78d9c715a5',
    },
    {
      label: 'corporate videos creator',
      value: 'corporate videos creator',
      category: '631062c598efad78d9c715a9',
    },
    {
      label: 'cosmetic surgeon',
      value: 'cosmetic surgeon',
      category: '631050b55cdf1279f53d12c7',
    },
    {
      label: 'cosmetologist',
      value: 'cosmetologist',
      category: '631050b55cdf1279f53d12c7',
    },
    {
      label: 'courtroom artist',
      value: 'courtroom artist',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'cover letter designer',
      value: 'cover letter designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'cover letter specialist',
      value: 'cover letter specialist',
      category: '6310627398efad78d9c7159d',
    },
    {label: 'critic', value: 'critic', category: '630e24b284e428f126a46dfd'},
    {
      label: 'crm manager',
      value: 'crm manager',
      category: '63107894c7ee61d823cdb853',
    },
    {label: 'curator', value: 'curator', category: '631050e85cdf1279f53d12d3'},
    {
      label: 'cv designer',
      value: 'cv designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'cv specialist',
      value: 'cv specialist',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'cyber security expert',
      value: 'cyber security expert',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'dance coach',
      value: 'dance coach',
      category: '6310629198efad78d9c715a1',
    },
    {
      label: 'dancer',
      value: 'dancer',
      category: '6310629198efad78d9c715a1',
    },
    {
      label: 'data analyst',
      value: 'data analyst',
      category: '6310618798efad78d9c71599',
    },
    {
      label: 'data entry specialist',
      value: 'data entry specialist',
      category: '63107894c7ee61d823cdb853',
    },
    {
      label: 'data visualization speciaist',
      value: 'data visualization speciaist',
      category: '63107894c7ee61d823cdb853',
    },
    {
      label: 'delivery driver',
      value: 'delivery driver',
      category: '6310628098efad78d9c7159f',
    },
    {
      label: 'delivery person',
      value: 'delivery person',
      category: '6310628098efad78d9c7159f',
    },
    {
      label: 'dermatologist',
      value: 'dermatologist',
      category: '631050bd5cdf1279f53d12c9',
    },
    {
      label: 'desktop app developer',
      value: 'desktop app developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'dialect coach',
      value: 'dialect coach',
      category: '63107894c7ee61d823cdb853',
    },
    {
      label: 'digital marketing manager',
      value: 'digital marketing manager',
      category: '6310618798efad78d9c71599',
    },
    {
      label: 'dish washer',
      value: 'dish washer',
      category: '6310628098efad78d9c7159f',
    },
    {label: 'dj', value: 'dj', category: '630e24b284e428f126a46dfd'},
    {
      label: 'django developer',
      value: 'django developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'dressmaker',
      value: 'dressmaker',
      category: '6310626598efad78d9c7159b',
    },
    {
      label: 'drone pilot',
      value: 'drone pilot',
      category: '631062c598efad78d9c715a9',
    },
    {label: 'drummer', value: 'drummer', category: '630e24b284e428f126a46dfd'},
    {
      label: 'e-commerce manager',
      value: 'e-commerce manager',
      category: '630e24b284e428f126a46dfd',
    },
    {
      label: 'e-commerce product video creator',
      value: 'e-commerce product video creator',
      category: '631062c598efad78d9c715a9',
    },
    {
      label: 'eLearning content developer',
      value: 'eLearning content developer',
      category: '6310758461622de83a87de01',
    },
    {
      label: 'electrician',
      value: 'electrician',
      category: '6310628098efad78d9c7159f',
    },
    {
      label: 'email marketing specialist',
      value: 'email marketing specialist',
      category: '6310618798efad78d9c71599',
    },
    {
      label: 'embroiderer',
      value: 'embroiderer',
      category: '6310626598efad78d9c7159b',
    },
    {
      label: 'erp manager',
      value: 'erp manager',
      category: '63107894c7ee61d823cdb853',
    },
    {
      label: 'event photographer',
      value: 'event photographer',
      category: '631062ae98efad78d9c715a5',
    },
    {
      label: 'event planner',
      value: 'event planner',
      category: '630e24b284e428f126a46dfd',
    },
    {
      label: 'eyelash technician',
      value: 'eyelash technician',
      category: '631050b55cdf1279f53d12c7',
    },
    {
      label: 'fashion consultant',
      value: 'fashion consultant',
      category: '6310626598efad78d9c7159b',
    },
    {
      label: 'fashion designer',
      value: 'fashion designer',
      category: '6310626598efad78d9c7159b',
    },
    {
      label: 'fencing specialist',
      value: 'fencing specialist',
      category: '6310628098efad78d9c7159f',
    },
    {
      label: 'fibre artist',
      value: 'fibre artist',
      category: '6310626598efad78d9c7159b',
    },
    {
      label: 'film crew',
      value: 'film crew',
      category: '630e24b284e428f126a46dfd',
    },
    {
      label: 'flyer designer',
      value: 'flyer designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'food photographer',
      value: 'food photographer',
      category: '631062ae98efad78d9c715a5',
    },
    {label: 'foreman', value: 'foreman', category: '6310628098efad78d9c7159f'},
    {
      label: 'front end developer',
      value: 'front end developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'full stack developer',
      value: 'full stack developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'game designer',
      value: 'game designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'game developer',
      value: 'game developer',
      category: '631062b998efad78d9c715a7',
    },
    {label: 'gamer', value: 'gamer', category: '6310629198efad78d9c715a1'},
    {
      label: 'gardener',
      value: 'gardener',
      category: '6310628098efad78d9c7159f',
    },
    {
      label: 'glass artist',
      value: 'glass artist',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'grant writer',
      value: 'grant writer',
      category: '6310758461622de83a87de01',
    },
    {
      label: 'groundsman',
      value: 'groundsman',
      category: '6310628098efad78d9c7159f',
    },
    {
      label: 'guitarist',
      value: 'guitarist',
      category: '631062a098efad78d9c715a3',
    },
    {
      label: 'gutter cleaner',
      value: 'gutter cleaner',
      category: '6310628098efad78d9c7159f',
    },
    {
      label: 'hair dresser',
      value: 'hair dresser',
      category: '631050b55cdf1279f53d12c7',
    },
    {
      label: 'hair stylist',
      value: 'hair stylist',
      category: '631050b55cdf1279f53d12c7',
    },
    {
      label: 'home cleaner',
      value: 'home cleaner',
      category: '6310628098efad78d9c7159f ',
    },
    {
      label: 'hr consultant',
      value: 'hr consultant',
      category: '63107894c7ee61d823cdb853',
    },
    {
      label: 'icon designer',
      value: 'icon designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'illustrator',
      value: 'illustrator',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'influencer marketing specialist',
      value: 'influencer marketing specialist',
      category: '6310618798efad78d9c71599',
    },
    {
      label: 'infographics designer',
      value: 'infographics designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'interiror designer',
      value: 'interiror designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'internet of things specialist',
      value: 'internet of things specialist',
      category: '6310618798efad78d9c71599',
    },
    {
      label: 'intro & outro video creator',
      value: 'intro & outro video creator',
      category: '631062c598efad78d9c715a9',
    },
    {
      label: 'invitation designer',
      value: 'invitation designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'java developer',
      value: 'java developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'javascript developer',
      value: 'javascript developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'jewelery designer',
      value: 'jewelery designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'jeweller',
      value: 'jeweller',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'landing page designer',
      value: 'landing page designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'landscape designer',
      value: 'landscape designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'laravel developer',
      value: 'laravel developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'laser hair removal technician',
      value: 'laser hair removal technician',
      category: '631050b55cdf1279f53d12c7',
    },
    {
      label: 'legal consultant',
      value: 'legal consultant',
      category: '63107894c7ee61d823cdb853',
    },
    {
      label: 'life coach',
      value: 'life coach',
      category: '6310629198efad78d9c715a1',
    },
    {
      label: 'lifestyle photographer',
      value: 'lifestyle photographer',
      category: '631062ae98efad78d9c715a5',
    },
    {
      label: 'lighting setup expert',
      value: 'lighting setup expert',
      category: '631062ae98efad78d9c715a5',
    },
    {
      label: 'linen designer',
      value: 'linen designer',
      category: '6310626598efad78d9c7159b',
    },
    {
      label: 'logo designer',
      value: 'logo designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'lyric video creator',
      value: 'lyric video creator',
      category: '631062c598efad78d9c715a9',
    },
    {
      label: 'makeup artist',
      value: 'makeup artist',
      category: '631050b55cdf1279f53d12c7',
    },
    {
      label: 'mama fua',
      value: 'mama fua',
      category: '6310628098efad78d9c7159f',
    },
    {
      label: 'market advisor',
      value: 'market advisor',
      category: '6310618798efad78d9c71599',
    },
    {
      label: 'market research specialist',
      value: 'market research specialist',
      category: '63107894c7ee61d823cdb853',
    },
    {
      label: 'marketing assistant',
      value: 'marketing assistant',
      category: '63107894c7ee61d823cdb853',
    },
    {label: 'mason', value: 'mason', category: '6310628098efad78d9c7159f'},
    {
      label: 'massage therapist',
      value: 'massage therapist',
      category: '631050bd5cdf1279f53d12c9',
    },
    {
      label: 'master of ceremony',
      value: 'master of ceremony',
      category: '630e24b284e428f126a46dfd',
    },
    {
      label: 'mechanic',
      value: 'mechanic',
      category: '6310628098efad78d9c7159f',
    },
    {
      label: 'menu designer',
      value: 'menu designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'mixing & mastering engineer',
      value: 'mixing & mastering engineer',
      category: '631062a098efad78d9c715a3',
    },
    {
      label: 'mobile app developer',
      value: 'mobile app developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'mobile app marketing specialist',
      value: 'mobile app marketing specialist',
      category: '6310618798efad78d9c71599',
    },
    {label: 'model', value: 'model', category: '6310629198efad78d9c715a1'},
    {label: 'mover', value: 'mover', category: '6310628098efad78d9c7159f'},
    {
      label: 'movie director',
      value: 'movie director',
      category: '631062c598efad78d9c715a9',
    },
    {
      label: 'movie editor',
      value: 'movie editor',
      category: '631062c598efad78d9c715a9',
    },
    {
      label: 'movie producer',
      value: 'movie producer',
      category: '631062c598efad78d9c715a9',
    },
    {
      label: 'mural artist',
      value: 'mural artist',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'museum curator',
      value: 'museum curator',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'museum director',
      value: 'museum director',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'music producer',
      value: 'music producer',
      category: '631062a098efad78d9c715a3',
    },
    {
      label: 'music promoter',
      value: 'music promoter',
      category: '631062a098efad78d9c715a3',
    },
    {
      label: 'music publisher',
      value: 'music publisher',
      category: '631062a098efad78d9c715a3',
    },
    {
      label: 'music therapist',
      value: 'music therapist',
      category: '631062a098efad78d9c715a3',
    },
    {
      label: 'music transcription specialist',
      value: 'music transcription specialist',
      category: '631062a098efad78d9c715a3',
    },
    {
      label: 'music video director',
      value: 'music video director',
      category: '631062c598efad78d9c715a9',
    },
    {
      label: 'nail technician',
      value: 'nail technician',
      category: '631050b55cdf1279f53d12c7',
    },
    {
      label: 'nft animator',
      value: 'nft animator',
      category: '631050d05cdf1279f53d12cd',
    },
    {
      label: 'node js developer',
      value: 'node js developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'office cleaner',
      value: 'office cleaner',
      category: '6310628098efad78d9c7159f',
    },
    {
      label: 'operations research analyst',
      value: 'operations research analyst',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'packaging & label designer',
      value: 'packaging & label designer',
      category: '6310627398efad78d9c7159d',
    },
    {label: 'painter', value: 'painter', category: '6310628098efad78d9c7159f'},
    {
      label: 'passport photographer',
      value: 'passport photographer',
      category: '631062ae98efad78d9c715a5',
    },
    {
      label: 'patrol officer',
      value: 'patrol officer',
      category: '631051035cdf1279f53d12d9',
    },
    {
      label: 'pattern maker',
      value: 'pattern maker',
      category: '6310626598efad78d9c7159b',
    },
    {
      label: 'personal stylist',
      value: 'personal stylist',
      category: '6310629198efad78d9c715a1',
    },
    {
      label: 'personal trainer',
      value: 'personal trainer',
      category: '6310629198efad78d9c715a1',
    },
    {
      label: 'photo editor',
      value: 'photo editor',
      category: '631062ae98efad78d9c715a5',
    },
    {
      label: 'photographer',
      value: 'photographer',
      category: '631062ae98efad78d9c715a5',
    },
    {
      label: 'photoshop expert',
      value: 'photoshop expert',
      category: '631062ae98efad78d9c715a5',
    },
    {label: 'pianist', value: 'pianist', category: '631062a098efad78d9c715a3'},
    {label: 'plumber', value: 'plumber', category: '6310628098efad78d9c7159f'},
    {
      label: 'podcast cover designer',
      value: 'podcast cover designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'podcast marketing specialist',
      value: 'podcast marketing specialist',
      category: '6310618798efad78d9c71599',
    },
    {
      label: 'portrait artist',
      value: 'portrait artist',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'poster designer',
      value: 'poster designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'printmaker',
      value: 'printmaker',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'private art teacher',
      value: 'private art teacher',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'product designer',
      value: 'product designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'product photographer',
      value: 'product photographer',
      category: '631062ae98efad78d9c715a5',
    },
    {
      label: 'professional artist',
      value: 'professional artist',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'professional crafter',
      value: 'professional crafter',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'professional speaker',
      value: 'professional speaker',
      category: '630e24b284e428f126a46dfd',
    },
    {
      label: 'project manager',
      value: 'project manager',
      category: '63107894c7ee61d823cdb853',
    },
    {
      label: 'proofreader',
      value: 'proofreader',
      category: '6310758461622de83a87de01',
    },
    {
      label: 'prop designer',
      value: 'prop designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'protection officer',
      value: 'protection officer',
      category: '631051035cdf1279f53d12d9',
    },
    {
      label: 'publicist',
      value: 'publicist',
      category: '630e24b284e428f126a46dfd',
    },
    {
      label: 'python developer',
      value: 'python developer',
      category: '631062b998efad78d9c715a7',
    },
    {label: 'rapper', value: 'rapper', category: '630e24b284e428f126a46dfd'},
    {
      label: 'react developer',
      value: 'react developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'react native developer',
      value: 'react native developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'resume designer',
      value: 'resume designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'resume specialist',
      value: 'resume specialist',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'roof cleaner',
      value: 'roof cleaner',
      category: '6310628098efad78d9c7159f',
    },
    {
      label: 'ruby developer',
      value: 'ruby developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'screener',
      value: 'screener',
      category: '631051035cdf1279f53d12d9',
    },
    {
      label: 'script editor',
      value: 'script editor',
      category: '6310758461622de83a87de01',
    },
    {
      label: 'script writer',
      value: 'script writer',
      category: '6310758461622de83a87de01',
    },
    {
      label: 'security analyst',
      value: 'security analyst',
      category: '631051035cdf1279f53d12d9',
    },
    {
      label: 'security consultant',
      value: 'security consultant',
      category: '631051035cdf1279f53d12d9',
    },
    {
      label: 'security engineer',
      value: 'security engineer',
      category: '631051035cdf1279f53d12d9',
    },
    {
      label: 'security escort',
      value: 'security escort',
      category: '631051035cdf1279f53d12d9',
    },
    {
      label: 'security guard',
      value: 'security guard',
      category: '631051035cdf1279f53d12d9',
    },
    {
      label: 'security manager',
      value: 'security manager',
      category: '631051035cdf1279f53d12d9',
    },
    {
      label: 'security officer',
      value: 'security officer',
      category: '631051035cdf1279f53d12d9',
    },
    {
      label: 'security specialist',
      value: 'security specialist',
      category: '631051035cdf1279f53d12d9',
    },
    {
      label: 'seo & sem specialist',
      value: 'seo & sem specialist',
      category: '6310618798efad78d9c71599',
    },
    {
      label: 'singer & vocalist',
      value: 'singer & vocalist',
      category: '631062a098efad78d9c715a3',
    },
    {
      label: 'social media marketer',
      value: 'social media marketer',
      category: '630e24b284e428f126a46dfd',
    },
    {
      label: 'social media photographer',
      value: 'social media photographer',
      category: '6310618798efad78d9c71599',
    },
    {
      label: 'software developer',
      value: 'software developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'songwriter',
      value: 'songwriter',
      category: '631062a098efad78d9c715a3',
    },
    {
      label: 'speech writer',
      value: 'speech writer',
      category: '6310758461622de83a87de01',
    },
    {
      label: 'spray painter',
      value: 'spray painter',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'story board illustrator',
      value: 'story board illustrator',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'stunt person',
      value: 'stunt person',
      category: '630e24b284e428f126a46dfd',
    },
    {label: 'stylist', value: 'stylist', category: '631050b55cdf1279f53d12c7'},
    {
      label: 'subtitles & captions pro',
      value: 'subtitles & captions pro',
      category: '631062c598efad78d9c715a9',
    },
    {
      label: 'supply chain manager',
      value: 'supply chain manager',
      category: '63107894c7ee61d823cdb853',
    },
    {
      label: 'surveillance officer',
      value: 'surveillance officer',
      category: '631051035cdf1279f53d12d9',
    },
    {
      label: 't-shirt designer',
      value: 't-shirt designer',
      category: '6310626598efad78d9c7159b',
    },
    {
      label: 'tattoo artist',
      value: 'tattoo artist',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'tattoo designer',
      value: 'tattoo designer',
      category: '631050e85cdf1279f53d12d3',
    },
    {
      label: 'technical writer',
      value: 'technical writer',
      category: '6310758461622de83a87de01',
    },
    {
      label: 'text message marketer',
      value: 'text message marketer',
      category: '6310618798efad78d9c71599',
    },
    {
      label: 'textile designer',
      value: 'textile designer',
      category: '6310626598efad78d9c7159b',
    },
    {
      label: 'theatre consultant',
      value: 'theatre consultant',
      category: '630e24b284e428f126a46dfd',
    },
    {
      label: 'tiling specialist',
      value: 'tiling specialist',
      category: '6310628098efad78d9c7159f',
    },
    {
      label: 'toy designer',
      value: 'toy designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'trailer video creator',
      value: 'trailer video creator',
      category: '631062c598efad78d9c715a9',
    },
    {
      label: 'transcriber',
      value: 'transcriber',
      category: '6310758461622de83a87de01',
    },
    {
      label: 'translator',
      value: 'translator',
      category: '6310758461622de83a87de01',
    },
    {
      label: 'truck driver',
      value: 'truck driver',
      category: '6310628098efad78d9c7159f',
    },
    {
      label: 'ui & ux designer',
      value: 'ui & ux designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'vfx creator',
      value: 'vfx creator',
      category: '631062c598efad78d9c715a9',
    },
    {
      label: 'video director',
      value: 'video director',
      category: '631062c598efad78d9c715a9',
    },
    {
      label: 'video editor',
      value: 'video editor',
      category: '631062c598efad78d9c715a9',
    },
    {
      label: 'video marketer',
      value: 'video marketer',
      category: '631062c598efad78d9c715a9',
    },
    {
      label: 'virtual assistant specialist',
      value: 'virtual assistant specialist',
      category: '63107894c7ee61d823cdb853',
    },
    {
      label: 'virtual reality developer',
      value: 'virtual reality developer',
      category: '6310618798efad78d9c71599',
    },
    {
      label: 'vocal coach',
      value: 'vocal coach',
      category: '631062a098efad78d9c715a3',
    },
    {
      label: 'voice over artist',
      value: 'voice over artist',
      category: '631062a098efad78d9c715a3',
    },
    {
      label: 'web developer',
      value: 'web developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'web designer',
      value: 'web designer',
      category: '6310627398efad78d9c7159d',
    },
    {
      label: 'website content developer',
      value: 'website content developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'window washing expert',
      value: 'window washing expert',
      category: '6310628098efad78d9c7159f',
    },
    {
      label: 'wix developer',
      value: 'wix developer',
      category: '631062b998efad78d9c715a7',
    },
    {
      label: 'wordpress developer',
      value: 'wordpress developer',
      category: '631062b998efad78d9c715a7',
    },
  ]);

  const validate = () => {
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !phoneNumber
    ) {
      Alert.alert('All field are required');
    } else if (password != confirmPassword) {
      Alert.alert("Passwords don't match");
    } else if (password.length < 8) {
      Alert.alert('Password is too short');
    } else if (phoneNumber.length != 10) {
      Alert.alert(
        'Invalid phone number',
        "Make sure it's in the format, '0766789867'",
      );
    } else if (!phoneNumber.startsWith(0)) {
      Alert.alert(
        'Invalid phone number',
        "Make sure it's in the format, '0766789867'",
      );
    } else {
      setIsPosting(true);
      setDisabled(true);
      handleSignUp();
    }
  };

  const empty = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
  };

  function selectedItem(item) {
    setService(item.value);
  }

  const handleSignUp = async () => {
    setIsPosting(true);
    const url = process.env.SIGNUP;
    await axios
      .post(url, {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber.replace(0, 254),
        email: email,
        password: password,
        generalPromotedTitle: service,
      })
      .then(response => {
        console.log(response.data);
        if (response.data.status == 'Pending') {
          // navigation.navigate('EmailVerificationScreen');
          Alert.alert(
            response.data.message,
            'Check your email then come back and login',
          );
          empty();
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
        empty();
      });
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
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
            onChangeText={setFirstName}
            placeholder="First name *"
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
            onChangeText={setLastName}
            placeholder="Last name *"
            style={styles.input}
            placeholderTextColor="gray"
          />
        </View>

        <View>
          <Feather style={styles.icons} name="phone" size={20} color="black" />
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone number *"
            style={styles.input}
            placeholderTextColor="gray"
            keyboardType="phone-pad"
          />
        </View>

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
            placeholder="Email *"
            style={styles.input}
            placeholderTextColor="gray"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

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
          placeholder="Select your job title (Optional)"
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
            width: '93%',
            alignSelf: 'center',
          }}
        />

        <View>
          <Feather style={styles.icons} name="lock" size={20} color="black" />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password *"
            style={styles.input}
            placeholderTextColor="gray"
            secureTextEntry={true}
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
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password *"
            style={styles.input}
            placeholderTextColor="gray"
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          disabled={disabled}
          onPress={validate}
          style={styles.addButton}>
          {isPosting ? (
            <ActivityIndicator color="white" size="small" animating />
          ) : (
            <Text style={styles.buttonText}>Create account</Text>
          )}
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              marginRight: 10,
            }}>
            Already have an account?
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#e62e00', fontSize: 16, fontWeight: '800'}}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 10,
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
    width: '90%',
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
