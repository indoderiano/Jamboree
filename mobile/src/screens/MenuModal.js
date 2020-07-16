import React, { useEffect } from 'react'
// import Modal from 'react-native-modal'
import {View,Text,Button,TouchableWithoutFeedback,Modal,ScrollView,Image,ProgressBarAndroid,TouchableOpacity} from 'react-native'

import {stylesCall} from '../supports/Styles'



const MenuModal = ({isOpen,closeModal,menuList}) => {

    useEffect(()=>{
        console.log('menumodal didupdate menuList')
        // console.log(menuList)
    },[menuList])

    const renderMenu=()=>{
        if(menuList.length){
            return menuList.map((menu,index)=>{
                return (
                    <View key={index} style={{
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
                        </View>
                    </View>
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
        <Modal visible={isOpen} animationType='fade' transparent={true}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <TouchableWithoutFeedback
                    style={{borderWidth:1,borderColor:'red',width:'100%',height:'100%'}}
                    onPress={()=>{closeModal()}}
                >
                    <View style={{
                        flex: 1,
                        // justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,.4)',
                        paddingVertical:20,
                        paddingHorizontal:5,
                        minHeight:'100%',
                        // height:'100%'
                    }}>

                        {renderMenu()}

                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </Modal>
    )
}

export default MenuModal;
