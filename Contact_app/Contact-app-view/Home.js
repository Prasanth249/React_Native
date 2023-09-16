import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  TextInput,
} from 'react-native';
import { Database } from '../DataBase/DataBase';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useIsFocused } from '@react-navigation/native';

function Home({ navigation }) {
  const [contactDetails, setContactDetails] = useState([]);
  const [search, setSearch] = useState('');
  const isFocused = useIsFocused();
  console.log('Hello', search);

  const getData = () => {
    Database.transaction(txn => {
      txn.executeSql('SELECT * FROM contactsdetails', [], (tx, res) => {
        var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
        setContactDetails(temp);
      });
    });
  };

  function filterContacts() {
    if (search !== '') {
      Database.transaction(txn => {
        txn.executeSql(
          'SELECT * FROM contactsdetails WHERE name LIKE ?',
          [`${search}%`],
          (tx, res) => {
            var temp = [];
            for (let i = 0; i < res.rows.length; ++i) {
              temp.push(res.rows.item(i));
            }
            setContactDetails(temp);
          }
        );
      });
    } else {
      getData();
    }
  }

  useEffect(() => {
    getData();
  }, [isFocused]);

  function deleteContact(id) {
    Database.transaction(txn => {
      txn.executeSql(
        'DELETE FROM contactsdetails WHERE id=?',
        [id],
        (tx, res) => {
          Alert.alert('Contact is deleted');
          getData();
        }
      );
    });
  }

  const renderItem = data => (
    <View style={styles.rowFront}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('view contact', {
            contact: {
              id: data.item.id,
              name: data.item.name,
              phoneNumber: data.item.number,
              landmark: data.item.landmark,
              favorites: data.item.favorite,
              image: data.item.image,
            },
          })
        }>
        <Text style={styles.contacts}>{data.item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('updateContact', {
            data: {
              id: data.item.id,
              name: data.item.name,
              phoneNumber: data.item.number,
              landmark: data.item.landmark,
              image: data.item.image,
            },
          })
        }>
        <Image
          source={require('../Images/changes.png')}
          style={styles.deleteandFavourite}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => deleteContact(data.item.id)}>
        <Image
          source={require('../Images/delete.png')}
          style={styles.deleteandFavourite}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require('../Images/background.png')}
      style={styles.container}>
      <TextInput
        onChangeText={searchName => setSearch(searchName)}
        style={styles.searchStyle}
        placeholder="Search contact"
        clearButtonMode="always"
      />

      <TouchableOpacity
        onPress={filterContacts}
        style={styles.searchStyleButton}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>

      <SwipeListView
        data={contactDetails}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={80}
        rightOpenValue={-60}
        style={styles.swipelist}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('addContact')}>
        <Image
          source={require('../Images/plus.png')}
          style={styles.buttonImage}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => navigation.navigate('favoriteContact')}>
        <Image
          source={require('../Images/favourite.png')}
          style={styles.buttonImage}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  favoriteContact:{
    
  },
  contacts:{
    marginLeft: 125,
    fontSize: 19,
    fontWeight: 'bold',
  },
  swipelist:{
    marginTop: 10, 
   
    width:350,
    borderRadius: 10,
    marginBottom: 10,
    
   
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: null,
    width: null
  },
  addButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignContent: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  favoriteButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignContent: 'center',
    justifyContent: 'center',
    left: 20,
    bottom: 30,
  },
  buttonImage: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
  },
  rowFront: {
    height: 50,
 
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 10,
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    // paddingHorizontal: 15,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 10,
  },
  deleteandFavourite:{
    resizeMode: 'contain',
    width: 40,
    height: 40,
  },
  searchStyle:{
    backgroundColor: 'grey',
    width: 200,
     padding: 10,
    borderRadius: 15,
    fontSize: 20,
    margin: 5,
     right: 40,
     //top: 50
  },
  searchStyleButton:{
  
    left: 120,
    bottom: 50,
    backgroundColor: 'purple',
    borderRadius: 10,
    height: 45,
    width: 100

  
  },
  searchText:{
    color: '#fff',
    fontSize: 25,
    textAlign: 'center'
  }
});

export default Home;