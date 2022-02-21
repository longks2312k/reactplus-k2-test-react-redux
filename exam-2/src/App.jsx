import React from 'react';
import { ListProduct } from './Components/ListUser'
import 'antd/dist/antd.css'
import './App.css';

import { createStore } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import allReducers from "./Redux";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, allReducers)

let store = createStore(persistedReducer);
let persistor = persistStore(store);

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ListProduct />
      </PersistGate>
    </Provider>
  );
}

export default App;
