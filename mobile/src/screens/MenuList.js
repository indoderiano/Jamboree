import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import {APIURL} from '../supports/ApiUrl'
import {connect} from 'react-redux'
// import Modal from 'react-native-modal'
import {View,Text,Button,TouchableWithoutFeedback,Modal,ScrollView,Image,ProgressBarAndroid,TouchableOpacity} from 'react-native'
import {ProgressBar} from '@react-native-community/progress-bar-android'
import MenuAdd from './MenuAdd'

import {stylesCall, primaryColorDark} from '../supports/Styles'



const MenuList = ({route,Transaction,navigation}) => {

    // const {menuList} = route.params

    const [menuList,setmenuList] = useState([])

    const {sellerId} = route.params

    const [showmenu,setshowmenu] = useState(false)

    const [menudata,setmenudata] = useState({
        id: 0,
        name: '',
        image: '',
        message: '',
        quantity: 0,

    })
    

    useEffect(()=>{
        console.log('menumodal didupdate menuList')
        // console.log(Transaction.items)

        Axios(`${APIURL}/menu?sellerid=${sellerId}`)
        .then((res)=>{
            // console.log('menu list')
            // console.log(res.data)
            setmenuList(res.data)
        }).catch((err)=>{
          console.log(err)
        })
    },[])

    const close=()=>{
        setshowmenu(false)
    }

    const renderMenu=()=>{
        if(menuList.length){
            return menuList.map((menu,index)=>{
                // checking if the menu is in the bag
                var qty=0
                var msg=''
                var itemid=0
                Transaction.items.forEach((item,index)=>{
                    // note that, item.id is transaction details id, and menu.id is product id
                    if(item.menu_name===menu.menu_name){
                        qty=item.qty
                        msg=item.msg
                        itemid=item.id
                    }
                })
                return (
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={()=>{
                            // setshowmenu(true);
                            // setmenudata({id:menu.id,name:menu.menu_name,image:menu.image,message:msg,quantity:qty})
                            navigation.navigate('MenuAdd',{itemid:itemid,menuid:menu.id,name:menu.menu_name,image:menu.image,message:msg,quantity:qty})
                        }}
                    >
                        <View style={{
                            backgroundColor:'white',
                            width:'100%',
                            padding:10,
                            flexDirection: 'row',
                            borderRadius:3,
                            marginBottom:10
                        }}>
                            <Image
                                source={{uri:menu.image}}
                                style={{
                                    // flex: 1,
                                    aspectRatio: 4/3.5,
                                    width:'35%',
                                    // marginRight:10
                                }}
                            />
                            <View style={{width:'65%'}}>
                                <View style={{
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    alignItems: 'stretch',
                                    marginBottom:10}}>
                                    <Text style={[{
                                            paddingHorizontal:10,
                                            fontSize:18,
                                            width:'65%',
                                            maxWidth:160,
                                            // borderWidth:1,
                                            // borderColor: 'red'
                                        },
                                        stylesCall.ubuntu]}
                                    >
                                        {menu.menu_name}</Text>
                                    <Text style={
                                        [
                                            stylesCall.ubuntuBold,
                                            {
                                                fontSize:15,
                                                minWidth: 72
                                                // borderColor: 'red',
                                                // borderWidth:1,
                                            }]}>Rp{menu.price}</Text>
                                </View>
                                <Text style={[{fontSize:12,paddingHorizontal:10},stylesCall.ubuntu]}>{menu.description}</Text>
                                <Text style={[stylesCall.ubuntuMedium,{textAlign:'right',color:primaryColorDark,paddingTop:3,marginTop:'auto'}]}>{qty?`${qty} item(s) in the bag`:null}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )
            })
        }else{
            return (
                <View style={stylesCall.center}>
                    <ProgressBarAndroid/>
                </View>
            )
        }
    }

    return (
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={{
                    flex: 1,
                    // justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'rgba(0,0,0,.4)',
                    paddingVertical:20,
                    paddingHorizontal:5,
                    minHeight:'100%',
                    // height:'100%'
                }}>

                    {renderMenu()}

                    {/* <Modal visible={true} animationType='fade' transparent={true}>
                        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor:'rgba(0,0,0,.4)'}}>
                            <ProgressBarAndroid/>
                        </View>
                    </Modal> */}

                </View>
                
            </ScrollView>
    )
}

const MapstatetoProps=(state)=>{
    return {
        User:state.Auth,
        Transaction:state.Transaction
    }
}

export default connect(MapstatetoProps) (MenuList);
