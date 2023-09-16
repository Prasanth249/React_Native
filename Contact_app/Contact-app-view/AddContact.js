import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground
} from 'react-native';
 import {launchImageLibrary} from 'react-native-image-picker';
import {Database} from '../DataBase/DataBase';
//import ImagePicker from 'react-native-image-picker';


function AddContact() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('');
  const [landmark, setLandmark] = useState('');
  const favorite = false;
  useEffect(() => {
    console.log("I am :::",name, image, phoneNumber, landmark)
    Database.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='contactsdetails'",
        [],
        (tx, res) => {
          // console.log('I am in ooooo');
          console.log('item', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS contacts', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS contactsdetails(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), number INT(10), landmark VARCHAR(30), favorite BOOLEAN, image VARCHAR(200))',
              [],
            );
          } else
            () => {
              console.log('Table is created');
            };
        },
      );
    });
  }, []);

  let saveData = () => {
    if(name != '' && phoneNumber != '' ){
    Database.transaction(txn => {
      txn.executeSql(
        'INSERT INTO contactsdetails(name, number, landmark, favorite, image) VALUES (?, ?, ?, ?, ?)',
        [name, phoneNumber, landmark, favorite, image],

        (tex, res) => {
          setName('')
          setPhoneNumber('')
         
          console.log(res);
          if (res.rowsAffected == 1) {
            Alert.alert('Data added in the database');
          } else {
            console.log(res);
          }
        },
        error => {
          console.log(error);
        },
      );
    });
  }
  else if(name === '' || phoneNumber === ''){
    if(name === '' && phoneNumber === ''){
      Alert.alert("Name and Phone Number is Mandatary")
    }
    else if(name === '' && phoneNumber != ''){
      Alert.alert("Name need to be entered")
    }
    else{
      Alert.alert("Phone number need to be entered")
    }
  }
  };

   function  imageAdd() {

    let options ={
      storageOptions:{
        path:"image"
      }
    }
   launchImageLibrary(options, responce =>{
    console.log(responce)
    console.log(responce.assets[0].uri)
    setImage(responce.assets[0].uri)
   })
  }

  return (
    <ImageBackground source={require('../Images/background.png')} style={style.backgroundImage}>
      <TouchableOpacity onPress={() => imageAdd()}>
        <Image
          source={require('../Images/photo-camera.png')}
          style={style.imageSize}
        />
      </TouchableOpacity>

      <View style={style.container}>
        <Text style={style.namText}>Name: </Text>

        <TextInput
          style={style.inputText}
          onChangeText={name => setName(name)}
          placeholder="Contact name"
        />
        <Text style={style.namText}>Phone Number: </Text>
        <TextInput
          style={style.inputText}
          onChangeText={phoneNum => setPhoneNumber(phoneNum)}
          placeholder="Phone number"
        />
        <Text style={style.namText}>Landmark: </Text>
        <TextInput
          style={style.inputText}
          onChangeText={landmark => setLandmark(landmark)}
          placeholder="Landmark"
        />
      </View>
      <View>
        <TouchableOpacity style={style.text} onPress={saveData}>
          <Text style={style.button}>Save</Text>
        </TouchableOpacity>
      </View>
 </ImageBackground>
  );
}
const style = StyleSheet.create({
  backgroundImage: {
    flex: 1,  
    height: null,
    width: null
  },
  text: {
   top: 400,
   left: 300, 
   borderWidth: 2,
   borderRadius: 10,
   borderColor: 'grey',
   marginBottom: 10,  
   backgroundColor: "green"
  },
  button: {
    color: 'black',
    fontSize: 30,
    padding: 10,
    
  },
  container: {
    position: 'absolute',
    marginTop: 160,
    marginLeft: 140,
  },
  inputText: {
    // marginTop: 150,
    // marginLeft: 140,
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'lightgrey',
    fontStyle: 'italic',
    borderWidth: 0,
    borderRadius: 10,
    borderColor: 'grey',
    marginBottom: 10,
      
  },
  namText: {
    marginLeft: 5,
    fontSize: 20,
    fontStyle: 'italic',
    color: "#fff",
  
  },
  imageSize: {
    width: 120,
    height: 120,
    marginTop: 30,
    marginLeft: 150,
 
  },

});

export default AddContact;
