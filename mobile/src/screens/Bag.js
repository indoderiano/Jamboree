import React, { Component, createRef } from 'react'
import {View,Text,Image,ScrollView} from 'react-native'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FA5Icon from 'react-native-vector-icons/FontAwesome5'
import {MyTextField} from '../components/material-ui'
import EditModal from './BagEditModal'
import {Button} from 'react-native-material-ui'

import {stylesCall,primaryColorDark,dark} from '../supports/Styles'

import {LoadTransaction} from '../redux/actions'
import { connect } from 'react-redux';
import Axios from 'axios';
import { APIURL } from '../supports/ApiUrl';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler'

class Bag extends Component {
    state = { 
        // msg: '',
        // msgeditid:-1,
        // editid:-1,
        loading:false,

        visible:false,
        editmessage:'',
        editmenu:'',
        editqty:0,

     }

    componentDidMount(){
        // console.log(props.Transaction)
        // console.log('didmount bag')
    }

    closeModal=()=>{
        this.setState({visible:false,loading:false})
        // this.props.LoadTransaction(this.props.User.id)
    }

    onEditDetails=(id,edit)=>{
        // console.log('onedit')
        
        // console.log(this.textinput)

        Axios.put(`${APIURL}/transactions/transactiondetails/${id}`,edit)
        .then((res)=>{
            // update successful
            // reload transaction redux 
            this.props.LoadTransaction(this.props.User.id)
            this.setState({msgeditid:-1,msg:''})
            // this.setState({msgeditid:!this.state.msgeditid})
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

        return itemListByStore.map((list,index)=>{
            return (
                <View key={index} style={{padding:10,backgroundColor:'white',marginBottom:15}}>

                    <Text style={[{
                        fontSize: 20,
                        paddingTop:5,
                        paddingBottom:10
                    },stylesCall.ubuntuMedium]}>
                        {list.storename}
                    </Text>


                    {
                        list.items.map((item,index)=>{
                            return (
                                
                                <View key={index} style={{marginVertical:10}}>
                                    <View style={{
                                        // backgroundColor:'white',
                                        width:'100%',
                                        // padding:10,
                                        flexDirection: 'row',
                                        borderRadius:3,
                                        marginBottom:10
                                    }}>
                                        <Image
                                            source={{uri:item.image}}
                                            style={{
                                                // flex: 1,
                                                aspectRatio: 4/3.5,
                                                width:'35%',
                                                // marginRight:10
                                            }}
                                        />
                                        <View style={{width:'65%',paddingLeft:10}}>
                                            <View style={{
                                                flexDirection:'row',
                                                justifyContent:'space-between',
                                                alignItems: 'stretch',
                                                marginBottom:0}}>
                                                <Text style={[{
                                                        paddingRight:10,
                                                        marginBottom: 5,
                                                        fontSize:15,
                                                        width:'65%',
                                                        maxWidth:160,
                                                        // borderWidth:1,
                                                        // borderColor: 'red'
                                                    },
                                                    stylesCall.ubuntu]}
                                                >
                                                    {item.menu_name}</Text>
                                                <Text style={
                                                    [
                                                        stylesCall.ubuntuMedium,
                                                        {
                                                            fontSize:13,
                                                            minWidth: 72,
                                                            textAlign:'right'
                                                            // borderColor: 'red',
                                                            // borderWidth:1,
                                                        }]}>Rp{item.price}</Text>
                                            </View>


                                            {
                                                this.state.msgeditid===item.id?
                                                <View style={{flexDirection:'row',justifyContent:'space-between',paddingBottom:30}}>
                                                    {/* {MyTextField.setvalue('test')} */}
                                                    <MyTextField 
                                                        // title='title'
                                                        // ref='child'
                                                        // ref={child=>{this.child=child}}
                                                        label='Message'
                                                        containerStyle={{flex:1}}
                                                        contentInset={{top:-20,input:0}}
                                                        labelOffset={{y0:-20,y1:-25}}
                                                        labelTextStyle={[{fontSize:12},stylesCall.ubuntu]}
                                                        // activeFontSize={15}
                                                        labelFontSize={14}
                                                        style={[{fontSize:15,},]}
                                                        autoFocus
                                                        multiline
                                                        onChangeText={(text)=>{this.setState({msg:text})}}
                                                        value={this.state.msg}
                                                    />
                                                    <TouchableWithoutFeedback 
                                                        style={{textAlign:'right',alignItems:'flex-end'}}
                                                        onPress={()=>{this.onEditDetails(item.id,{msg:this.state.msg})}}
                                                        // onPress={()=>{this.child.setvalue('set')}}
                                                    >
                                                        <Text style={[stylesCall.ubuntuBold,{color:primaryColorDark,fontSize:15,paddingLeft:20}]}>Ok</Text>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                                :
                                                <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                                                    <View>
                                                        <Text style={[stylesCall.ubuntuMedium,{marginBottom:5}]}>
                                                            x{item.qty}
                                                        </Text>
                                                        <Text style={[stylesCall.ubuntu,{}]}>
                                                            {item.msg?`"${item.msg}"`:null}
                                                        </Text>
                                                    </View>
                                                    <TouchableOpacity
                                                        activeOpacity={.6}
                                                        style={{textAlign:'right',alignItems:'flex-end',padding:5,flex:1}}
                                                        onPress={()=>{this.setState({
                                                            // msgeditid:item.id,
                                                            // msg:item.msg,
                                                            loading:true,

                                                            visible:true,
                                                            editid:item.id,
                                                            editmenu:item.menu_name,
                                                            editmessage:item.msg,
                                                            editqty:item.qty
                                                        })}}
                                                    >
                                                        <Text style={[
                                                            stylesCall.ubuntuBold,
                                                            {
                                                                color:primaryColorDark,
                                                                fontSize:15,
                                                                marginTop:'auto'
                                                            }
                                                        ]}>
                                                            Edit
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                            
                                            <View style={[{display:'none',flexDirection:'row',paddingLeft:10,justifyContent:'flex-end'},]}>
                                                {/* <Text style={[{fontSize:15,borderWidth:1,borderColor:'red'},stylesCall.ubuntu]}>
                                                    qty
                                                </Text> */}
                                                <FA5Icon 
                                                    name='trash' 
                                                    size={23} 
                                                    style={{marginRight:30,textAlignVertical:'center',color:'rgba(0,0,0,.6)'}}
                                                    onPress={()=>{this.onEditDetails(item.id,{qty:0})}}
                                                />
                                                <MCIcon 
                                                    name='minus-circle' 
                                                    size={28} 
                                                    style={{color:primaryColorDark}}
                                                    onPress={()=>{this.onEditDetails(item.id,{qty:item.qty-1})}}
                                                />
                                                <Text style={[{fontSize:15,paddingHorizontal:20,textAlignVertical:'center'},stylesCall.ubuntu]}>
                                                    {item.qty}
                                                </Text>
                                                {/* <Text style={[{paddingHorizontal:5},stylesCall.ubuntu]}>3</Text> */}
                                                <MCIcon 
                                                    name='plus-circle' 
                                                    size={28} 
                                                    style={{color:primaryColorDark}}
                                                    onPress={()=>{this.onEditDetails(item.id,{qty:item.qty+1})}}
                                                />
                                            </View>
                                        </View>

                                    </View>

                                
                                </View>
                                
                            )
                        })
                    }
                    


                </View>

            )
        }) 
        
    }


    render() { 
        return (
            <ScrollView>
                <EditModal 
                    visible={this.state.visible}
                    id={this.state.editid}
                    menu={this.state.editmenu}
                    message={this.state.editmessage}
                    quantity={this.state.editqty}
                    close={this.closeModal}
                />
                <View style={{flex:1,alignItems:'center',padding:10,paddingTop:20}}>

                    {/* <Button 
                        primary 
                        raised 
                        text='OK' 
                        title='asdf'
                        // style={buttonProps}
                        onPress={()=>{this.setState({visible:true})}}
                        // disabled={props.User.loading}
                        // disabled
                    />

                    <TouchableOpacity 
                        onPress={()=>{this.setState({visible:true})}}
                        style={{width:200,padding:30,backgroundColor:'blue'}}    
                    >
                        <View style={{
                            backgroundColor: 'lightblue',
                            padding: 12,
                            margin: 16,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 4,
                            borderColor: 'rgba(0, 0, 0, 0.1)',
                        }}>
                            <Text>Press</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableWithoutFeedback 
                        onPress={()=>{this.setState({visible:true});console.log('open')}}
                        style={{padding:30,backgroundColor:'red'}}
                    >
                            <View style={{
                                backgroundColor: 'lightblue',
                                padding: 12,
                                margin: 16,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 4,
                                borderColor: 'rgba(0, 0, 0, 0.1)',
                            }}>
                                <Text>Press</Text>
                            </View>
                    </TouchableWithoutFeedback> */}

                    {this.renderItems()}
                    

                </View>
            </ScrollView>
              

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
 
export default connect(MapstatetoProps,{LoadTransaction}) (Bag);
 