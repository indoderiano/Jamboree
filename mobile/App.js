/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react';
import {createStore,applyMiddleware} from 'redux'
import {Provider,connect} from 'react-redux'
import Thunk from 'redux-thunk'
import reducers from './src/redux/reducers'
import {NavigationContainer} from '@react-navigation/native'

import {
  ThemeContext,
  getTheme,
  COLOR
} from 'react-native-material-ui'

import AppInit from './AppInit'


const theme={
  palette: {
    primaryColor: COLOR.orange500,
    accentColor: COLOR.blueGrey400
  },
  fontFamily: 'serif',
  button: {
    container: {
      // height:50
      borderRadius: 3
    },
    text: {
      fontFamily: 'Ubuntu-Light'
      // color: 'rgba(0,0,0,.75)' // if primary is true, then this has no effect
    }
  }
}


const store=createStore(reducers,{},applyMiddleware(Thunk))

const App = () => {

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={getTheme(theme)}>
        <NavigationContainer>
          <AppInit/>
        </NavigationContainer>
      </ThemeContext.Provider>
    </Provider>
  );
};



export default App;
