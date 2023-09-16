import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import {useIsFocused, useRoute} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import {productAdd} from '../ProductStore/actions';

function CreateProduct({navigation}) {
  const [productName, setProductName] = useState('');
  const [plannedAmount, setPlannedAmount] = useState('');
  const [actualAmount, setActualAmount] = useState('');

  const dispatch = useDispatch();
   const onfocus =useIsFocused(); 
   
   useEffect(() => {
   
  }, [onfocus]);
  const handleClick = () => {
    if (productName != '' && plannedAmount != '' && actualAmount != '') {
      // if ( actualAmount > plannedAmount) {
      //   Alert.alert('Actual  amount should be less than the planned amount')
      // } else {

        dispatch(productAdd(productName, plannedAmount, actualAmount));
       
        setActualAmount(''),
        setPlannedAmount(''),
        setProductName('')  
        Alert.alert('Product Details added');
      // }
    } else if (productName != '' || plannedAmount != '' || actualAmount != '') {
      if(productName != '' && plannedAmount != '' && actualAmount != ''){
        console.log('clicked the button');
        Alert.alert('Need to enter all fields');
      }
      else{
        Alert.alert('Need to enter all fields');
      }
     
    }
  };
  
  return (
    <ImageBackground
      source={require('../Images/BackGround_Image.jpg')}
      style={styles.imageBackGround}>
      <Text style={styles.textStyle}>Budget Entry</Text>

      <Text style={styles.text}>Product Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={product_name => setProductName(product_name)}
        value={productName}
      />
      <Text style={styles.text}>planned Amount:</Text>
      <TextInput
        style={styles.input}
        onChangeText={planned_amount => setPlannedAmount(planned_amount)}
        keyboardType="numeric"
        value={plannedAmount}
      />
      <Text style={styles.text}>Actual Amount:</Text>
      <TextInput
        style={styles.input}
        onChangeText={actual_Amount => setActualAmount(actual_Amount)}
        keyboardType="numeric" 
     value={actualAmount}
      />
      <TouchableOpacity
        onPress={() => handleClick()}
        style={styles.saveButtonBackground}>
        <Text style={styles.saveButton}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Products')}
        style={styles.allPRoductsBackGround}>
        <Text style={styles.allPRoducts}>All Products</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackGround: {
    flex: 1,
    height: null,
    width: null,
  },
  textStyle: {
    fontSize: 40,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: '700',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 20,
    left: 100,
    top: 30,
    fontSize: 20,
    textAlign: 'center',
  },
  saveButton: {
    // marginTop: 20,
    // padding: 10,
    textAlign: 'center',
    fontSize: 20,
    marginTop: 3,
  },
  text: {
    top: 30,
    left: 110,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  allPRoducts: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 20,
  },
  saveButtonBackground: {
    width: 140,
    marginLeft: 140,
    height: 35,
    top: 50,
    borderRadius: 10,
    backgroundColor: '#87CEEB',
    textAlign: 'center',
  },
  allPRoductsBackGround: {
    top: 230,
    borderWidth: 1,
    borderRadius: 20,
    width: 150,
    height: 40,
    backgroundColor: '#DDA0DD',
    left: 20,
  },
  // textAmount: {

  //   fontWeight: 'bold',
  //   fontSize: 15,
  //   color: '#fff',
  // },
  // textName: {

  //   fontWeight: 'bold',
  //   fontSize: 15,
  //   color: '#fff',
  // },
});

export default CreateProduct;
