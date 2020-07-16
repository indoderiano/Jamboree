import React, {Component} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Paper,Typography,Link,Button,Card,CardActions,CardContent,CardMedia,Container,Box,Modal,Backdrop,Fade,Grow,FormControl,InputLabel,Select,Icon, withStyles} from '@material-ui/core'
import {MyTextField,MyFormControl} from '../components/material-ui'
import { connect } from 'react-redux';
import { compose } from 'redux';
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
    icon: {
      marginRight: theme.spacing(2),
    },
    card: {
        height: '100%',
        // width: '300px',
        display: 'flex',
        flexDirection: 'column',
        '& .MuiCardActions-root': {
          padding: '10px'
        },
        boxShadow: '0px 2px 10px -1px rgba(0,0,0,0.2), 0px 1px 10px 0px rgba(0,0,0,0.14), 0px 1px 30px 0px rgba(0,0,0,0.12)'
    },
    cardMediaMenu: {
        paddingTop: '75%',
        position:'relative',
    },
    cardHover: {
        transform: 'scale(1)',
        background: 'rgba(0,0,0,0)',
        transition: 'all .1s ease',
        '&:hover': {
            transform: 'scale(1.03)',
            // background: 'rgba(0,0,0,.1)'
        },
        // '&:active': {
        //     transform: 'scale(1)'
        // }
    },
    modal: {
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        overflow: 'hidden'
    },
    modalMenu: {
        // backgroundColor: theme.palette.background.paper,
        width: '100%',
        // height: '100%',
        // backgroundColor: 'white',
        // position: 'absolute',
        // top: '50%',
        // transform: 'translate(0,-50%)',
        transition: 'all 1s ease',
        // border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 0, 3),
        outline: '0',
        color: 'white'
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
      },
  })


class Store extends Component {
    
    state = { 
        menu: [],
        categories: [],
        sellerid: '',
        // section add product 
        modalOpen: false,
        modalMessage: '',
        addSucceed: false,
        newMenu:{
            menu_name:'',
            image:'',
            price:'',
            description:'',
            categoryid: 0
        },
        addLoading: false,
        // 
        // section edit product
        editindex: -1,
        editimage: false,
        editname: false,
        editdescription: false,
        editprice: false,
        editcategory: false,
        // section delete product
        deleteindex: -1,
     }

     INITIAL_STATE={
        // INPUT
        newMenu:{
            menu_name:'',
            image:'',
            price:'',
            description:'',
            categoryid: 0
        },

        // MODAL
        modalOpen: false,
        modalMessage: '',
        addSucceed: false,
        addLoading: false,

        // EDIT
        editindex: -1,
        editimage: false,
        editname: false,
        editdescription: false,
        editprice: false,
        editcategory: false,

        // DELETE
        deleteindex: -1,

     }


    componentDidMount=()=>{
        if(this.props.Store.id){
            Axios(`${APIURL}/menu?sellerid=${this.props.Store.id}`)
            .then((res)=>{
                console.log('didmount axios')
                this.setState({menu:res.data})
            }).catch((err)=>{
                console.log(err)
            })

            // Axios
        }
    }

     
    componentDidUpdate=()=>{
        // console.log('store didupdate')
        // console.log(this.props.Store.id)
        // INITIALLY sellerid is not loaded yet
        if(this.state.sellerid!==this.props.Store.id){
            this.setState({sellerid: this.props.Store.id})
            // console.log(this.props.Store.id)
            // LOAD MENU
            Axios.get(`${APIURL}/menu?sellerid=${this.props.Store.id}`)
            .then((res)=>{
                // console.log('didupdate axios')
                // console.log(res.data)
                this.setState({menu:res.data})
            }).catch((err)=>{
                console.log(err)
            })

            // LOAD CATEGORIES
            Axios.get(`${APIURL}/menu/categories`)
            .then((res)=>{
                this.setState({categories:res.data})
            }).catch((err)=>{
                console.log(err)
            })
        }

        // if edit index changed, variable newMenu is emptied
        // if(this.state.editindex!==this.state.preveditindex){
        //     this.setState({preveditindex:this.state.editindex})

        //     // clean newMenu
        //     this.clearNewMenu()
        // }

    }

