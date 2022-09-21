import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const B = props => <Text style={{color: '#ff6600'}}>{props.children}</Text>;
const C = props => (
  <Text style={{color: '#66ffcc', fontWeight: '800'}}>{props.children}</Text>
);

export default function PromoteService({navigation}) {
  const D = props => (
    <Text
      onPress={() => navigation.navigate('Profile')}
      style={{color: '#ff3300'}}>
      {props.children}
    </Text>
  );

  // function pay() {
  //   console.log(amount);
  //   const url =
  //     'https://tinypesa.com/api/v1/express/initialize';

  //   try {
  //     fetch(url, {
  //       body:
  //         'amount=1&msisdn=0724753175&account_no=200',
  //       headers: {
  //         Apikey: 'SDaiB8iEHql',
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       method: 'POST',
  //     })
  //     .then(response => response.text())
  //     .then(result => console.log(result));
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.instructionsContainer}>
        <Image
          style={styles.colorMega}
          source={require('../assets/images/colorMega.png')}
        />
        <Text style={styles.ideaText}>
          There are 3 places a <B>service</B> you wish to <B>promote</B> will
          appear :
        </Text>
      </View>

      <View style={styles.homeContainer}>
        <View style={styles.iconAndText}>
          <Ionicons name="home" size={30} color="#ffccff" />
          <Text style={styles.homeMainText}>Home</Text>
        </View>
        <Text style={styles.homeText}>
          At our home screen, there is <C>"Top Dawgs"</C> section where promoted
          services appear. Note tht this is not the same as{' '}
          <C>"Featured service providers"</C> at the top{' '}
        </Text>
      </View>

      <View style={styles.homeContainer}>
        <View style={styles.iconAndText}>
          <MaterialCommunityIcons name="fire" size={40} color="#ff3300" />
          <Text style={styles.homeMainText}>Discover</Text>
        </View>
        <Text style={styles.homeText}>
          At the top of our discover screen, promoted or rather featured
          services are also displayed. You can be a apart of that
        </Text>
      </View>

      <View style={styles.homeContainer}>
        <View style={styles.iconAndText}>
          <FontAwesome name="search" size={30} color="#66ffff" />
          <Text style={styles.homeMainText}>Search results</Text>
        </View>
        <Text style={styles.homeText}>
          When a user searches a given service and get a list of services
          providers, they will first see the promoted ones at the top.
        </Text>
      </View>

      <View
        style={{
          height: 300,
          backgroundColor: '#ccffff',
          padding: 20,
          marginBottom: 200,
          borderRadius: 10,
        }}>
        <View style={styles.iconAndText}>
          <Image
            style={{height: 60, width: 60, marginRight: 20}}
            source={require('../assets/images/howTo.png')}
          />
          <Text style={{fontWeight: '800', fontSize: 30, color: '#993366'}}>
            How to promote a service
          </Text>
        </View>
        <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
          1. Go to your <D>profile</D> . {'\n'}2. Click on the service you
          offer. {'\n'}
          3. Scroll to the bottom and click promote. {'\n'}4. Wait for the
          results to show.
        </Text>

        <Text
          style={{
            color: 'gray',
            fontWeight: '900',
            fontSize: 16,
            marginTop: 30,
          }}>
          <B>NB:</B> Promotions usually run for 7 days. {'\n'}You can promote
          again once the period elapses.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    padding: 20,
    paddingBottom: 200,
  },

  instructionsContainer: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    height: 250,
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
    color: 'black',
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
});
