import React from 'react';
import { Text, View, ImageBackground, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

function AllProducts() {
  let data = useSelector(state => state.Reducer);

  const header = ['Product Name', 'Planned Amount', 'Actual Amount'];

  console.log(data);

  const renderItem = ({ item }) => (
    <View style={[styles.row, styles.dataRow]}>
      <View style={styles.cell}>
        <Text style={styles.text}>{item.productName}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.text}>{item.plannedCost}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.text}>{item.originalCost}</Text>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../Images/BackGround_Image.jpg')}
      style={styles.imageBackGround}>
      <View style={styles.container}>
        <View style={[styles.row, styles.headerRow]}>
          {header.map((item, index) => (
            <View key={index} style={styles.cell}>
              <Text style={[styles.text, styles.headerText]}>{item}</Text>
            </View>
          ))}
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: 400,
    marginLeft: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerRow: {
    borderBottomWidth: 1,
    borderColor: '#000000',
    paddingBottom: 10,
  },
  dataRow: {
    borderTopWidth: 1,
    borderColor: '#000000',
    paddingTop: 10,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: 'black',
  },
  headerText: {
    fontWeight: 'bold',
  },
  imageBackGround: {
    flex: 1,
    height: null,
    width: null,
  },
});

export default AllProducts;