    clearNewMenu=()=>{
        var emptyMenu={
            menu_name:'',
            image:'',
            price:'',
            description:'',
            categoryid: 0
        }
        console.log('empty menu')
        this.setState({newMenu:emptyMenu})
    }


    onAddMenu=()=>{
        var menu={
            sellerid: this.props.Store.id,
            ...this.state.newMenu
        }
        console.log(menu)

        if(!menu.menu_name||!menu.image||!menu.price||!menu.description||!menu.categoryid){
            this.setState({modalMessage: 'Please fill all columns' })
        }else{
            this.setState({addLoading:true})
            Axios.post(`${APIURL}/menu`,menu)
            .then((res)=>{
                this.setState({modalMessage:<p><Icon style={{verticalAlign:'-6px'}}>check</Icon> Product is added succesfully</p>,addSucceed:true})
                setTimeout(()=>{
                    this.setState({menu:res.data})
                    this.setState({...this.INITIAL_STATE})
                },2000)

            }).catch((err)=>{
                console.log(err)
                this.setState({modalMessage:'Error, upload menu failed'})
            }).finally(()=>{
                // var initial
            })

        }
    }

    onEditMenu=(menuid)=>{
        // console.log(this.state.newMenu)
        // const {} = this.state.
        var menu={
            sellerid: this.state.sellerid,
            ...this.state.newMenu
        }
        Axios.put(`${APIURL}/menu/${menuid}`,menu)
        .then((res)=>{
            this.setState({menu:res.data,...this.INITIAL_STATE})
        }).catch((err)=>{
            console.log(err)
        })
    }

    onDeleteMenu=(menuid)=>{
        console.log('delete menu')
        Axios.delete(`${APIURL}/menu/${menuid}`)
        .then((res)=>{
            // console.log(res.data)
            // console.log('menu deleted')
            Axios.get(`${APIURL}/menu?sellerid=${this.state.sellerid}`)
            .then((res)=>{
                // console.log('get menu list')
                // console.log(res.data)
                this.setState({menu:res.data,...this.INITIAL_STATE})
            }).catch((err)=>{
                console.log(err)
            })
            

        }).catch((err)=>{
            console.log(err)
        })
    }

    renderAddMenu=()=>{
        const {classes} = this.props
        return (
            <Grid key={'addmenu'} item xs={6} sm={4} md={3} className={classes.cardHover}>
                <Card className={classes.card} style={{position:'relative',minHeight:'400px'}} onClick={()=>{this.setState({...this.INITIAL_STATE,modalOpen:true})}}>
                    <CardActions style={{flex:'1',padding:'1em',cursor:'pointer'}}>
                        <Box 
                            component='div'
                            style={{
                                width:'100%',
                                height:'100%',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                flexDirection:'column',
                                // border: '2px solid rgba(0,0,0,.2)'
                                fontSize:'15px',
                                // fontWeight:'500',
                                color:'#ff9800'
                            }}
                        >
                            <Icon style={{fontSize:'60px',fontWeight:'100',color:'#ff9800'}}>add</Icon>
                            ADD MENU
                        </Box>

                        {/* <Button 
                            color='primary' 
                            variant="outlined" 
                            size="small" 
                            style={{fontSize:'13px'}}>
                                Edit  
                        </Button> */}
                    </CardActions>
                </Card>
            </Grid>
        )
    }

