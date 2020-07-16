import React, { Component } from 'react'
import {Grid,Paper,Typography,Container,Box,withStyles,CircularProgress} from '@material-ui/core'
import {MyButton} from '../components/material-ui'
import {compose} from 'redux'
import { connect } from 'react-redux';
import {KeepLogin} from '../redux/actions'
import Axios from 'axios'
import {APIURL} from '../supports/ApiUrl'



const styles = (theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        // backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        boxShadow: 'unset',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.5)',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
        marginTop: '3em',
      },
      // fontWeight: '100'
    },
    
  })



class Verification extends Component {
    state = { 
        loading: false,
        message: ''
     }

    componentDidMount=()=>{
        // console.log(this.props.match.params.tokenid)
        Axios.put(`${APIURL}/users/verify`,{},{
            headers:{
                'Authorization': `Bearer ${this.props.match.params.tokenid}`
            }
        }).then((res)=>{
            this.props.KeepLogin(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    onResend=()=>{
        this.setState({loading:true})
        var token=localStorage.getItem('jamboree_token')
        Axios.post(`${APIURL}/users/resend`,{},{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }).then((res)=>{
            this.setState({loading:false,message:'Resend email succeed'})
        }).catch((err)=>{
            console.log(err)
        })
    }


    render() { 
        const {classes}=this.props
        return ( 

            <div>
                <Paper 
                    square
                    className={classes.mainFeaturedPost} 
                    style={{overflow:'hidden'}}
                    
                >
                    
                    {/* <img 
                        style={{ width:'100%',position:'absolute',bottom:'0%',left:'50%',transform:'translate(-50%,-0%)'}} 
                        // src={this.props.Store.storeimage}
                        // alt={mainFeaturedPost.imageText} 
                    /> */}
                    <div className={classes.overlay} />

                    <Grid container style={{margin:'56px 0 0'}}>
                        <Grid item xs={12} sm={6} md={6}>
                        <div className={classes.mainFeaturedPostContent}>
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                Verification
                            </Typography>
                            {/* <Typography variant="h5" color="inherit" paragraph style={{fontWeight:'300'}}>
                                Deskripsi
                            </Typography>
                            <Link variant="subtitle1" href="#">
                                other
                            </Link> */}
                        </div>
                        </Grid>
                    </Grid>
                </Paper>


                <Container style={{background:'white',padding:'0 5vw'}} maxWidth="lg">

                    <Paper elevation={2} style={{padding:'1em',display:'inline-block',marginBottom:'1em'}}>
                        <Typography style={{fontSize:'21px',marginBottom:'1em'}}>
                            {
                                this.props.User.isVerified?
                                'Your account is verified'
                                :this.props.User.isLogin?
                                `Your account has not been verified`
                                : null
                            }
                        </Typography>
                        <Typography>
                            <i className="fas fa-check" style={{color:'green',marginRight:'.5em',fontSize:'24px'}}></i>
                            {
                                this.props.User.isVerified?
                                null
                                :this.props.User.isLogin?
                                `A verification link has been sent to your Email, please click the link to verify your account`
                                :
                                'Please Register'
                            }
                        </Typography>
                    </Paper>
                    {
                        this.props.User.isLogin&&!this.props.User.isVerified?
                        <Box>
                            <MyButton 
                                // endIcon={
                                // <i style={{fontSize:'12px'}} className="fas fa-shopping-cart"></i>
                                // } 
                                disabled={this.state.loading}
                                variant="contained" 
                                color='primary' 
                                size="small" 
                                className='home-btnss' 
                                style={{fontSize:'15px',padding:'.5em 1em',marginBottom:'.5em'}}
                                onClick={this.onResend}
                            >
                                Resend verification email
                                {
                                    this.state.loading?
                                    <Box
                                        style={{
                                            position:'absolute',
                                            top:'50%',
                                            left:'50%',
                                            transform:'translate(-50%,-50%)',
                                            display:'flex',
                                            justifyContent:'center',
                                            alignItems:'center'
                                        }}
                                    >
                                        <CircularProgress 
                                            size={20} 
                                        />
                                    </Box>
                                    : null
                                }
                            </MyButton>
                            <Typography>
                                {this.state.message}
                            </Typography>
                        </Box>
                        : null
                    }
                    
                </Container>

            </div>

         );
    }
}


const MapstatetoProps=(state)=>{
    return {
        User:state.Auth,
    }
}
 
export default compose(connect(MapstatetoProps,{KeepLogin}), withStyles(styles,{withTheme:true})) (Verification);
 