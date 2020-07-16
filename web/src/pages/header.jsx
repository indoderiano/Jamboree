import React, { useState, useEffect } from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import {Icon,Container,Box,TextField,InputAdornment,Typography,Fade,Button,Tooltip,Popper,Grow,Paper,Badge} from '@material-ui/core'
// import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import { Link,useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import {Login,Logout,EstablishStore} from '../redux/actions'


const useStyles = makeStyles({
  root: {
    // width: '100%',
    // margin: 'auto',
    // textAlign: 'right'
    justifyContent: 'space-between',
    // padding: '10px 0',
    background: 'none',
    '& *': {
      flex: 'unset',
      zIndex: '1'
    },
    // label style
    '& .MuiBottomNavigationAction-root': { 
      color: 'white',
      padding: '30px 12px 15px',
      '& .MuiBottomNavigationAction-label': { 
        // marginLeft: '1em',
        fontSize: '15px',
        letterSpacing: '3px',
        fontWeight: '400'
      }
    },
    // label style when selected
    '& .MuiBottomNavigationAction-root.Mui-selected': {
      color: 'orange'
    },
    // '& .MuiTouchRipple-root': {
    //   display: 'none'
    // },
  },
  child: {
    flex: 'unset'
  },
  badge: {
    '& .MuiBadge-badge': {
      // border: '2px solid white'
      // width:'19px',
      // height:'19px',
      minWidth:'12px',
    }
  }
});

const disableEffect = makeStyles({
  root: {
    '& .MuiTouchRipple-root': {
      display: 'none'
    },
    cursor: 'unset',
    maxWidth: 'unset'
  }
})


const LoginTextField = withStyles({
  root: {
    background: 'white',
    borderRadius: '4px',
    transform: 'scale(.75)',
    width: '250px',
    '& label.Mui-focused': {
      color: 'rgba(0,0,0,.4)',
      // fontWeight: '700',
      // letterSpacing: '2px'
    },
    // padding before icon
    '& .MuiOutlinedInput-adornedStart': {
      padding: '0 0 0 7px'
    },
    '& .MuiInputBase-input': {
      fontSize: '17px'
    },
    // label
    '& .MuiFormLabel-root': {
      fontSize: '17px',
      // color: 'white'
    },
    // label state initial
    '& .MuiInputLabel-shrink': {
      transform: 'translate(44px,12px) scale(1)',
    },
    // label state on focus
    '& .MuiInputLabel-outlined.Mui-focused': {
      transform: 'translate(44px,12px) scale(0)',
    },
    // label state when input is filled
    '& .MuiFormLabel-filled': {
      transform: 'translate(44px,12px) scale(0)',
    },
    '& .PrivateNotchedOutline-root-82': {
      top: '0',
      border: '0px'
    },
    // '& .MuiInput-underline:after': {
    //   borderBottomColor: 'orange',
    // },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '0px'
      },
      // '&:hover fieldset': {
      //   borderColor: 'rgba(0,0,0,.4)',
      //   transition: 'all .2s ease'
      // },
      // '& input': {
      //     // fontSize: '9px'
      // },
      // '&.Mui-focused fieldset': {
      //   borderColor: 'rgba(0,0,0,.4)',
      //   borderWidth: '0px'
      // },
      // legend border-top width
      // '&.Mui-focused fieldset .PrivateNotchedOutline-legendLabelled-262': {
      //     fontSize: '10.5px'
      // },
      // '& .MuiInputBase-input': {
      //   background: 'white'
      // }
    },
  },
})(TextField);