    renderMenu=()=>{
        const {classes} = this.props
        const {editindex,editimage,editname,editdescription,editprice,editcategory,deleteindex,newMenu} = this.state
        const refreshedit={
            editimage: false,
            editname: false,
            editdescription: false,
            editprice: false,
            editcategory: false,
        }
        var menuList = this.state.menu.map((menu,index)=>{
            const isedit = index===editindex
            return (
                <Grid key={index} item xs={6} sm={4} md={3} >
                    <Card className={classes.card} style={{position:'relative'}}>
                        {/* ********** */}
                        {/* Menu Image */}
                        {/* ********** */}
                        <CardMedia
                            className={classes.cardMediaMenu}
                            image={!isedit?menu.image:newMenu.image}
                            // title="Image title"
                        >
                            <Fade in={index===editindex&&!editimage?true:false}>
                                <Button 
                                color='primary' 
                                // variant="outlined" 
                                size="small" 
                                style={{fontSize:'10px',position:'absolute',bottom:'10px',right:'16px',padding:'0'}}
                                onClick={()=>{this.setState({...refreshedit,editimage:true})}}
                                >
                                    <i className="far fa-edit" style={{marginRight:'.5em',fontSize:'12px'}}></i>Change 
                                </Button>
                            </Fade>
                        </CardMedia>
                        {/* edit image */}
                        <Grow in={isedit&&editimage?true:false} 
                        // style={isedit&&editimage?{height:'100%'}:{height:'0',padding:'0'}}
                        >
                            <Box style={{height:isedit&&editimage?'100%':'0'}}>
                                <CardActions style={{padding:'10px',flexDirection:'column',alignItems:'right'}}>
                                    <MyTextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Image (url)"
                                        size='small'
                                        onChange={(e)=>{this.setState({newMenu:{...this.state.newMenu,image:e.target.value}})}}
                                        value={this.state.newMenu.image}
                                        style={{marginBottom:'0em'}}
                                    />
                                    <Box style={{marginLeft:'auto'}}>
                                        <Button 
                                        color='primary' 
                                        // variant="outlined" 
                                        size="small" 
                                        style={{padding:'0'}}
                                        onClick={()=>{this.setState({editimage:false})}}
                                        >
                                            Ok
                                        </Button>
                                        <Button 
                                        color='primary' 
                                        // variant="outlined" 
                                        size="small" 
                                        style={{padding:'0'}}
                                        onClick={()=>{this.setState({editimage:false,newMenu:{...this.state.newMenu,image:menu.image}})}}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </CardActions>
                            </Box>
                        </Grow>

                        <CardContent 
                            // className={classes.cardContent} 
                            style={{paddingBottom: '.5em'}}
                        >

                            {/* ********* */}
                            {/* Menu Name */}
                            {/* ********* */}
                            <Typography 
                                gutterBottom variant="h5" 
                                component="h2" 
                                style={{fontWeight:'400',letterSpacing:'0px',fontSize:'16px',position:'relative'}}
                            >
                                {   
                                    !isedit?
                                    menu.menu_name
                                    :editname?
                                    <Grow in={true}>
                                    <CardActions style={{padding:'0px',flexDirection:'column',alignItems:'right'}}>
                                        <MyTextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="Name"
                                            placeholder={menu.menu_name}
                                            size='small'
                                            autoFocus
                                            onChange={(e)=>{this.setState({newMenu:{...this.state.newMenu,menu_name:e.target.value}})}}
                                            value={this.state.newMenu.menu_name}
                                        />
                                        <Box style={{marginLeft:'auto'}}>
                                            <Button 
                                            color='primary' 
                                            // variant="outlined" 
                                            size="small" 
                                            style={{padding:'0'}}
                                            onClick={()=>{this.setState({editname:false})}}
                                            >
                                                Ok
                                            </Button>
                                            <Button 
                                            color='primary' 
                                            // variant="outlined" 
                                            size="small" 
                                            style={{padding:'0'}}
                                            onClick={()=>{this.setState({editname:false,newMenu:{...this.state.newMenu,menu_name:menu.menu_name}})}}
                                            >
                                                Cancel
                                            </Button>
                                        </Box>
                                    </CardActions>
                                    </Grow>
                                    :
                                    newMenu.menu_name
                                    // newMenu.menu_name?newMenu.menu_name:menu.menu_name
                                }
                                {
                                    isedit&&editname?
                                    null
                                    :
                                    <Fade in={isedit&&!editname?true:false}>
                                        <Button 
                                        color='primary' 
                                        // variant="outlined" 
                                        size="small" 
                                        style={{fontSize:'10px',position:'absolute',right:'0',padding:'0'}}
                                        onClick={()=>{this.setState({...refreshedit,editname:true})}}
                                        >
                                            <i className="far fa-edit" style={{marginRight:'.5em',fontSize:'12px'}}></i>
                                            {/* <Icon>arrow_right_alt_sharp_icon</Icon> */}
                                            Change
                                        </Button>
                                    </Fade>
                                }
                            </Typography>
                            
                            {/* **************** */}
                            {/* Menu Description */}
                            {/* **************** */}
                            <Typography
                                style={{fontWeight:'100',letterSpacing:'0px',fontSize:'14px', marginBottom:'.5em'}}
                                component={'div'}
                            >
                                {   
                                    !isedit?
                                    menu.description
                                    :editdescription?
                                    <Grow in={true}>
                                    <CardActions style={{paddingTop:'10px',flexDirection:'column',alignItems:'right'}}>
                                        <MyTextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="Description"
                                            placeholder={menu.description}
                                            size='small'
                                            autoFocus
                                            multiline
                                            rows={4}
                                            onChange={(e)=>{this.setState({newMenu:{...this.state.newMenu,description:e.target.value}})}}
                                            value={this.state.newMenu.description}
                                        />
                                        <Box style={{marginLeft:'auto'}}>
                                            <Button 
                                            color='primary' 
                                            // variant="outlined" 
                                            size="small" 
                                            style={{padding:'0'}}
                                            onClick={()=>{this.setState({editdescription:false})}}
                                            >
                                                Ok
                                            </Button>
                                            <Button 
                                            color='primary' 
                                            // variant="outlined" 
                                            size="small" 
                                            style={{padding:'0'}}
                                            onClick={()=>{this.setState({editdescription:false,newMenu:{...this.state.newMenu,description:menu.description}})}}
                                            >
                                                Cancel
                                            </Button>
                                        </Box>
                                    </CardActions>
                                    </Grow>
                                    :
                                    newMenu.description
                                    // newMenu.description?newMenu.description:menu.description
                                }
                                {
                                    isedit&&!editdescription?
                                    <Fade in={true}>
                                        <Button 
                                        color='primary' 
                                        // variant="outlined" 
                                        size="small" 
                                        style={{fontSize:'10px',float:'right',padding:'0'}}
                                        onClick={()=>{this.setState({...refreshedit,editdescription:true})}}
                                        >
                                            <i className="far fa-edit" style={{marginRight:'.5em',fontSize:'12px'}}></i>
                                            {/* <Icon>arrow_right_alt_sharp_icon</Icon> */}
                                            Change
                                        </Button>
                                    </Fade>
                                    : null
                                }
                            </Typography>
                        
                        </CardContent>
                        
                        <CardContent style={{marginTop:'auto'}}>

                            {/* ********** */}
                            {/* Menu Price */}
                            {/* ********** */}
                            <Typography 
                                component="h3" 
                                style={{fontWeight:'400',letterSpacing:'0px',fontSize:'14px',position:'relative'}}
                            >
                                {   
                                    !isedit?
                                    'Rp '+menu.price+',00'
                                    :editprice?
                                    <Grow in={true}>
                                    <CardActions style={{padding:'0px',flexDirection:'column',alignItems:'right'}}>
                                        <MyTextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="Price"
                                            placeholder={menu.price+''}
                                            size='small'
                                            autoFocus
                                            onChange={(e)=>{this.setState({newMenu:{...this.state.newMenu,price:e.target.value}})}}
                                            value={this.state.newMenu.price}
                                        />
                                        <Box style={{marginLeft:'auto'}}>
                                            <Button 
                                            color='primary' 
                                            // variant="outlined" 
                                            size="small" 
                                            style={{padding:'0'}}
                                            onClick={()=>{this.setState({editprice:false})}}
                                            >
                                                Ok
                                            </Button>
                                            <Button 
                                            color='primary' 
                                            // variant="outlined" 
                                            size="small" 
                                            style={{padding:'0'}}
                                            onClick={()=>{this.setState({editprice:false,newMenu:{...this.state.newMenu,price:menu.price}})}}
                                            >
                                                Cancel
                                            </Button>
                                        </Box>
                                    </CardActions>
                                    </Grow>
                                    :
                                    'Rp '+newMenu.price+',00'
                                    // 'Rp '+(newMenu.price?newMenu.price:menu.price)+',00'
                                }
                                {
                                    isedit&&!editprice?
                                    <Fade in={true}>
                                        <Button 
                                        color='primary' 
                                        // variant="outlined" 
                                        size="small" 
                                        style={{fontSize:'10px',position:'absolute',right:'0',padding:'0'}}
                                        onClick={()=>{this.setState({...refreshedit,editprice:true})}}
                                        >
                                            <i className="far fa-edit" style={{marginRight:'.5em',fontSize:'12px'}}></i>
                                            {/* <Icon>arrow_right_alt_sharp_icon</Icon> */}
                                            Change
                                        </Button>
                                    </Fade>
                                    : null
                                }
                            </Typography>

                            {/* ************* */}
                            {/* Menu Category */}
                            {/* ************* */}
                            <Typography 
                                gutterBottom variant="h5" 
                                component="h3" 
                                style={{fontWeight:'100',letterSpacing:'4px',fontSize:'18px',color:'rgba(0,0,0,.5)',marginTop:'.5em',position:'relative'}}
                            >
                                {   
                                    !isedit?
                                    menu.category_name
                                    :editcategory?
                                    <Grow in={true}>
                                    <CardActions style={{padding:'0px',flexDirection:'column',alignItems:'baseline'}}>
                                        <MyFormControl variant="outlined" className={classes.formControl} style={{width:'100%'}}>
                                            <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
                                            <Select
                                                native
                                                // value={this.state.newMenu.categoryid}
                                                onChange={(e)=>{console.log(e.target.value);this.setState({newMenu:{...this.state.newMenu,categoryid:e.target.value}})}}
                                                label="Category"
                                                defaultValue={newMenu.categoryid}
                                                inputProps={{
                                                    name: 'category',
                                                    id: 'outlined-age-native-simple',
                                                }}
                                            >
                                                <option aria-label="None" value="" />
                                                {
                                                    this.state.categories.map((val,index)=>{
                                                        return (
                                                            <option key={index} value={val.id}>{val.category_name}</option>
                                                        )
                                                    })
                                                }
                                                {/* <option aria-label="None" value="" />
                                                <option value={10}>Ten</option>
                                                <option value={20}>Twenty</option>
                                                <option value={30}>Thirty</option> */}
                                            </Select>
                                        </MyFormControl>
                                        <Box style={{marginLeft:'auto'}}>
                                            <Button 
                                            color='primary' 
                                            // variant="outlined" 
                                            size="small" 
                                            style={{padding:'0'}}
                                            onClick={()=>{this.setState({editcategory:false})}}
                                            >
                                                Ok
                                            </Button>
                                            <Button 
                                            color='primary' 
                                            // variant="outlined" 
                                            size="small" 
                                            style={{padding:'0'}}
                                            onClick={()=>{this.setState({editcategory:false,newMenu:{...this.state.newMenu,categoryid:menu.categoryid}})}}
                                            >
                                                Cancel
                                            </Button>
                                        </Box>
                                    </CardActions>
                                    </Grow>
                                    :
                                    this.state.categories.map((val,index)=>{
                                        if(val.id==newMenu.categoryid){
                                            return val.category_name
                                        }
                                    })
                                }
                                {
                                    isedit&&editcategory?
                                    null
                                    :
                                    <Fade in={isedit&&!editcategory?true:false}>
                                        <Button 
                                        color='primary' 
                                        // variant="outlined" 
                                        size="small" 
                                        style={{fontSize:'10px',position:'absolute',right:'0',padding:'0'}}
                                        onClick={()=>{this.setState({...refreshedit,editcategory:true})}}
                                        >
                                            <i className="far fa-edit" style={{marginRight:'.5em',fontSize:'12px'}}></i>
                                            {/* <Icon>arrow_right_alt_sharp_icon</Icon> */}
                                            Change
                                        </Button>
                                    </Fade>
                                }
                            </Typography>
                        
                        </CardContent>

                        
                        {/* *********** */}
                        {/* Card Action */}
                        {/* *********** */}
                        <Fade in={index!==editindex&&index!==deleteindex}>
                            <CardActions 
                            style={{margin:'0 0 0 auto'}} 
                            // className='home-card-action'
                            >
                                <Button 
                                color='primary' 
                                variant="outlined" 
                                size="small" 
                                style={{fontSize:'13px'}}
                                onClick={()=>{this.setState({
                                    ...this.INITIAL_STATE,
                                    editindex:index,
                                    newMenu:{
                                        menu_name: menu.menu_name,
                                        image: menu.image,
                                        price: menu.price,
                                        description: menu.description,
                                        categoryid: menu.categoryid
                                    }
                                })}}
                                >
                                    Edit  
                                    {/* <i style={{marginLeft:'8px'}} className="fas fa-shopping-cart"></i> */}
                                </Button>
                                <Button 
                                color='primary' 
                                variant="outlined" 
                                size="small" 
                                style={{fontSize:'13px'}}
                                onClick={()=>{this.setState({deleteindex:index})}}
                                >
                                    Delete
                                    {/* <i style={{marginLeft:'8px'}} className="fas fa-shopping-cart"></i> */}
                                </Button>
                            </CardActions>
                        </Fade>
                        <Fade in={index===editindex}>
                            <CardActions 
                            style={{margin:'0 0 0 auto',position:'absolute',bottom:'0',right:'0'}} 
                            >
                                <Button 
                                color='primary' 
                                variant="outlined" 
                                size="small" 
                                style={{fontSize:'13px'}}
                                onClick={()=>{this.onEditMenu(menu.id)}}
                                >
                                    Submit
                                </Button>
                                <Button 
                                color='primary' 
                                variant="outlined" 
                                size="small" 
                                style={{fontSize:'13px'}}
                                onClick={()=>{this.setState({...this.INITIAL_STATE})}}
                                >
                                    Cancel
                                </Button>
                            </CardActions>
                        </Fade>
                        <Fade in={index===deleteindex}>
                            <CardActions 
                            style={{margin:'0 0 0 auto',position:'absolute',bottom:'0',right:'0'}} 
                            >
                                <Button 
                                color='primary' 
                                variant="outlined" 
                                size="small" 
                                style={{fontSize:'13px'}}
                                onClick={()=>{this.onDeleteMenu(menu.id)}}
                                >
                                    Confirm
                                </Button>
                                <Button 
                                color='primary' 
                                variant="outlined" 
                                size="small" 
                                style={{fontSize:'13px'}}
                                onClick={()=>{this.setState({...this.INITIAL_STATE})}}
                                >
                                    No
                                </Button>
                            </CardActions>
                        </Fade>

                    </Card>
                </Grid>
            )
        })

        menuList.push(this.renderAddMenu())
        return menuList
    }

