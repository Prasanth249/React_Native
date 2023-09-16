/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { Text } from 'react-native'; 
import App from './App';
import {name as appName} from './app.json';

import { Provider } from 'react-redux';
import {persistor, store} from './ProductStore/Store'
import  {PersistGate} from "redux-persist/integration/react";

//loading={null} 
// const configureStore = store()
 const addRedux = () =>(
     <Provider store={store}>
         <PersistGate loading={<Text>Loading...</Text>} persistor ={persistor}>
         <App/>
         </PersistGate>
         </Provider>
       
 )


AppRegistry.registerComponent(appName, () => addRedux);


// AppRegistry.registerComponent(appName, () => App);
