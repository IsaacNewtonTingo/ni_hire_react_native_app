import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const B = props => <Text style={{color: 'gray'}}>{props.children}</Text>;

export default function Support({url, children}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:+254724753175`)}>
          <LinearGradient
            style={styles.LinearGradient}
            colors={['rgba(153, 153, 102,0.8)', 'transparent']}>
            <Feather name="phone-call" color="#9999ff" size={30} />

            <View style={styles.line} />

            <Text style={styles.itemText}>
              <B>Call:</B> +254724753175
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity>
          <LinearGradient
            style={styles.LinearGradient}
            colors={['rgba(153, 153, 102,0.8)', 'transparent']}>
            <FontAwesome name="whatsapp" color="#66ff66" size={30} />

            <View style={styles.line} />

            <Text style={styles.itemText}>
              <B>WhatsApp:</B> +254724753175
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL(`mailto:nihireapp@gmail.com`)}>
          <LinearGradient
            style={styles.LinearGradient}
            colors={['rgba(153, 153, 102,0.8)', 'transparent']}>
            <Feather name="mail" color="#cc6600" size={30} />

            <View style={styles.line} />

            <Text style={styles.itemText}>
              <B>Email:</B> nihireapp@gmail.com
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL(`https://twitter.com/new_tone_tunes`)}>
          <LinearGradient
            style={styles.LinearGradient}
            colors={['rgba(153, 153, 102,0.8)', 'transparent']}>
            <AntDesign name="twitter" color="#0000ff" size={30} />

            <View style={styles.line} />

            <Text style={styles.itemText}>
              <B>Twitter:</B> @niHireApp
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              `https://www.instagram.com/new.tone.music.official/`,
            )
          }>
          <LinearGradient
            style={styles.LinearGradient}
            colors={['rgba(153, 153, 102,0.8)', 'transparent']}>
            <AntDesign name="instagram" color="#ff0000" size={30} />

            <View style={styles.line} />

            <Text style={styles.itemText}>
              <B>Instagram:</B> @nihireapp
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  innerContainer: {
    margin: 10,
    backgroundColor: '#1a1a1a',
    flex: 1,
    padding: 20,
  },

  LinearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 20,
    height: 100,
  },
  itemText: {
    color: 'white',
    fontWeight: '800',
    marginTop: 10,
    fontFamily: 'monospace',
  },
  line: {
    borderColor: '#999966',
    width: '20%',
    borderWidth: 0.2,
    marginVertical: 5,
  },
});
