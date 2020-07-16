import React from 'react'
import {View,Text} from 'react-native'
import FA5Icon from 'react-native-vector-icons/FontAwesome5'
import {primaryColor,dark,stylesCall} from '../supports/Styles'


const IconWithBadge = ({name,size,color,focused,badgeCount}) => {

    return (
        <View>
            <FA5Icon name={name} size={size} color={color}/>
            <View
                style={{
                    position: 'absolute',
                    right: -12,
                    top: -3,
                    backgroundColor: focused?'rgba(240,240,240,1)':primaryColor,
                    borderRadius: 12,
                    // borderWidth:0,
                    // borderColor:primaryColor,
                    width: 21,
                    height: 21,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // opacity:focused?.6:1,
                    // transform: [{scale:focused?.8:1}],

                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.48,
                    shadowRadius: 11.95,

                    elevation: 2,
                }}
            >
                <Text style={[
                    {color: focused?primaryColor:'white', fontSize: 12,paddingRight:1},
                    stylesCall.ubuntuMedium
                ]}
                >
                    {badgeCount}</Text>
            </View>
        </View>
    )

}


export default IconWithBadge;