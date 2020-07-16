import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux'
import {Switch,Button,CssBaseline,Link,Grid,Box,Typography,Container,Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {MyTextField} from './../components/material-ui'
import {Register} from '../redux/actions'
import { Redirect } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    boxShadow: 'unset'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
      marginTop: '4em'
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp=(props)=>{
  const classes = useStyles();
  const [isSeller,setisSeller] = useState (false)
  const [inputUser,setinputUser] = useState({
    username: '',
    password: '',
    confirm: '',
    role: isSeller?'seller':'user'
  })
  const [inputStore,setinputStore] = useState({
    storename: '',
    storeimage: ''
  })
  const [message,setmessage] = useState('')


  const onSubmit=(e)=>{
    e.preventDefault()
    var user={
      username: inputUser.username,
      password: inputUser.password,
      role: isSeller?'seller':'user',
      // storename: inputStore.storename,
      // storeimage: inputStore.storeimage
    }
    var store={
      storename: inputStore.storename,
      storeimage: inputStore.storeimage
    }
    if(inputUser.username===''){
      setmessage('username masih kosong')
    }else if(inputUser.password===''){
      setmessage('password masih kosong')
    }else if(inputUser.confirm===''){
      setmessage('confirm your password')
    }else if(inputUser.confirm!==inputUser.password){
      setmessage('confirm password tidak sama')
    }else if(isSeller){
      if(inputStore.storename===''){
        setmessage('storename masih kosong')
      }else if(inputStore.storeimage===''){
        setmessage('storeimage masih kosong')
      }else{
        props.Register(user,store)
      }
    }else {
      props.Register(user,store)
    }
  }

  

  return (
    <Box>
      <Paper 
          square
          className={classes.mainFeaturedPost} 
          style={{overflow:'hidden'}}
      >
          
          <img 
              style={{ width:'100%',position:'absolute',top:'40%',left:'50%',transform:'translate(-50%,-50%)'}} 
              // src='https://source.unsplash.com/random'
              // alt={mainFeaturedPost.imageText} 
          />
          <div className={classes.overlay} />

          <Grid container style={{margin:'56px 0 0'}}>
              <Grid item xs={12} sm={6} md={6}>
              <div className={classes.mainFeaturedPostContent}>
                  <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                      Register
                  </Typography>
              </div>
              </Grid>
          </Grid>
      </Paper>


      <Container component="main" maxWidth="xs" style={{padding:'0px 0 64px'}}>
        
        <CssBaseline />
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <MyTextField
                  // autoComplete="fname"
                  // name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  // id="firstName"
                  label="Username"
                  size='small'
                  autoFocus
                  onChange={(e)=>{setinputUser({...inputUser,username:e.target.value})}}
                  value={inputUser.username}
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  variant="outlined"
                  required
                  fullWidth
                  type='password'
                  label="Password"
                  size='small'
                  onChange={(e)=>{setinputUser({...inputUser,password:e.target.value})}}
                  value={inputUser.password}
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  variant="outlined"
                  required
                  fullWidth
                  type='password'
                  label="Confirm password"
                  size='small'
                  onChange={(e)=>{setinputUser({...inputUser,confirm:e.target.value})}}
                  value={inputUser.confirm}
                />
              </Grid>
              <Grid item xs={12}>
                  <Box component='span'>
                      Are you registering your shop?
                  </Box>
                  <Switch
                      checked={isSeller}
                      onChange={()=>{setisSeller(!isSeller)}}
                      // name="checkedA"
                      // InputProps={{ 'aria-label': 'primary checkbox' }}
                      color='primary'
                  />
                  <Box component='span'>{isSeller?'(yes)':'(no)'}</Box>
              </Grid>
              {
                isSeller?
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <MyTextField
                      variant="outlined"
                      required
                      fullWidth
                      // id="lastName"
                      label="Store name"
                      size='small'
                      // name="lastName"
                      // autoComplete="lname"
                      onChange={(e)=>{setinputStore({...inputStore,storename:e.target.value})}}
                      value={inputStore.storename}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MyTextField
                      variant="outlined"
                      required
                      fullWidth
                      // id="lastName"
                      label="Store image (url)"
                      size='small'
                      // name="lastName"
                      // autoComplete="lname"
                      onChange={(e)=>{setinputStore({...inputStore,storeimage:e.target.value})}}
                      value={inputStore.storeimage}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box component='img' src={inputStore.storeimage} width='100%'/>
                  </Grid>
                </Grid>
                : null
              }

              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Box component='p' color='red'>{message}</Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
              disabled={props.User.loading}
            >
              Sign Up
            </Button>
            {/* <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
        {
          props.User.isLogin?
          <Redirect to='/'/>
          : null
        }
      </Container>

    </Box>
    
  );
}


const Mapstatetoprops=(state)=>{
  return {
    User: state.Auth
  }
}



export default connect(Mapstatetoprops,{Register}) (SignUp);