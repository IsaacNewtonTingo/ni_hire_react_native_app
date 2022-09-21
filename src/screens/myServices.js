import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const MyServices = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.servicesContainer}>
        <Text style={{color: 'white'}}>Plumbing</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('PostService')}
        style={styles.addButton}>
        <Text style={styles.AddBtnText}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MyServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  addButton: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    shadowColor: 'white',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    right: 20,
  },
  AddBtnText: {
    color: 'black',
    fontSize: 30,
    fontWeight: '700',
  },

  servicesContainer: {
    height: 50,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: 'white',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
  },
});
