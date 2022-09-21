import {Text, Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';

const A = props => <Text style={styles.textLink}>{props.children}</Text>;

export default function EmailVerificationScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.leadIMG}
        source={require('../assets/images/email.png')}
      />

      <View style={[styles.longLine, {marginBottom: 20}]} />

      <Text style={[styles.text, {fontSize: 18, textAlign: 'center'}]}>
        If the email provided belongs to you, check your <A> inbox</A> for a
        <A> confirmation link</A> to verify your email then come back and
        <A> login</A> . {'\n'} The link expires in 6 hrs
      </Text>

      <View style={[styles.longLine, {marginBottom: 20}]} />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 10,
    flex: 1,
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
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
  leadIMG: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'SourceSansPro-Regular',
    color: 'black',
  },
});
