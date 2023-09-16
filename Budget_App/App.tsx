import React from 'react';
import CreateProduct from './BudgetEntry/CreateProduct';
import AllProducts from './BudgetEntry/Allproducts';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';



export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen name="home" component={CreateProduct} /> 
          <Stack.Screen name="Products" component={AllProducts} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
