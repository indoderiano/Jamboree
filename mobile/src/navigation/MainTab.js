import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
// import HomeStack from './HomeStack'
import Home from '../screens/Home'
import Bag from '../screens/Bag'
import Login from '../screens/Login'
import ModalExample from '../screens/ModalExample'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FA5Icon from 'react-native-vector-icons/FontAwesome5'
import FIcon from 'react-native-vector-icons/Foundation'
import IconWithBadge from '../components/IconWithBadge'
import {primaryColor,stylesCall} from '../supports/Styles'
import { Title } from 'native-base'
import {connect} from 'react-redux'


const Tab=createBottomTabNavigator()

const MainTab = ({Transaction}) => {


    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                return {
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        size=30

                        if (route.name === 'Home') {
                            iconName = focused
                            ? 'home-variant'
                            : 'home-variant-outline';
                            return <MCIcon name={iconName} size={size} color={color}/>;
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'settings' : 'settings-outline';
                            return <MCIcon name={iconName} size={size} color={color}/>;
                        } else if (route.name === 'Bag') {
                            iconName = 'shopping-bag'
                            let basedColor = focused ? 'white' : primaryColor
                            return (
                                <IconWithBadge 
                                    name={iconName} 
                                    size={size-5} 
                                    color={color} 
                                    focused={focused} 
                                    badgeCount={Transaction.totalQty}
                                />
                            ) 
                        }
    
                        // You can return any component that you like here!
                        // return <MCIcon name={iconName} size={size} color={color}/>;
                    },
                    // tabBarVisible: route.name==='Home'?true:false
                    // tabBarVisible: tabBarVisible
                    
                }
            }}
            tabBarOptions={{
                activeTintColor: primaryColor,
                inactiveTintColor: 'gray',
                style:{padding:5,height:60},
                labelStyle:[{marginBottom:5,fontSize:12},stylesCall.ubuntuMedium],
            }}
            
        >
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Bag" component={Bag}/>
            <Tab.Screen name="Settings" component={Login} options={{ tabBarLabel: 'Settings!' }}/>
        </Tab.Navigator>
    )
}

const MapstatetoProps=(state)=>{
    return {
        Transaction: state.Transaction
    }
}


export default connect(MapstatetoProps) (MainTab);