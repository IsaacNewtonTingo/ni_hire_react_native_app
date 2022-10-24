import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Feather from 'react-native-vector-icons/Feather';

const NoNet = ({onRefresh}) => {
  return (
    <View style={styles.container}>
      <Feather name="wifi-off" size={35} color="#383838" />

      <Text style={{fontSize: 18, color: '#383838', paddingVertical: 15}}>
        No internet connection
      </Text>

      <Pressable
        onPress={onRefresh}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Feather name="refresh-cw" size={18} color="black" />
        <Text style={{fontSize: 18, paddingVertical: 15, marginLeft: 5}}>
          Try again
        </Text>
      </Pressable>
    </View>
  );
};

export default NoNet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
