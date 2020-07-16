import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {APIURL} from '../supports/ApiUrl'

import {View,Text,ProgressBarAndroid,TouchableOpacity,TouchableWithoutFeedback,Touchable} from 'react-native'
import Modal from 'react-native-modal'
import {stylesCall,dark,primaryColorDark} from '../supports/Styles'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FA5Icon from 'react-native-vector-icons/FontAwesome5'
import {MyTextField} from '../components/material-ui'
import {Button} from 'react-native-material-ui'

import {LoadTransaction} from '../redux/actions'
import { connect } from 'react-redux'



const EditModal = ({visible,id,menu,message,quantity,close,User,LoadTransaction}) => {

    // const [msgeditid,setmsgeditid] = useState(-1)
    // console.log(message)

    const [msg,setmsg] = useState(message)

    const [qty,setqty] = useState(quantity)

    const [loading,setloading] = useState(false)

    const primary={
        primary:true
    }

    useEffect(()=>{
        console.log('didupdate edit modal')
        setmsg(message)
        setqty(quantity)
    },[visible]) // when set to [visible] ,then after clicking update, 
        // qty value will re-render into its old value for a fraction of time just before updated


    const onEditDetails=()=>{
        setloading(true)
        var edit={
            msg,
            qty
        }
        Axios.put(`${APIURL}/transactions/transactiondetails/${id}`,edit)
        .then(async (res)=>{
            // update successful
            // reload transaction redux 

            // ASYNC TYPE MAKES NO DIFFERENT
            try{
                LoadTransaction(User.id,close)
                console.log('close modal')

                // close()
            }catch(err){
                console.log(err)
            }
            // this.setState({msgeditid:-1,msg:''})
            // this.setState({msgeditid:!this.state.msgeditid})
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setloading(false)
        })
    }



    // console.log('render modal')
    // console.log(msg)
    // console.log(qty)
    return (
        <Modal isVisible={visible}  
            // transparent={true}
        >
                {/* <View style={{
                    backgroundColor: 'white',
                    padding: 22,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                }}>
                    <Text>Hello!</Text>
                    <Button text='close' onPress={()=>{close()}}/>
                </View> */}

            <TouchableOpacity
                activeOpacity={1}
                style={{
                    // display:'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // paddingHorizontal:20,
                    // backgroundColor:'rgba(0,0,0,.4)'
                }}
                onPress={()=>{close()}}
            >

                <TouchableWithoutFeedback onPress={(e)=>{e.stopPropagation()}}>
                    <View style={{
                        width:'100%',
                        // height:200,
                        backgroundColor:'white',
                        borderRadius:5,
                        padding:0,
                        // justifyContent:'space-between'
                        // display:'none'
                    }}>

                        <View style={{flexDirection:'row',padding:10,borderBottomWidth:1,borderColor:'rgba(0,0,0,.2)',marginBottom:20}}>
                            <IonIcon 
                                name='ios-arrow-back' 
                                size={30} 
                                style={{color:'gray',paddingHorizontal:10}}
                                onPress={()=>{close()}}
                            />
                            <Text style={[stylesCall.ubuntu,{fontSize:24,lineHeight:30,color:dark,paddingLeft:10}]}>
                                {menu}
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
                                {/* <Text style={[{fontSize:15,borderWidth:1,borderColor:'red'},stylesCall.ubuntu]}>
                                    qty
                                </Text> */}
                                <FA5Icon 
                                    name='trash' 
                                    size={23} 
                                    style={{marginRight:30,textAlignVertical:'center',color:'rgba(0,0,0,.6)'}}
                                    onPress={()=>{setqty(0)}}
                                />
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
                                // primary
                                raised 
                                text={qty?'Update':'Remove'}
                                title='asdf'
                                onPress={()=>{onEditDetails()}}
                                style={{container:{height:50}}}
                                disabled={loading}
                                // disabled
                            />
                        </View>


                    </View>
                </TouchableWithoutFeedback>

            </TouchableOpacity>
        </Modal>
    )
}

const MapstatetoProps=(state)=>{
    return {
        User: state.Auth
    }
}

export default connect(MapstatetoProps,{LoadTransaction}) (EditModal);

