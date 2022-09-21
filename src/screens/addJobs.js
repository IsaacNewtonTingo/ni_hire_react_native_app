import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';

const {width} = Dimensions.get('window');

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AddJobs = () => {
  const [category, setCategory] = useState();
  const [service, setService] = useState();

  const [disabled, setDisabled] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  async function sendToDB() {
    setIsPosting(true);
    setDisabled(true);
    await axios
      .post('https://5a55-41-80-96-149.eu.ngrok.io/app/service/add-category', {
        categoryName: category,
      })
      .then(response => {
        console.log(response.data);
        setIsPosting(false);
        setDisabled(false);
        setCategory('');
      })
      .catch(err => {
        console.log(err);
        setIsPosting(false);
        setDisabled(false);
      });
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <View style={{backgroundColor: '#1a1a1a', padding: 20, flex: 1}}>
        <View>
          <MaterialIcons
            style={styles.icons}
            name="description"
            size={20}
            color="#ff6600"
          />
          <TextInput
            placeholderTextColor="gray"
            placeholder="category"
            style={styles.input}
            value={category}
            onChangeText={setCategory}
          />
        </View>

        {/* <View>
          <MaterialIcons
            style={styles.icons}
            name="dock"
            size={20}
            color="white"
          />
          <TextInput
            placeholderTextColor="gray"
            placeholder="Sevice"
            style={styles.input}
            value={service}
            onChangeText={setService}
          />
        </View> */}
      </View>

      <TouchableOpacity
        disabled={disabled}
        onPress={sendToDB}
        style={styles.addButton}>
        {isPosting ? (
          <ActivityIndicator color="white" size="small" animating />
        ) : (
          <Text style={styles.btnText}>Submit</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddJobs;

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
