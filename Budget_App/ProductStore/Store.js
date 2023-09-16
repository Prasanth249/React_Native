import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';



const persistConfig = {
  key: 'root',
  storage: AsyncStorage,

};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);


