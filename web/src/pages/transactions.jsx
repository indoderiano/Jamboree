import React, { Component } from 'react'
import {Grid,Paper,Typography,withStyles} from '@material-ui/core'
import {compose} from 'redux'
import { connect } from 'react-redux';



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



class Transactions extends Component {
    state = {  }
    render() { 
        const {classes}=this.props
        return ( 

            <div>
                <Paper 
                    square
                    className={classes.mainFeaturedPost} 
                    style={{overflow:'hidden'}}
                    
                >
                    
                    <img 
                        style={{ width:'100%',position:'absolute',bottom:'0%',left:'50%',transform:'translate(-50%,-0%)'}} 
                        // src={this.props.Store.storeimage}
                        // alt={mainFeaturedPost.imageText} 
                    />
                    <div className={classes.overlay} />

                    <Grid container style={{margin:'56px 0 0'}}>
                        <Grid item xs={12} sm={6} md={6}>
                        <div className={classes.mainFeaturedPostContent}>
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                Cart
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
            </div>

         );
    }
}


const MapstatetoProps=(state)=>{
    return {
        User:state.Auth,
        Store:state.Store
    }
}
 
export default compose(connect(MapstatetoProps), withStyles(styles,{withTheme:true})) (Transactions);
 