import React from 'react'
import {View,Text} from 'react-native'
import {stylesCall,primaryColor} from '../supports/Styles'


const Cover = () => {

    return (
        <View style={stylesCall.center}>
            <Text style={[stylesCall.ubuntuMedium,{fontSize:50,color:primaryColor,textAlign:'center',paddingHorizontal:20}]}>Festival Jamboree</Text>
        </View>
    )
}

export default Cover;