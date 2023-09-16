import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import {Database} from '../DataBase/DataBase';

function Favorite() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    Database.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM contactsdetails where favorite= true',
        [],
        (tx, res) => {
          console.log('your favorite persion');
          var temp = [];
          console.log(res);
          console.log(res.rows.length);
          let i = 0;
          while (i < res.rows.length) {
            temp.push(res.rows.item(i));
            ++i;
          }
          setContacts(temp);
        },
      );
    });
  }, []);

  console.log(contacts);
  return (
    <ImageBackground source={require('../Images/background.png')} style={style.backgroundImage}>
      {contacts.map((item, index) => (
        <View style={style.container} key={index}>
          <Text style={style.text}>Name: {item.name}</Text>
          <Text style={style.text}>PhoneNumber: {item.number}</Text>
        </View>
      ))}
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  container: {
   // backgroundColor: 'lightgrey',
    marginTop: 20,
    padding: 10,
  
  },
  text: {
    marginLeft: 70,
    fontSize: 20,
    color: '#fff'
  },
  backgroundImage:{
    flex: 1,  
    height: null,
    width: null
  }
});

export default Favorite;
