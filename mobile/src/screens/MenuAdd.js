import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {APIURL} from '../supports/ApiUrl'

import {Modal,View,Text,Image,ScrollView,ProgressBarAndroid,TouchableOpacity,TouchableWithoutFeedback,Touchable} from 'react-native'
// import Modal from 'react-native-modal'
import {stylesCall,dark,primaryColorDark} from '../supports/Styles'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FA5Icon from 'react-native-vector-icons/FontAwesome5'
import {MyTextField} from '../components/material-ui'
import {Button,COLOR} from 'react-native-material-ui'

import {LoadTransaction} from '../redux/actions'
import { connect } from 'react-redux'



const MenuAdd = ({route,navigation,User,LoadTransaction}) => {

    const {itemid,menuid,name,image,message,quantity} = route.params
    
    const [msg,setmsg] = useState(message)

    const [qty,setqty] = useState(quantity?quantity:1)

    const [loading,setloading] = useState(false)


    // useEffect(()=>{
    //     console.log('didupdate edit modal')
    //     console.log(quantity)
    //     setmsg(message)
    //     setqty(quantity)
    // },[visible]) // when set to [visible] ,then after clicking update, 
    //     // qty value will re-render into its old value for a fraction of time just before updated


    const onAddItem=()=>{
        setloading(true)
        var item={
            userid:User.id,
            menuid,
            quantity:qty,
            message:msg
          }
          Axios.post(`${APIURL}/transactions`,item)
          .then((res)=>{
            console.log('item added to bag')
            console.log(res.data)
            // RELOAD TRANSACTION ITEMS ON BAG
            LoadTransaction(User.id)
            navigation.goBack()
      
          }).catch((err)=>{
            console.log(err)
          }).finally(()=>{
              setloading(false)
          })
    }

    const onEditDetails=()=>{
        setloading(true)
        var edit={
            msg,
            qty
        }
        Axios.put(`${APIURL}/transactions/transactiondetails/${itemid}`,edit)
        .then(async (res)=>{
            // update successful
            // reload transaction redux 

            // ASYNC TYPE MAKES NO DIFFERENT
            try{
                LoadTransaction(User.id)
                navigation.goBack()
            }catch(err){
                console.log(err)
            }
            
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setloading(false)
        })
    }



    return (
        <ScrollView>
        <View style={{
            width:'100%',
            // height:200,
            backgroundColor:'white',
            borderRadius:5,
            padding:0,
            // justifyContent:'space-between'
            // display:'none'
        }}>

            <Image
                source={{uri:image}}
                style={{
                    // flex: 1,
                    aspectRatio: 4/3,
                    width:'100%',
                    // marginRight:10
                }}
            />

            <TouchableWithoutFeedback
                onPress={()=>{navigation.goBack()}}
            >
                <View style={{
                    width:45,
                    height:45,
                    backgroundColor:'white',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    position:'absolute',
                    top:10,
                    left:10,
                    borderRadius:25,
                }}>
                    <IonIcon 
                        name='ios-arrow-back' 
                        size={30} 
                        style={{
                            color:'black',
                            paddingHorizontal:10,
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>

            <View style={{flexDirection:'row',padding:10,borderBottomWidth:1,borderColor:'rgba(0,0,0,.2)',marginBottom:20}}>
                
                <Text style={[stylesCall.ubuntu,{fontSize:24,lineHeight:30,color:dark,paddingLeft:10}]}>
                    {name}
                </Text>
            </View>


            <View style={{flexDirection:'row',padding:15,}}>
                <MyTextField 
                    label='Message'
                    containerStyle={{flex:1,marginBottom:10}}
                    // contentInset={{top:-20,input:0}}
                    // labelOffset={{y0:-20,y1:-25}}
                    // labelTextStyle={[{fontSize:12},stylesCall.ubuntu]}
                    // labelFontSize={14}
                    // style={[{fontSize:15,},]}
                    // autoFocus
                    multiline
                    onChangeText={(text)=>{setmsg(text)}}
                    value={message}
                />
            </View>

            <View style={{padding:10,marginBottom:20}}>

                <View style={[{flexDirection:'row',justifyContent:'center',paddingLeft:10,},]}>
                    
                    <MCIcon 
                        name='minus-circle' 
                        size={28} 
                        style={{color:qty?primaryColorDark:'gray'}}
                        // onPress={()=>{this.onEditDetails(item.id,{qty:item.qty-1})}}
                        onPress={()=>{
                            if(qty-1<=0){
                                setqty(0)
                            }else{
                                setqty(qty-1)
                            }
                        }}
                    />
                    <Text style={[{fontSize:15,paddingHorizontal:20,textAlignVertical:'center'},stylesCall.ubuntu]}>
                        {qty}
                    </Text>
                    {/* <Text style={[{paddingHorizontal:5},stylesCall.ubuntu]}>3</Text> */}
                    <MCIcon 
                        name='plus-circle' 
                        size={28} 
                        style={{color:primaryColorDark}}
                        // onPress={()=>{this.onEditDetails(item.id,{qty:item.qty+1})}}
                        onPress={()=>{setqty(qty+1)}}
                    />
                </View>
            </View>

            
            <View style={{width:'100%',marginTop:0,padding:10,}}>
                <Button 
                    {...qty?{primary:true}:{accent:true}}
                    raised 
                    text={quantity&&qty==0?'Remove':quantity?'Update':'Add to Bag'}
                    // title='asdf'
                    onPress={()=>{
                        if(itemid){
                            onEditDetails()
                        }else{
                            onAddItem()
                        }
                    }}
                    style={{container:{height:50,}}}
                    disabled={loading||(!quantity&&!qty)}
                />
            </View>


        </View>
        </ScrollView>
    )
}

const MapstatetoProps=(state)=>{
    return {
        User: state.Auth
    }
}

export default connect(MapstatetoProps,{LoadTransaction}) (MenuAdd);

