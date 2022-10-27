import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';

import axios from 'axios';
import {CredentialsContext} from '../components/credentials-context';

import {RadioButton} from 'react-native-paper';

import DropDownPicker from 'react-native-dropdown-picker';

const {width} = Dimensions.get('window');

const Discover = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  let [allServiceProviders, setAllServiceProviders] = useState([]);
  let [location, setLocation] = useState('');
  let [serviceName, setServiceName] = useState('');

  let [rate, setRate] = useState('');
  let [rating, setRating] = useState('-1');
  let [isPromoted, setIsPromoted] = useState('-1');

  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);

  const {_id} = storedCredentials;

  const [noData, setNoData] = useState(true);
  const [reachedEnd, setReachedEnd] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  let pageNumber = 0;
  const limit = 20;

  useEffect(() => {
    // getFeaturedServiceProviders();
    getAllServiceProviders();

    return () => {
      pageNo = 0;
      setReachedEnd(false);
    };
  }, [(navigation, loading)]);

  navigation.addListener('focus', () => setLoading(!loading));

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function getAllServiceProviders() {
    setLoadingData(true);
    let filterURL = `${process.env.FILTER_SERVICE_PROVIDERS}?location=${location}&serviceName=${serviceName}&rate=${rate}&rating=${rating}&isPromoted=${isPromoted}&pageNumber=${pageNumber}&limit=${limit}`;
    await axios
      .get(filterURL)
      .then(response => {
        console.log(response.data.serviceProviders.length);
        if (response.data.serviceProviders.length <= 0) {
          setReachedEnd(true);
          setLoadingData(false);
          setNoData(true);
        } else {
          setAllServiceProviders(response.data.serviceProviders);
          setLoadingData(false);
          setNoData(false);
          if (response.data.serviceProviders.length < 20) {
            setReachedEnd(true);
          }
        }
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });
  }

  async function getMorePosts() {
    pageNumber += 1;
    let filterURL = `${process.env.FILTER_SERVICE_PROVIDERS}?location=${location}&serviceName=${serviceName}&rate=${rate}&rating=${rating}&isPromoted=${isPromoted}&pageNumber=${pageNumber}&limit=${limit}`;

    if (reachedEnd == true) {
      return;
    } else {
      await axios.get(filterURL).then(response => {
        if (response.data.serviceProviderCount === allServiceProviders.length) {
          setReachedEnd(true);
        } else {
          setAllServiceProviders([
            ...allServiceProviders,
            ...response.data.serviceProviders,
          ]);
        }
      });
    }
  }

  async function addToJobViewedBy({userID, serviceProviderID}) {
    const url = process.env.ADD_TO_MY_VIEWS;

    if (userID != _id) {
      await axios
        .post(url, {
          serviceProviderID,
          userID: _id,
        })
        .then(response => {
          console.log('Adding to views', response.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return;
    }
  }

  const [locationTitle, setlocationTitle] = useState(null);
  const [openlocation, setOpenlocation] = useState(false);
  const [itemslocation, setItemslocation] = useState([
    {label: 'all', value: '', category: '630e24b284e428f126a46dfd'},

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

  const [serviceTitle, setServiceTitle] = useState(null);
  const [openService, setOpenService] = useState(false);
  const [itemsService, setItemsService] = useState([
    {label: 'all', value: '', category: '630e24b284e428f126a46dfd'},
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

  if (loadingData == true) {
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
    <View style={styles.container}>
      {noData === true ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text
            style={{
              color: 'white',
              fontWeight: '700',
              textAlign: 'center',
            }}>
            No data found
          </Text>
        </View>
      ) : (
        <FlatList
          onEndReached={() => {
            getMorePosts();
          }}
          onEndReachedThreshold={0}
          data={allServiceProviders}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                addToJobViewedBy({
                  serviceProviderID: item._id,
                  userID: item.provider._id,
                });

                navigation.navigate('ServiceProviderProfile', {
                  serviceProviderID: item._id,
                  userID: item.provider._id,
                  firstName: item.provider.firstName,
                  lastName: item.provider.lastName,
                  email: item.provider.email,
                  phoneNumber: item.provider.phoneNumber,
                  profilePicture: item.provider.profilePicture,
                  location: item.provider.location,
                  image1: item.image1,
                  image2: item.image2,
                  image3: item.image3,
                  rate: item.rate,
                  rating: item.rating,
                  description: item.description,
                  isPromoted: item.isPromoted,
                  serviceName: item.service.serviceName,
                });
              }}
              key={item._id}
              style={styles.allUsersCard}>
              <View
                style={{
                  backgroundColor: '#333333',
                  height: '100%',
                  width: 120,
                }}>
                <Image
                  source={{
                    uri: item.image1
                      ? item.image1
                      : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png',
                  }}
                  style={{width: '100%', height: '100%'}}
                />
              </View>

              <View style={{margin: 10, flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '700',
                        fontSize: 16,
                        marginRight: 10,
                      }}>
                      {item.provider.firstName.length <= 10
                        ? Capitalize(item.provider.firstName)
                        : Capitalize(
                            item.provider.firstName.slice(0, 10) + '...',
                          )}
                    </Text>

                    {item.isPromoted == true && (
                      <Foundation
                        style={{marginLeft: 10}}
                        name="crown"
                        size={20}
                        color="orange"
                      />
                    )}
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <AntDesign name="star" size={15} color="orange" />

                    <Text
                      style={{
                        marginLeft: 10,
                        color: 'orange',
                        fontWeight: '700',
                      }}>
                      {item.rating.toFixed(1)}
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    color: '#cc0066',
                    fontWeight: '700',
                    fontSize: 12,
                  }}>
                  {item.service.serviceName.length <= 30
                    ? Capitalize(item.service.serviceName)
                    : Capitalize(item.service.serviceName.slice(0, 30) + '...')}
                </Text>

                <Text
                  style={{
                    color: '#a6a6a6',
                    fontSize: 10,
                  }}>
                  {item.description.length <= 85
                    ? item.description
                    : item.description.slice(0, 85) + '...'}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: '#33cccc',
                      fontSize: 12,
                      fontWeight: '700',
                    }}>
                    {item.provider.location.length <= 15
                      ? item.provider.location
                      : item.provider.location.slice(0, 15) + '...'}
                  </Text>

                  <Text
                    style={{
                      color: '#ff6600',
                      fontWeight: '700',
                      fontSize: 12,
                    }}>
                    KSH. {item.rate}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={() => {
            return reachedEnd ? (
              <Text
                style={{
                  fontWeight: '700',
                  color: '#d9d9d9',
                  textAlign: 'center',
                  padding: 15,
                  marginBottom: 100,
                }}>
                No more data
              </Text>
            ) : (
              <ActivityIndicator size="large" color="white" />
            );
          }}
        />
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontWeight: '800',
                marginBottom: 10,
              }}>
              Filter options
            </Text>

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
              placeholder="Filter by service name"
              open={openService}
              value={serviceTitle}
              items={itemsService}
              setOpen={setOpenService}
              setValue={setServiceTitle}
              setItems={setItemsService}
              onSelectItem={item => setServiceName(item.value)}
              dropDownContainerStyle={{
                backgroundColor: '#262626',
                zIndex: 3000,
                paddingHorizontal: 10,
                width: '80%',
                alignSelf: 'center',
              }}
              style={{
                marginBottom: 10,
                backgroundColor: '#b3d9ff',
                width: '80%',
                alignSelf: 'center',
              }}
            />

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
              placeholder="Filter by location"
              open={openlocation}
              value={locationTitle}
              items={itemslocation}
              setOpen={setOpenlocation}
              setValue={setlocationTitle}
              setItems={setItemslocation}
              onSelectItem={item => {
                setLocation(item.value);
              }}
              dropDownContainerStyle={{
                backgroundColor: '#262626',
                zIndex: 1,
                paddingHorizontal: 10,
                width: '80%',
                alignSelf: 'center',
              }}
              style={{
                backgroundColor: '#b3d9ff',
                width: '80%',
                alignSelf: 'center',
                marginBottom: 10,
              }}
            />

            <View style={styles.radiosContainer}>
              <Text style={styles.label}>Filter by rate</Text>
              <View style={styles.radioAndText}>
                <RadioButton
                  value="-1"
                  status={rate === '-1' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setRate('-1');
                  }}
                />
                <Text style={styles.transText}>High to low</Text>
              </View>

              <View style={styles.radioAndText}>
                <RadioButton
                  value="1"
                  status={rate === '1' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setRate('1');
                  }}
                />
                <Text style={styles.transText}>Low to high</Text>
              </View>
            </View>

            <View style={styles.radiosContainer}>
              <Text style={styles.label}>Filter by rating</Text>
              <View style={styles.radioAndText}>
                <RadioButton
                  value="-1"
                  status={rating === '-1' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setRating('-1');
                  }}
                />
                <Text style={styles.transText}>High to low</Text>
              </View>

              <View style={styles.radioAndText}>
                <RadioButton
                  value="1"
                  status={rating === '1' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setRating('1');
                  }}
                />
                <Text style={styles.transText}>Low to high</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                getAllServiceProviders();
                setModalVisible(false);
              }}
              style={[
                styles.buttonMain,
                {backgroundColor: '#660033', width: '80%'},
              ]}>
              {isFiltering ? (
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

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.filterContainer}>
        <AntDesign name="filter" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 20,
    paddingHorizontal: 50,
    backgroundColor: 'white',
    color: 'black',
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  card: {
    backgroundColor: '#1a1a1a',
    height: 120,
    flexDirection: 'row',
    width: width - 50,
    flex: 1,
    marginRight: 10,
  },
  topAndViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  topText: {
    fontWeight: '700',
    fontFamily: 'RobotoBlack',
    color: 'orange',
  },
  allUsersCard: {
    backgroundColor: '#1a1a1a',
    height: 120,
    flexDirection: 'row',
    width: width - 20,
    flex: 1,
    marginBottom: 20,
  },
  icons: {
    position: 'absolute',
    top: 13,
    zIndex: 1,
    left: 10,
  },
  viewAll: {
    fontWeight: '700',
    color: '#99c2ff',
    textDecorationLine: 'underline',
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
    height: 600,
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
  filterContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: 'white',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'gray',
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
  radiosContainer: {
    backgroundColor: '#ccdcff',
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  radioAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: '800',
    color: 'black',
    marginLeft: 10,
    marginBottom: 10,
  },
});