export const Header=({User,Login,Logout,Store,Transaction,EstablishStore})=>{
  const classes = useStyles();
  const noEffect = disableEffect()
  const [value, setValue] = useState();
  const [login,setlogin] = useState(false)
  const location = useLocation() //get path 
  // console.log(location.pathname)
  const [username,setusername] = useState('')
  const [password,setpassword] = useState('')
  // const [message,setmessage] = useState('')

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    // console.log(event.currentTarget)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  useEffect(()=>{
    // EstablishStore()
    // console.log('header didupdate')
    // console.log(User.id)
    if(User.id){
      // console.log(User.id)
      EstablishStore(User.id)
    }

    // when login succesful, it has to clear the input username and password
    setusername('')
    setpassword('')
    // also default state
    setlogin(false)
  },[User.id])

  const submit=()=>{
    Login(username,password)
    // if(username===''){
    //   setmessage('username belum diisi')
    //   // console.log('belum diisi')
    // }else if(password===''){
    //   setmessage('password belum diisi')
    // }else {
    //   Login(username,password)
    // }
  }


  return (
    // <Container maxWidth="lg">
    <div 
      // className='shadow' 
      
      // style={
      //   location.pathname==='/'?
      //   null
      //   :
      //   {overflow:'hidden',position:'relative'}
      // }

      style={{position:'absolute',top:'0',width:'100%'}}
      className='header-small'
    >
      {/* <Box
        style={{position:'absolute',top: '30%',transform:'translate(0,-50%)'}}
        component='img' 
        src='https://source.unsplash.com/random' 
        width='100%'
      /> */}
    <Container maxWidth='lg'>
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        if(newValue!=='nochange'){
          setValue(newValue);
        }
        // console.log(newValue)
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction component={Link} to='/' style={{marginRight:'auto'}} label="Home" 
        // icon={<i className='fab fa-flickr'/>} 
      />

      {/* Store */}
      {
        User.role==='seller'?
        <BottomNavigationAction component={Link} to='/store' label={Store.storename} icon={<Icon style={{marginRight:'.2em'}}>store</Icon>} />
        :
        null
      }

      {/* Cart */}
      {
        User.isLogin?
        <BottomNavigationAction 
          component={Link} 
          to='/bag' 
          label={
            Transaction.totalQty?
            <Badge 
              badgeContent={<span style={{marginLeft:'1.5px',color:'white',fontSize:'14px'}}>{Transaction.totalQty}</span>} 
              color='primary' 
              className={classes.badge}
            >Bag</Badge>
            :
            'Bag'
          } 
          icon={<i style={{marginRight:'.3em'}} 
          className="fas fa-shopping-cart"></i>} 
        />
        : null
      }
        
      

      {/* Login Input */}
      {
        login&&!User.isLogin?
        <BottomNavigationAction value='nochange' className={noEffect.root} component='span' label={
          <span>
            <LoginTextField
              label='username'
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>account_circle</Icon>
                    {/* <AccountCircle /> */}
                  </InputAdornment>
                ),
              }}
              // InputLabelProps={{
              //     shrink: true,
              // }}
              variant="outlined"
              size='small'
              // color='white'
              style={{transformOrigin:'90% 50%'}}
              onChange={(e)=>{setusername(e.target.value)}}
              value={username}
            />
            <LoginTextField
              label='password'
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>vpn_key</Icon>
                    {/* <AccountCircle /> */}
                  </InputAdornment>
                ),
              }}
              // InputLabelProps={{
              //     shrink: true,
              // }}
              variant="outlined"
              size='small'
              // color='white'
              style={{transformOrigin:'10% 50%'}}
              onChange={(e)=>{setpassword(e.target.value)}}
              value={password}
              onKeyPress={(e)=>{if(e.key==='Enter'){submit()}}}
            />
            {
              User.message?
              <Typography 
                component='span'
                style={{
                  position:'absolute',
                  top: '115%',
                  left: '50%',
                  background: 'white',
                  color: 'red',
                  fontSize: '12px',
                  letterSpacing: '0px',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  boxShadow: '0px 1px 15px black'
                }}
                className='pointed'
              >
                {User.message}
              </Typography>
              : null
            }
          </span>
        } 
        />
        : !User.isLogin?
        <BottomNavigationAction 
          value='nochange'
          component='span' 
          label="Login" 
          onClick={()=>{setlogin(true)}}
          // icon={<i className='fab fa-flickr'/>} 
          // className={noEffect.root}
        />
        : null
      }

      {
        User.isLogin?
        <BottomNavigationAction 
          value='nochange' 
          className={noEffect.root} 
          component='span' 
          style={{cursor:'pointer'}}
          onMouseEnter={handleClick}
          onMouseLeave={handleClose}
          label={
            <Box>
              <Typography 
                component={'span'} 
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                style={{paddingBottom:'.5em',fontSize:'15px',cursor:'pointer'}}
              >
                Hi, {User.username}
              </Typography>

              <Popper 
                open={Boolean(anchorEl)} 
                anchorEl={anchorEl} 
                style={{
                  backgroundColor:'white',
                  borderRadius:'3px'
                }}
              >
                <Paper 
                  style={{padding:'.3em 0'}}
                >
                  <Button
                    style={{padding:'.5em 1em'}}
                    onClick={()=>{Logout();setAnchorEl(null)}}
                  >
                    <Typography style={{fontSize:'14px'}}>Sign out</Typography>
                  </Button>
                </Paper>
              </Popper>

              {/* <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu> */}
              
              {/* <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu> */}
            </Box>
            
            // <Tooltip 
            //   title={
            //     <Popper 
            //       open={true} 
            //       role={undefined} 
            //       // transition 
            //       disablePortal 
            //       placement='bottom-end'
            //     >
            //       <Paper>
            //           <MenuList style={{margin:'0',padding:'0',top:'0'}}>
            //             <MenuItem>Profile</MenuItem>
            //             <MenuItem>Logout</MenuItem>
            //           </MenuList>
            //       </Paper>
            //     </Popper>
            //   } 
            //   placement='bottom-start'
            //   interactive
            //   // style={{backgroundColor:'white'}}
            // >
            //   <p>Hi, {User.username}</p>
            // </Tooltip>
          }
        />
        : null
      }

      {
        User.isLogin?
        null
        :
        <BottomNavigationAction component={Link} to='/register' label="Sign Up" 
          // icon={<LocationOnIcon 
        />
      }
    </BottomNavigation>
    </Container>
    {/* </Container> */}
    </div>
  );
}

const MapstatetoProps=(state)=>{
  return {
    User: state.Auth,
    Store: state.Store,
    Transaction: state.Transaction
  }
}

export default connect(MapstatetoProps,{Login,Logout,EstablishStore})(Header);