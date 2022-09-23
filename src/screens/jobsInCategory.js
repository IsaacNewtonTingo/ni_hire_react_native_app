import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

export default function JobsInCategories({route, navigation}) {
  const [jobsList, setJobsList] = useState([]);
  const [noData, setNoData] = useState(false);

  const [loading, setLoading] = useState(true);
  const categoryID = route.params.categoryID;

  useEffect(() => {
    getJobs();
  }, []);

  async function getJobs() {
    const url = process.env.GET_JOBS_IN_A_CATEGORY + categoryID;
    await axios
      .get(url)
      .then(response => {
        if (response.data.status == 'Failed') {
          setNoData(true);
          setLoading(false);
        } else {
          setJobsList(response.data.data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }

  // function Capitalize(str) {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // }

  // if (loading) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         backgroundColor: 'black',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}>
  //       <ActivityIndicator color="white" size="large" />
  //       <Text style={{color: 'white', fontWeight: '700', marginTop: 10}}>
  //         Loading data
  //       </Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      {noData == false ? (
        <FlatList
          data={jobsList}
          renderItem={({item}) => (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('JobMembers', {
                    serviceName: item.serviceName,
                  })
                }
                style={styles.jobTitleContainer}
                key={item._id}>
                <Text
                  style={{
                    fontWeight: '700',
                    color: 'white',
                  }}>
                  {item.serviceName}
                </Text>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={15}
                  color="gray"
                />
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: 0.3,
                  borderColor: '#262626',
                  marginVertical: 5,
                }}
              />
            </>
          )}
        />
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text
            style={{
              color: 'white',
              fontWeight: '700',
              textAlign: 'center',
            }}>
            No jobs available for the selected category
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  jobTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
});
