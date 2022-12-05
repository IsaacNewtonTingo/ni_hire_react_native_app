import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const B = props => (
  <Text
    style={{
      textShadowColor: '#993333',
      textShadowOffset: {
        height: 1,
        width: 1,
      },
      textShadowRadius: 3,
    }}>
    {props.children}
  </Text>
);

const C = props => (
  <Text
    style={{
      color: '#33cccc',
    }}>
    {props.children}
  </Text>
);

const slides = [
  {
    key: 1,
    title: 'Welcome to',
    text: 'Where freelancers, on demand service providers and employers meet.',
    image: require('../assets/images/lead1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Discover',
    text: 'Join thousands of other service providers and get noticed by employers from all over the country',
    image: require('../assets/images/lead2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Get started with',
    text: 'Create and account to connect to the rest of the world',
    image: require('../assets/images/lead3.png'),
    backgroundColor: '#22bcb5',
  },
];

export default function Welcome({navigation}) {
  const renderItem = ({item}) => {
    return (
      <>
        <Image source={item.image} style={styles.image} />
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          locations={[0, 0.5, 1]}
          colors={['#080812', '#2e2d6c', '#080812']}
          style={styles.lowerContainer}>
          <Text style={styles.title}>
            {item.title}
            {'\n'}
            <B>
              ni<C>Hire</C>
            </B>
          </Text>
          <Text style={styles.description}>{item.text}</Text>
        </LinearGradient>
      </>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.text}>Next</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.text}>Done</Text>
      </View>
    );
  };

  const renderSkipButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.text}>Skip</Text>
      </View>
    );
  };

  const onDone = () => {
    navigation.navigate('Login');
  };

  return (
    <AppIntroSlider
      style={styles.container}
      data={slides}
      onDone={onDone}
      renderItem={renderItem}
      renderDoneButton={renderDoneButton}
      renderNextButton={renderNextButton}
      renderSkipButton={renderSkipButton}
      dotStyle={{backgroundColor: 'gray'}}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  companyTextStyles: {
    color: 'white',
    fontSize: 60,
    fontFamily: 'PaytoneOne-Regular',
    textShadowColor: '#993333',
    textShadowOffset: {
      height: 1,
      width: 2,
    },
    textShadowRadius: 10,
  },
  image: {
    width: width - 40,
    height: '50%',
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '800',
  },
  lowerContainer: {
    padding: 40,
    height: '50%',
    width: width,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: '#1a1a1a',
  },
  title: {
    color: 'white',
    fontFamily: 'PaytoneOne-Regular',
    fontSize: 30,
  },
  description: {
    color: '#C5C5C5',
    marginTop: 40,
    fontSize: 16,
  },
});
