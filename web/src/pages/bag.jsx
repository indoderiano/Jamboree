import React, { Component } from 'react'
import {withStyles,Grid,Paper,Typography,Container,Box,Icon,Divider,Fade,Button,Card,CardMedia,CardContent,CardActions} from '@material-ui/core'
import {MyTextField} from '../components/material-ui'
import {Link} from 'react-router-dom'
import {LoadTransaction} from '../redux/actions'
import {compose} from 'redux'
import { connect } from 'react-redux';
import Axios from 'axios';
import { APIURL } from '../supports/ApiUrl';



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
        paddingLeft: theme.spacing(6),
        paddingRight: 0,
        marginTop: '3em',
      },
      // fontWeight: '100'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& .MuiCardActions-root': {
          padding: '10px'
        }
      },
      cardMediaMenu: {
        paddingTop: '66.25%', // 16:9
      },
      menuName: {
        fontWeight:'400',
        letterSpacing:'0px',
        fontSize:'16px'
      },
      menuDescription: {
        fontWeight:'100',
        letterSpacing:'0px',
        fontSize:'14px', 
        marginBottom:'.5em'
      },
      paperButton: {
          color:theme.palette.primary.dark,
          cursor:'pointer'
      }
    
  })



class Bag extends Component {
    state = { 
        msg: '',
        msgeditid:-1
     }

    componentDidMount(){
        // console.log(props.Transaction)
    }

