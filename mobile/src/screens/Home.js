import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import MenuModal from './MenuModal'

import {
    ScrollView,
    View,
    Modal,
    ProgressBarAndroid,
    Text,
    Card,
    ImageBackground,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    StyleSheet,
    RefreshControl
} from 'react-native'
import {OutlinedTextField,FilledTextField,TextField} from 'react-native-material-textfield'
import {Button} from 'react-native-material-ui'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {TextUbuntu} from '../components/material-ui'

import { APIURL } from '../supports/ApiUrl'
import { connect } from 'react-redux'
import { ProgressBar } from 'native-base'


function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}


Home = (props) => {

    const [stores,setstores] = useState([])

    const [modal,setmodal] = useState(false)

    const [menu,setmenu] = useState([])

    const [loading,setloading] = useState(false)

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    const mainFeaturedPost = {
        title: 'Festival Jamboree',
        description:
          "Hello world, this is festival jamboree. While you can come and visit the festival, you can also buy our products online",
        image: {uri: "https://source.unsplash.com/random"},
        imgText: 'main image description',
        linkText: 'Continue reading…',
    };

    useEffect(()=>{
        console.log('home didmount')
        Axios.get(`${APIURL}/sellers`)
        .then((res)=>{
            // console.log(res.data)
            setstores(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const loadMenu=(sellerid,storename)=>{
        // setmodal(true)
        
        props.navigation.navigate('MenuList',{sellerId:sellerid,storeName:storename})
        
        // setloading(true)
        // Axios(`${APIURL}/menu?sellerid=${sellerid}`)
        // .then((res)=>{
        // //   setmenu(res.data)
        //   setloading(false)
        // //   props.navigation.navigate('MenuList',{menuList:res.data,storeName:storename})
        // }).catch((err)=>{
        //   console.log(err)
        // })
    }

    // const closeModal=()=>{
    //     // setmodal(false)
    //     setmenu([])
    // }


    const renderStores=()=>{
        console.log('render store')
        return stores.map((store,index)=>{
            return (
                
                <TouchableOpacity 
                    key={index}
                    activeOpacity={.5}
                    style={{width:'100%'}} 
                    onPress={()=>{loadMenu(store.id,store.storename)}}
                >
                    <View style={{
                        width: '100%',
                        padding:5,
                        paddingBottom:10
                    }}>
                        <View style={{
                            width:'100%',
                            display:'flex',
                            // flexDirection: 'row',
                            borderRadius: 4,
                            overflow: 'hidden',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 8,
                            },
                            shadowOpacity: 0.44,
                            shadowRadius: 10.32,

                            elevation: 4,    
                        }}>
                                <Image
                                    style={{
                                        flex: 1,
                                        aspectRatio: 4/1.3,
                                        resizeMode: 'cover'
                                    }}
                                    source={{
                                    uri: store.storeimage,
                                    }}
                                    // resizeMethod='resize'
                                />
                                <View style={styles.overlay}/>
                                
                                <TextUbuntu style={{
                                    position: 'absolute',
                                    top: 5,
                                    left: 5,
                                    color: 'white',
                                    fontSize: 15,
                                    letterSpacing: 4
                                }}>
                                    {store.storename}
                                </TextUbuntu>

                                <View style={{
                                    position: 'absolute',
                                    bottom: "50%",
                                    right: 10,
                                    transform: ([{translateY:15}]),
                                    opacity: .8
                                }}>
                                    <View style={{flexDirection:'row'}}>
                                        {/* <Text style={{color:'orange'}}>
                                            menu
                                        </Text> */}
                                        <Icon 
                                            name='long-arrow-alt-right' 
                                            color='orange' 
                                            size={30}
                                            style={{
                                                paddingTop:0,
                                                paddingLeft:5,
                                                textAlignVertical:'top',
                                            }}
                                        />
                                    </View>
                                </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    return (
        <View style={{flex:1}}>
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >

            <View style={{position:'relative'}}>
                <Image
                    style={{
                        position: 'absolute',
                        top: 0,
                        left : 0,
                        width:'100%',
                        height: '100%',
                    }}
                    source={{
                    uri: 'https://source.unsplash.com/random',
                    }}
                    // resizeMode='cover'
                    resizeMethod='resize'
                />
                <View style={styles.overlay}/>

                <View style={styles.mainBox}>
                    <TextUbuntu style={styles.mainTitle}>{mainFeaturedPost.title}</TextUbuntu>
                    <TextUbuntu style={styles.mainDescription}>
                        {mainFeaturedPost.description}
                    </TextUbuntu>
                </View>

                <View 
                    style={{
                        padding: 40,
                        display: 'flex',
                        // justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <View style={{
                        width: 200,
                        padding:15,
                        backgroundColor: 'rgba(255,255,255,.6)',
                        borderRadius: 4
                    }}>
                        <TextUbuntu medium style={styles.entryBoxTitle}>
                            Buy entry ticket here
                        </TextUbuntu>
                        <OutlinedTextField 
                            label='Entry ticket(s)'
                            tintColor='rgba(0,0,0,.5)'
                            // type={''}
                        />

                        <View
                            style={{
                                // flexDirection: 'row',
                                // alignItems: 'flex-end',
                                // justifyContent: 'flex-end'
                            }}
                        >
                            <Button 
                                raised
                                primary
                                text='add to bag'
                                icon='shopping-cart'
                                // icon={{name: 'facebook', type: 'font-awesome'}}
                                style={{text:{color:'rgba(0,0,0,.75)'}}}
                            />
                        </View>
                    </View>
                </View>
            </View>


            {/* STORES */}

            <View style={{
                paddingVertical:20,
                paddingHorizontal:10,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                flexWrap: 'wrap',}}
            >
                <TextUbuntu medium style={styles.storesTitle}>Stores</TextUbuntu>
                {renderStores()}
            </View>

            <Modal visible={loading} animationType='fade' transparent={true}>
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor:'rgba(0,0,0,.4)'}}>
                    <ProgressBarAndroid/>
                </View>
            </Modal>

            {/* <MenuModal isOpen={modal} menuList={menu} closeModal={closeModal}/> */}
            


        </ScrollView>
        </View>
    )
}


const styles=StyleSheet.create({
    
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.3)'
    },
    ubuntu: {
        fontFamily: 'Ubuntu-Light',
    },
    medium: {
        fontFamily: 'Ubuntu-Medium'
    },
    bold: {
        fontFamily: 'Ubuntu-Bold'
    },

    mainBox: {
        marginTop: 50,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 20,
    },

    mainTitle: {
        color:'white',
        fontSize:30,
        marginBottom:10
    },
    mainDescription: {
        color:'white',
        fontSize:17,
        lineHeight:23
    },
    entryBoxTitle: {
        color:'rgba(0,0,0,.65)',
        fontSize:17,
        fontWeight:'900',
        marginBottom:20
    },
    storesTitle: {
        fontSize: 25,
        marginBottom: 10,
        paddingHorizontal:5,
        width:'100%'
    },

    checkborder: {
        borderWidth:1,
        borderColor: 'red'
    }
})

const MapstatetoProps=(state)=>{
    return {
        User: state.Auth
    }
}

export default connect(MapstatetoProps) (Home);