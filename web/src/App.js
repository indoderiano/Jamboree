import React, { useEffect, useState, Fragment } from 'react';
import logo from './logo.svg';
import {
  createMuiTheme,
  makeStyles,
  createStyles,
  Theme as AugmentedTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import {orange} from '@material-ui/core/colors'
import {CssBaseline} from '@material-ui/core'
import {Switch, Route, Redirect} from 'react-router-dom'
import Header from './pages/header'
import Home from './pages/home'
import Register from './pages/register'
import Verification from './pages/verification'
import Store from './pages/store'
import Bag from './pages/bag'
import Checkout from './pages/checkout'
import './App.css';
import Axios from 'axios';
import {KeepLogin} from './redux/actions'
import { APIURL } from './supports/ApiUrl';
import { connect } from 'react-redux';
import verification from './pages/verification';


const theme = createMuiTheme({
  typography: {
    fontFamily: 'Ubuntu, sans-serif',
    // color:'rgba(0,0,0,.8)', //theming color does not work here
    // fontFamily: 'Maven Pro, sans-serif',
  },
  palette: {
    primary: {
      main: orange[500],
      dark: orange[800],
      // contrastText: 'white'
    },
  }
  // overrides: {
  //   MuiCssBaseline: {
  //     '@global': {
  //       '@font-face': [Ubuntu],
  //     },
  //   },
  // },
});


function App({KeepLogin,User}) {

  const [loading,setloading]=useState(true)

  useEffect(()=>{
    // check login
    console.log('keeplogin')
    var token=localStorage.getItem('jamboree_token')

    if(token){
      Axios.get(`${APIURL}/users/keeplogin`,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      .then((res)=>{
        console.log(res.data)
        if(res.data){
          KeepLogin(res.data)
          // console.log('loading transaction')
          // LoadTransaction(res.data.id)
        }
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{
        setloading(false)
      })
    }


  },[])

  
  const memberAccess=User.isVerified&&!loading

  const visitorAccess=!User.isVerified&&!loading

  return (
    <div style={{background:'white', minHeight:'100vh'}}>
      <MuiThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <Header/>

      <Switch>
        <Route path='/' exact component={Home}/>

        <Route path='/register' exact component={User.isLogin?()=><Redirect to='/'/>:Register}/>
        
        <Route path='/verification' exact component={Verification}/>
        {/* <Route path='/verification' exact component={User.isLogin?Verification:()=><Redirect to='/'/>}/> */}
        
        <Route path='/verification/:tokenid' component={Verification}/>

        <Route path='/store' exact component={visitorAccess?()=><Redirect to='/verification'/>:Store}/>
        
        <Route path='/bag' exact component={visitorAccess?()=><Redirect to='/verification'/>:Bag}/>
        
        <Route path='/checkout' exact component={visitorAccess?()=><Redirect to='/verification'/>:Checkout}/>

        <Route path='/*' component={Home}/>



        {/* FRAGMENT WILL TAKE MULTIPLE ROUTE IF PATH IS EQUAL */}
        {/* ALSO, ANY ROUTES AFTER FRAGMENT, WILL NOT RENDER */}
        {/* {
          User.isVerified?
          <Fragment>
            <Route path='/verification' exact component={Verification}/>
            <Route path='/store' exact component={Store}/>
            <Route path='/bag' exact component={Bag}/>
            <Route path='/checkout' exact component={Checkout}/>
          </Fragment>
          :User.isLogin?
          <Fragment>
            <Route path='/verification' exact component={Verification}/>
            <Route path='/*' exact component={Home}/>
          </Fragment>
          :
          <Fragment>
            <Route path='/register' exact component={Register}/>
          </Fragment>
        } */}

        {/* <Fragment>
          <Route path='/test' component={Verification}/>
        </Fragment> */}

        
        {/* <Route path='/*' component={Home}/> */}
      </Switch>


      </MuiThemeProvider>
    
    </div>
  );
}

const MapstatetoProps=(state)=>{
  return {
    User: state.Auth
  }
}

export default connect(MapstatetoProps,{KeepLogin}) (App);
