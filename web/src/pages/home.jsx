import React from 'react';
import {Button,Card,CardActions,CardContent,CardMedia,Grid,Typography,Container,Paper,Link,Icon,Box,TextField,Modal,Backdrop,Fade,Grow,Zoom,Collapse,Slide} from '@material-ui/core';
import {Transition} from 'react-transition-group'
import { makeStyles,withStyles } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange'
import {MyTextField, MyButton} from './../components/material-ui'
import { useEffect } from 'react';
import { useState } from 'react';
import {LoadTransaction} from '../redux/actions'
import Axios from 'axios';
import {APIURL} from './../supports/ApiUrl'
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
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
    // fontWeight: '100'
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  // heroContent: {
  //   backgroundColor: theme.palette.background.paper,
  //   padding: theme.spacing(8, 0, 6),
  // },
  // heroButtons: {
  //   marginTop: theme.spacing(4),
  // },
  cardGrid: {
    // paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& .MuiCardActions-root': {
      padding: '10px'
    }
  },
  cardMediaStore: {
    paddingTop: '56.25%', // 16:9
  },
  cardMediaMenu: {
    paddingTop: '66.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardMessage: {
    color: theme.palette.primary.dark,
    fontSize:'14px',
    display:'flex',
    alignItems:'flex-end',
    marginLeft:'6px'
    // border: '1px solid red'
  },
  // footer: {
  //   backgroundColor: theme.palette.background.paper,
  //   padding: theme.spacing(6),
  // },
  // root: {
  //   '& > span': {
  //     margin: theme.spacing(2),
  //   }
  // },
  // modal menu onclick
  modal: {
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    overflow: 'hidden',
    // padding: '2em',
  },
  // paper: {
  //   // backgroundColor: theme.palette.background.paper,
  //   width: '100%',
  //   backgroundColor: 'transparent',
  //   // border: '2px solid #000',
  //   // boxShadow: theme.shadows[5],
  //   padding: theme.spacing(2, 4, 3),
  //   outline: '0',
  //   color: 'white'
  // },
  grid: {
    padding: '6em 4em',
    outline:'0',
    overflow:'auto',
  },

}));

const transitionStyles = {
  entering: { opacity: 0},
  entered:  { opacity: .6},
  exiting:  { opacity: 1},
  exited:  { opacity: 0},
};

const mainFeaturedPost = {
  title: 'Festival Jamboree',
  description:
    "Hello world, this is festival jamboree. While you can come and visit the festival, you can also buy our products online",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};


