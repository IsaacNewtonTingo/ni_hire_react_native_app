import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';

const B = props => (
  <Text
    style={{
      color: '#33cccc',
      fontWeight: '900',
    }}>
    {props.children}
  </Text>
);

export default function Welcome({navigation}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Image
        style={styles.welcomeIMG}
        source={require('../assets/images/welcome2.png')}
      /> */}

      <Text style={styles.companyTextStyles}>
        ni<B>Hire</B>
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={styles.getStartedBTN}>
        <Text style={styles.getStartedText}>Ge started</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
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
  welcomeIMG: {
    width: 339,
    height: '50%',
  },
  getStartedBTN: {
    backgroundColor: '#336699',
    height: 50,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: 'white',
    shadowOffset: {
      height: 3,
      width: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  getStartedText: {
    color: 'white',
    fontWeight: '900',
  },
});
