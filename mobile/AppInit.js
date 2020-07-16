/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react';

import Cover from './src/screens/Cover'
import Login from './src/screens/Login'
import HomeStack from './src/navigation/HomeStack'
// import MainTab from './src/navigation/MainTab'
import {APIURL} from './src/supports/ApiUrl'
import {KeepLogin,LoadTransaction} from './src/redux/actions'
import { connect } from 'react-redux';
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';


const AppInit = ({User,KeepLogin}) => {

  const [loading,setloading] = useState(true)

  useEffect(()=>{
    console.log('didmount appinit')

    callBack()

  },[])

  const callBack=async()=>{
    try{
        // await AsyncStorage.removeItem('jamboree_token')
        // check login
        var token=await AsyncStorage.getItem('jamboree_token')
        // console.log(id)
    
        if(token){
            console.log('authenticating token')
            Axios.get(`${APIURL}/users/keeplogin`,{
              headers:{
                'Authorization': `Bearer ${token}`
              }
            })
            .then(async (res)=>{
                // console.log(res.data)
                if(res.data){
                var data={
                    username: res.data.username,
                    role: res.data.role,
                    id: res.data.id
                }
                KeepLogin(data)
                await AsyncStorage.setItem('jamboree_token',res.data.token)
                // loadtransaction already in keeplogin
                // console.log('loading transaction')
                // props.LoadTransaction(res.data.id)
              }
            }).catch((err)=>{
              console.log(err)
            }).finally(()=>{
              setloading(false)
            })
        }
    }catch(err){
        console.log(err)
    }
  }

  if(loading){
    return <Cover/>
  }

  return (
      User.isLogin?
      <HomeStack/>
      :
      <Login/>
  )
  
          
};


const MapstatetoProps=(state)=>{
  return {
    User: state.Auth
  }
}

export default connect (MapstatetoProps,{KeepLogin,LoadTransaction}) (AppInit);
