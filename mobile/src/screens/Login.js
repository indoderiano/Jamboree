import React, {useReducer, useState} from 'react';
import {connect} from 'react-redux'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ProgressBarAndroid,
} from 'react-native';

import {ProgressBar} from '@react-native-community/progress-bar-android'

import Modal from 'react-native-modal'

import {
  Button,
  ThemeContext,
  getTheme,
  COLOR
} from 'react-native-material-ui'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {MyTextField} from '../components/material-ui'
import {TextField} from 'react-native-material-textfield'
import {stylesCall} from '../supports/Styles'

import {Login as actionLogin} from '../redux/actions'


const reducers=(state,action)=>{
  switch(action.type){
    case 'CHANGE':
      return {...state,...action.payload}
    default:
      return state
  }
}


const Login = (props) => {

  const [state,dispatch] = useReducer(reducers,{passhidden:true})

  const [username,setusername] = useState('')

  const [password,setpassword] = useState('')

  return (
    <View style={styles.container}>
        
        <Text style={[styles.title,stylesCall.ubuntuMedium]}>Login</Text>

        <View style={styles.inputbox}>
            <Icon name='account-circle' size={35} style={styles.inputicon}/>
            <MyTextField 
              label='Username'
              containerStyle={{flex:1}}
              inputContainerStyle={{paddingRight:35}}
              onChangeText={(text)=>{setusername(text)}}
              
              // fontSize={18}
            />
            {/* <Icon name='close-circle' style={styles.endinputicon}/> */}
        </View>

        <View style={styles.inputbox}>
            <Icon name='key' size={35} style={styles.inputicon}/>
            <MyTextField 
              label='Password'
              containerStyle={{flex:1}}
              inputContainerStyle={{paddingRight:35}}
              secureTextEntry={state.passhidden}
              onChangeText={(pass)=>{setpassword(pass)}}
            />
            <Icon 
              name='eye' 
              style={styles.endinputicon}
              color={state.passhidden?'rgba(0,0,0,.4)':'rgba(0,0,0,.75)'}
              onPress={()=>{dispatch({type:'CHANGE',payload:{passhidden:!state.passhidden}})}} 
            />
        </View>

        <TouchableOpacity style={{width:'100%',marginTop:40,paddingVertical:5}}>
            <Button 
              primary 
              raised 
              text='Login' 
              style={buttonProps}
              onPress={()=>{props.actionLogin(username,password)}}
              disabled={props.User.loading}
              // disabled
            />
        </TouchableOpacity>

        {/* <View style={{width:'100%',paddingVertical:5}}>
            <Button 
              raised 
              text='Register' 
              style={buttonProps}
            />
        </View> */}

        <Modal isVisible={props.User.loading}>
          <View>
            {/* <ProgressBar /> */}
            {/* <ProgressBar styleAttr="Horizontal" /> */}
            <ProgressBarAndroid/>
          </View>
        </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop:50,
    paddingHorizontal:20,
    // fontFamily:'serif'
  },
  title: {
    fontSize:35,
    color:'rgba(0,0,0,.75)',
    marginRight:'auto',
    letterSpacing: 1,
    // fontFamily:'ubuntu'
    // marginLeft:20
  },
  inputbox:{
    flexDirection:'row',
    // paddingHorizontal:20,
    marginTop:10
  },
  inputicon: {
    marginTop:'auto',
    marginBottom:10,
    paddingRight:15,
    color:'rgba(0,0,0,.75)',
  },
  endinputicon: {
    position:'absolute',
    bottom:18,
    right:0,
    fontSize:20,
    // color: 'rgba(0,0,0,.75)'
  },
  
});

const buttonProps={
  container:{height:50},
  text:{fontWeight:'900',letterSpacing:1}
}

const MapstatetoProps=(state)=>{
  return {
    User: state.Auth
  }
}


export default connect (MapstatetoProps,{actionLogin}) (Login);