    onEditDetails=(id,edit)=>{
        Axios.put(`${APIURL}/transactions/transactiondetails/${id}`,edit)
        .then((res)=>{
            // update successful
            // reload transaction redux
            this.props.LoadTransaction(this.props.User.id)
            this.setState({msgeditid:-1})
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderItems=()=>{
        // REARRANGE TRANSACTION DETAILS BY STORE NAME
        // console.log('render items')
        // console.log(this.props.Transaction.items)
        var itemListByStore=[]
        this.props.Transaction.items.forEach((item)=>{
            // check if storename already pushed
            var check=false
            itemListByStore.forEach((val,index)=>{
                if(val.storename===item.storename){
                    itemListByStore[index].items.push(item)
                    check=true
                }
            })
            if(!check){
                itemListByStore.push({
                    storename:item.storename,
                    items:[item]
                })
            }
        })

        // console.log(itemListByStore)

        const {classes}=this.props
        return itemListByStore.map((list,index)=>{
            return (
                <Paper 
                    key={index} 
                    style={{padding:'1em 1em 2em',marginBottom:'1em'}}
                    elevation={3}
                >
                    <Typography component={'h1'} style={{marginBottom:'2em',fontWeight:'bold',fontSize:'18px'}}>
                        {list.storename}
                    </Typography>

                    {
                        list.items.map((item,index)=>{
                            return (
                                <Box key={index}>
                                {
                                    index===0?
                                    null
                                    :
                                    <Divider style={{marginBottom:'1em'}}/>
                                }
                                <Box 
                                    style={{display:'flex',flexDirection:'row',height:'150px',marginBottom:'1em'}}
                                >
                                    <Box style={{
                                        width:'250px',
                                        backgroundImage:`url(${item.image})`,
                                        backgroundPosition:'center',
                                        backgroundSize:'cover',
                                        backgroundRepeat:'no-repeat'
                                        }}
                                    >
                                    </Box>
                                    <Box style={{marginLeft:'2em'}}>
                                        <Typography component={'h2'} style={{fontWeight:'bold',marginBottom:'1em'}}>{item.menu_name}</Typography>
                                        <Typography component={'h2'} style={{fontWeight:'800',fontSize:'13px',marginBottom:'1em'}}>Rp {item.price},00</Typography>
                                        
                                        {
                                            this.state.msgeditid!==item.id?
                                            <>  
                                                {
                                                    item.msg?
                                                    <Typography component={'h3'} style={{fontSize:'15px',fontWeight:'lighter',maxWidth:'200px'}}>"{item.msg}"</Typography>
                                                    : null
                                                }
                                                <Button 
                                                    color='primary' 
                                                    style={{padding:'0'}}
                                                    onClick={()=>{this.setState({msgeditid:item.id,msg:item.msg?item.msg:''})}}
                                                >{item.msg?'Edit Message':'Add Message'}</Button>
                                            </>
                                            :
                                            <Fade in={this.state.msgeditid===item.id}>
                                                <Box>
                                                    <MyTextField
                                                        variant="outlined"
                                                        // required
                                                        fullWidth
                                                        label="Message"
                                                        // placeholder={menu.description}
                                                        size='small'
                                                        autoFocus
                                                        multiline
                                                        rows={2}
                                                        onChange={(e)=>{this.setState({msg:e.target.value})}}
                                                        value={this.state.msg}
                                                    />
                                                    <Button 
                                                        color='primary' 
                                                        style={{padding:'0',minWidth:'unset',float:'right'}}
                                                        onClick={()=>{this.onEditDetails(item.id,{msg:this.state.msg})}}
                                                    >Ok</Button>
                                                </Box>
                                            </Fade>
                                        }
                                    </Box>
                                    <Box style={{marginLeft:'auto',paddingLeft:'2em'}}>
                                        <Box style={{marginBottom:'1em'}}>
                                            <Icon 
                                                className={classes.paperButton}
                                                onClick={()=>{this.onEditDetails(item.id,{qty:item.qty-1})}}    
                                            >remove_circle</Icon>
                                            <Typography component={'span'} style={{margin:'0 .5em',verticalAlign:'6px'}}>{item.qty}</Typography>
                                            <Icon 
                                                className={classes.paperButton}
                                                onClick={()=>{this.onEditDetails(item.id,{qty:item.qty+1})}}  
                                            >add_circle</Icon>

                                            <Icon 
                                                style={{color:'rgba(0,0,0,.7)',marginLeft:'1em',cursor:'pointer'}}
                                                onClick={()=>{this.onEditDetails(item.id,{qty:0})}}  
                                            >delete</Icon>
                                        </Box>
                                    </Box>
                                </Box>
                                </Box>
                            )
                        })
                    }


                </Paper>
            )
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
                                Bag
                            </Typography>
                        </div>
                        </Grid>
                    </Grid>
                </Paper>

                {/* ********* */}
                {/* Item List */}
                {/* ********* */}
                <Container style={{background:'white',padding:'0 5vw'}} maxWidth="lg">
                    <Box component='h2' style={{letterSpacing:'3px',color: 'rgba(0,0,0,.85)'}}>Items</Box>
                    <Grid 
                        container 
                        spacing={4} 
                        style={{paddingBottom: '1em',marginTop:'1em'}}
                    >
                        <Grid item xs={12} sm={12} md={8}>
                            {this.renderItems()}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                        <Paper 
                            style={{padding:'1em 1em 2em',marginBottom:'1em'}}
                            elevation={3}
                        >
                            <Typography component={'h1'} style={{fontSize:'18px',fontWeight:'bold',marginBottom:'.5em'}}>
                                Belanja
                            </Typography>
                            <Divider variant='fullWidth'/>
                            <Box style={{marginTop:'1em'}}>
                                <Typography style={{display:'inline',color:'gray'}}>Items</Typography>
                                <Typography style={{display:'inline',float:'right',fontWeight:'bold'}}>{this.props.Transaction.totalQty}</Typography>
                            </Box>
                            <Box style={{marginBottom:'2em'}}>
                                <Typography style={{display:'inline',color:'gray'}}>Total Harga</Typography>
                                <Typography style={{display:'inline',float:'right',fontWeight:'bold'}}>Rp{this.props.Transaction.totalPrice},00</Typography>
                            </Box>
                            <Button component={Link} to='/checkout' color='primary' variant='contained' style={{width:'100%'}}>Checkout</Button>
                        </Paper>
                        </Grid>
                        

                    </Grid>
                </Container>

            </div>

         );
    }
}


const MapstatetoProps=(state)=>{
    return {
        User:state.Auth,
        Store:state.Store,
        Transaction:state.Transaction
    }
}
 
export default compose(connect(MapstatetoProps,{LoadTransaction}), withStyles(styles,{withTheme:true})) (Bag);
 