    renderModal=()=>{
        const{classes} = this.props

        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={this.state.modalOpen}
                // onClose={()=>{this.setState({modalOpen:false})}}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    style: {backgroundColor:'rgba(0,0,0,.3)'}
                }}
                onBackdropClick={()=>{this.setState({modalOpen:false})}}
            >
            <Fade 
                in={this.state.modalOpen}
                // onClose={()=>{setmodalOpen(false)}}
            >
                {/* <div 
                    className={classes.modalMenu}
                    // onClick={()=>{this.setState({modalMenu:false})}}
                    // style={{}}
                > */}

                    <Grid container className={classes.modalMenu} style={{overflow:'auto',padding:'10vh 0 0'}} onClick={()=>{this.setState({modalOpen:false})}}>
                        <Grid item xs={12} sm={6} md={6} style={{padding:'1em 0'}}>
                            <Card className={classes.card} style={{position:'relative',margin:'auto',maxWidth:'300px',height:'auto'}} onClick={(e)=>{e.stopPropagation()}}>
                                <CardMedia
                                    className={classes.cardMediaMenu}
                                    image={this.state.newMenu.image?this.state.newMenu.image:'https://res.cloudinary.com/lush/image/upload/v1568962125/lush_content/products/main/2019/09/gifts_icons-02.png'}
                                    style={
                                        this.state.newMenu.image?
                                        // {minHeight:'130px'}
                                        null
                                        :
                                        {transform: 'scale(.5)'}
                                    }
                                    // title="Image title"
                                />
                                <CardContent 
                                    // className={classes.cardContent} 
                                    // style={{paddingBottom: '1em'}}
                                    style={this.state.newMenu.image?null:{borderTop:'.5px solid rgba(0,0,0,.3)'}}
                                >
                                    <Typography 
                                        gutterBottom variant="h5" 
                                        component="h2" 
                                        style={{fontWeight:'400',letterSpacing:'0px',fontSize:'16px'}}
                                    >
                                        {this.state.newMenu.menu_name?this.state.newMenu.menu_name:'Menu name'}
                                        {/* <i className="fa fa-plus-circle" /> */}
                                    </Typography>
                                    <Typography
                                        // rows={2}
                                        style={{fontWeight:'100',letterSpacing:this.state.newMenu.description?null:'3px',fontSize:'14px', marginBottom:'.5em',minHeight:'50px'}}
                                    >
                                        {this.state.newMenu.description?this.state.newMenu.description:'Description...'}
                                    </Typography>
                                </CardContent>

                                <CardContent style={{marginTop:'auto'}}>
                                    <Typography 
                                        component="h3" 
                                        style={{fontWeight:'400',letterSpacing:'0px',fontSize:'14px'}}
                                    >
                                        Rp {this.state.newMenu.price},00
                                    </Typography>
                                    <Typography 
                                        gutterBottom variant="h5" 
                                        component="h3" 
                                        style={{fontWeight:'100',letterSpacing:'4px',fontSize:'18px',color:'rgba(0,0,0,.5)',marginTop:'.5em',position:'relative'}}
                                    >
                                        {
                                            this.state.newMenu.categoryid?
                                            this.state.categories.map((val,index)=>{
                                                if(val.id==this.state.newMenu.categoryid){
                                                    return val.category_name
                                                }
                                            })
                                            : 'Category'
                                        }
                                    </Typography>

                                </CardContent>
                                <Typography
                                    style={{fontWeight:'100',letterSpacing:'12px',fontSize:'16px', color:'rgba(0,0,0,.3)', margin:'.5em 0', textAlign:'center'}}
                                >
                                    Preview
                                </Typography>
                            </Card>
                        </Grid>

                        {/* **************** */}
                        {/* Form Add Product */}
                        {/* **************** */}
                        <Grid item xs={12} sm={6} md={6} 
                            style={{
                                // border:'1px solid yellow',
                                padding:'1em 2em',
                                // background:'white'
                            }}
                        >
                            <Box 
                                // component={'span'}
                                style={{
                                    padding:'2em',
                                    background:'white',
                                    borderRadius:'4px',
                                    minWidth:'200px',
                                    maxWidth:'350px',
                                    margin:'auto'
                                }}
                                onClick={(e)=>{e.stopPropagation()}}
                            >
                                <form className={classes.form} noValidate 
                                    style={{
                                        position:'relative',
                                        background:'white',
                                        // padding:'2em'
                                    }}
                                >
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                        <MyTextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="Name"
                                            size='small'
                                            autoFocus
                                            onChange={(e)=>{this.setState({newMenu:{...this.state.newMenu,menu_name:e.target.value}})}}
                                            value={this.state.newMenu.menu_name}
                                        />
                                        </Grid>
                                        <Grid item xs={12}>
                                        <MyTextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="Image (url)"
                                            size='small'
                                            onChange={(e)=>{this.setState({newMenu:{...this.state.newMenu,image:e.target.value}})}}
                                            value={this.state.newMenu.image}
                                        />
                                        </Grid>
                                        <Grid item xs={12}>
                                        <MyTextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="Price"
                                            size='small'
                                            onChange={(e)=>{this.setState({newMenu:{...this.state.newMenu,price:e.target.value}})}}
                                            value={this.state.newMenu.price}
                                        />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <MyFormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
                                                <Select
                                                    native
                                                    // value={this.state.newMenu.categoryid}
                                                    onChange={(e)=>{this.setState({newMenu:{...this.state.newMenu,categoryid:e.target.value}})}}
                                                    label="Category"
                                                    inputProps={{
                                                        name: 'category',
                                                        id: 'outlined-age-native-simple',
                                                    }}
                                                >
                                                    <option aria-label="None" value="" />
                                                    {
                                                        this.state.categories.map((val,index)=>{
                                                            return (
                                                                <option key={index} value={val.id}>{val.category_name}</option>
                                                            )
                                                        })
                                                    }
                                                    {/* <option aria-label="None" value="" />
                                                    <option value={10}>Ten</option>
                                                    <option value={20}>Twenty</option>
                                                    <option value={30}>Thirty</option> */}
                                                </Select>
                                            </MyFormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                        <MyTextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="Description"
                                            size='small'
                                            multiline
                                            rows={3}
                                            onChange={(e)=>{this.setState({newMenu:{...this.state.newMenu,description:e.target.value}})}}
                                            value={this.state.newMenu.description}
                                        />
                                        </Grid>
                                        

                                        {/* <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                                            label="I want to receive inspiration, marketing promotions and updates via email."
                                        />
                                        </Grid> */}
                                    </Grid>
                                    {
                                        this.state.modalMessage?
                                        <Typography component='h4' style={this.state.addSucceed?{color:'green',marginTop:'1em'}:{color:'red',marginTop:'1em'}}>
                                            {this.state.modalMessage}
                                        </Typography>
                                        : null

                                    }
                                    {/* <Box component='p' color='red'>{message}</Box> */}
                                    <Button
                                        // type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={this.onAddMenu}
                                        disabled={this.state.addLoading}
                                    >
                                        Add Product
                                    </Button>
                                </form>
                            </Box>
                        </Grid>
                    </Grid>

            </Fade>
            </Modal>
        )
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
                        style={{ width:'100%',position:'absolute',top:'10%',left:'50%',transform:'translate(-50%,-50%)'}} 
                        src={this.props.Store.storeimage}
                        // alt={mainFeaturedPost.imageText} 
                    />
                    <div className={classes.overlay} />

                    <Grid container style={{margin:'56px 0 0'}}>
                        <Grid item xs={12} sm={6} md={6}>
                        <div className={classes.mainFeaturedPostContent}>
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                {this.props.Store.storename}
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

                {/* ********** */}
                {/* Menu List */}
                {/* ********** */}
                <Container style={{background:'white',padding:'0 5vw'}} maxWidth="lg">
                    <Box component='h2' style={{letterSpacing:'3px',color: 'rgba(0,0,0,.85)'}}>Menu</Box>
                    <Grid container spacing={4} style={{paddingBottom: '1em'}}>
                        {this.renderMenu()}
                    </Grid>
                </Container>

                {this.renderModal()}
                
                {/* <Button 
                    color='primary' 
                    variant="contained" 
                    size="small" 
                    style={{fontSize:'13px', position:'fixed',bottom:'10vh',right:'10vw'}}
                    onClick={()=>{this.setState({...this.INITIAL_STATE,modalOpen:true})}}
                >
                    Add Menu
                    <i style={{marginLeft:'8px'}} className="fas fa-shopping-cart"></i>
                </Button> */}

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
 
export default compose(connect(MapstatetoProps), withStyles(styles,{withTheme:true})) (Store);