const Home = (props) => {
  const classes = useStyles();

  const [stores,setstores]=useState([])

  const [modalOpen,setmodalOpen]=useState(false)

  const [menu,setmenu]=useState([])

  const [addedItems,setaddedItems]=useState([])

  // const [cardMessage,setcardMessage]=useState([])


  useEffect(()=>{
    // Axios.get(`http://localhost:5000/sellers`)
    Axios.get(`${APIURL}/sellers`)
    .then((res)=>{
        setstores(res.data)
    }).catch((err)=>{
        console.log(err)
    })
  },[])

  const loadMenu=(sellerid)=>{
    Axios(`${APIURL}/menu?sellerid=${sellerid}`)
    .then((res)=>{
      setmenu(res.data)
      setmodalOpen(true)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const onAddItem=(menuid)=>{
    // var arr=addedItems
    // arr.push({id:menuid,qty:1})
    // console.log(arr)
    // setaddedItems(arr)

    // Immutability React
    // Cannot use 'push' operator, 
    // Read here https://blog.logrocket.com/immutability-in-react-ebe55253a1cc/

    // adding note 
    setaddedItems([...addedItems,menuid])

    // ADD TO DATABASE
    var obj={
      userid:props.User.id,
      menuid,
      quantity:1
    }
    Axios.post(`${APIURL}/transactions`,obj)
    .then((res)=>{
      console.log('item added to bag')
      console.log(res.data)
      // RELOAD TRANSACTION ITEMS ON BAG
      props.LoadTransaction(props.User.id)

    }).catch((err)=>{
      console.log(err)
    })


  }

  const noteQty=(menuid)=>{
    var count=0
    addedItems.forEach((id,index)=>{
      if(id===menuid){
        count++
      }
    })
    return count
    // if(count){
    //   // return `${count} item(s)`
    //   return <>{`${count} item(s)`}<Icon style={{marginLeft:'.3em'}}>done</Icon></>
    // }
  }


  const renderStores=()=>{
    // console.log('render store')
      return stores.map((card,index)=>{
          return (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className={classes.card} style={{position:'relative'}}>
                <CardMedia
                    className={classes.cardMediaStore+ ' store-card-shadow'}
                    image={card.storeimage}
                    // title="Image title"
                />
                <CardContent className={classes.cardContent} style={{position:'absolute', top:'0', color:'white'}}>
                    <Typography gutterBottom variant="h5" component="h2" style={{fontWeight:'100',letterSpacing:'4px',fontSize:'24px'}}>
                        {card.storename}
                        {/* <i className="fa fa-plus-circle" /> */}
                    </Typography>
                    {/* <Typography>
                    This is a media card. You can use this section to describe the content.
                </Typography> */}
                </CardContent>
                {/* <Icon style={{position:'absolute',top:'20px',right:'16px',color:'white'}}>local_cafe</Icon> */}
                <CardActions style={{position:'absolute', bottom:'0'}} className='home-card-action'>
                    <Button onClick={()=>{loadMenu(card.id)}} color='primary' variant="contained" size="small" className='home-btn'>
                        Show Menu
                    </Button>
                </CardActions>
              </Card>
            </Grid>
          )
      })
  }

  const renderMenu=()=>{
    // console.log('render menu')
    return menu.map((menu,index)=>{
      return (

        <Grid key={index} item xs={6} sm={4} md={3}>


          {/* <Transition in={modalOpen} timeout={300}>
            {state => ( */}
            
          <Fade in={true} style={{
            transitionDelay:index*.08+'s',
            }}
            timeout={500}
          >
            

          <Card 
            className={classes.card} 
            style={{
              position:'relative',
              // animationDelay:index*.1+'s',
            }} 
            onClick={(e)=>{e.stopPropagation()}}
          >
            <CardMedia
                className={classes.cardMediaMenu}
                image={menu.image}
                // title="Image title"
            />
            <CardContent 
              // className={classes.cardContent} 
              style={{paddingBottom: '.5em'}}
            >
              <Typography 
                gutterBottom variant="h5" 
                component="h2" 
                style={{fontWeight:'400',letterSpacing:'0px',fontSize:'16px'}}
              >
                  {menu.menu_name}
                  {/* <i className="fa fa-plus-circle" /> */}
              </Typography>
              <Typography
                style={{fontWeight:'100',letterSpacing:'0px',fontSize:'14px', marginBottom:'.5em'}}
              >
                {menu.description}
              </Typography>
              {/* <Typography
                style={{fontWeight:'400',letterSpacing:'7px',fontSize:'14px', color:'rgba(0,0,0,.4)', margin:'.5em 0 0'}}
              >
                Beverages
              </Typography> */}
            </CardContent>

            <CardContent style={{marginTop:'auto'}}>
              <Typography 
                component="h3" 
                style={{fontWeight:'400',letterSpacing:'0px',fontSize:'14px'}}
              >
                  Rp {menu.price},00
                  {/* <i className="fa fa-plus-circle" /> */}
              </Typography>
            </CardContent>

            {/* <Icon style={{position:'absolute',top:'20px',right:'16px',color:'white'}}>local_cafe</Icon> */}
            <CardActions 
              style={{flexDirection:'column'}} 
              // className='home-card-action'
            > 
              <Box style={{display:'flex',width:'100%',overflow:'hidden'}}>
                <Grow in={noteQty(menu.id)?true:false}>
                  <Typography 
                    component='span' 
                    className={classes.cardMessage}
                    // color="primary"
                  >
                        {noteQty(menu.id)} item(s) <Icon style={{marginLeft:'.1em',marginBottom:'-1px',fontSize:'28px'}}>done</Icon>
                  </Typography>
                </Grow>
                <Button 
                  color='primary' 
                  variant="contained" 
                  size="small" 
                  style={{fontSize:'13px',marginLeft:'auto'}}
                  onClick={()=>onAddItem(menu.id)}
                >
                    Add to cart  <i style={{marginLeft:'8px'}} className="fas fa-shopping-cart"></i>
                </Button>
              </Box>
            </CardActions>
          </Card>
          
          
          </Fade>

          {/* // )}
          //   </Transition> */}

        </Grid>
          
      )
    })
  }

  return (
    <div>
      <Paper 
        square
        className={classes.mainFeaturedPost} 
        style={{ backgroundImage: `url(${mainFeaturedPost.image})`}} 
        style={{overflow:'hidden'}}
      >
        
        {/* <img 
          style={{ width:'100%',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}} 
          src={mainFeaturedPost.image} 
          alt={mainFeaturedPost.imageText} 
        /> */}
        <div className={classes.overlay} />

        <Grid container style={{margin:'56px 0 0'}}>
          <Grid item xs={12} sm={6} md={6}>
          <div className={classes.mainFeaturedPostContent}>
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {mainFeaturedPost.title}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph style={{fontWeight:'300'}}>
              {mainFeaturedPost.description}
              </Typography>
              <Link variant="subtitle1" href="#">
              {mainFeaturedPost.linkText}
              </Link>
          </div>
          </Grid>
          <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'64px 24px 48px'}}>
            <Box 
              // component={'span'}
              id='ticketBox'
              style={{
                // position:'absolute',
                // top:'60%',
                // left:'50%',
                // transform:'translate(-50%,-50%)',
                // display:'inline',
                // minWidth:'300px',
                maxWidth:'250px',
                padding:'1em 1em',
                // margin: '0 auto',
                background: 'rgba(255,255,255,.6)',
                borderRadius: '4px',
                transition: 'all .2s ease',
                zIndex:'1',
                // textAlign:'left'
                // width: '160px'
              }}
            >
              <Box component='h5' style={{color:'rgba(0,0,0,.7)',margin:'0 0 1em'}}>For easier access, buy your ticket(s) here</Box>
              <MyTextField
                  label="Buy entry tickets"
                  type="number"
                  // InputLabelProps={{
                  //     shrink: true,
                  // }}
                  variant="outlined"
                  size='small'
                  color='secondary'
                  // fullWidth={true}
                  // style={{color:'red'}}
                  // style={{letterSpacing: '2px'}}
                  // InputProps={{style:{fontSize:'9px'}}}
                  onFocus={()=>{document.getElementById('ticketBox').classList.add('ticket-box-focus')}}
                  onBlur={()=>{document.getElementById('ticketBox').classList.remove('ticket-box-focus')}}
              />
              <MyButton 
                endIcon={
                  // <Icon>shopping_cart</Icon>
                  <i style={{fontSize:'12px'}} className="fas fa-shopping-cart"></i>
                } 
                variant="contained" 
                color='primary' 
                size="small" 
                className='home-btnss' 
                style={{marginTop:'.5em',fontSize:'10px'}}
              >
                  Add to cart
              </MyButton>
              
            </Box>

          </Grid>
        </Grid>
      </Paper>


      {/* ********** */}
      {/* Store List */}
      {/* ********** */}
      <Container style={{background:'white'}} className={classes.cardGrid} maxWidth="lg">
          {/* End hero unit */}
          <Box component='h2' style={{letterSpacing:'3px',color: 'rgba(0,0,0,.85)'}}>Stores</Box>
          <Grid container spacing={4}>
            {renderStores()}
          </Grid>
      </Container>


        {/* modal menu */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={modalOpen}
          onClose={()=>{setmodalOpen(false)}}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            style: {backgroundColor:'rgba(0,0,0,.75)'}
          }}
          onBackdropClick={()=>{setmodalOpen(false)}}
          // onClick={()=>{settt(true)}}
        >
          <Fade 
            in={modalOpen}
            // timeout={300}
            // onClose={()=>{setmodalOpen(false)}}
          >

            <Grid container spacing={4} className={classes.grid} 
              onClick={()=>{setmodalOpen(false)}}
              // onClick={()=>{settt(true)}}
            >
              {renderMenu()}
            </Grid>

          </Fade>
        </Modal>

        

    </div>
  );
}

const MapstatetoProps=(state)=>{
  return {
    User:state.Auth
  }
}


export default connect(MapstatetoProps,{LoadTransaction}) (Home)