import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
// import Home from '../screens/Home'
import HomeStack from './HomeStack'
import Login from '../screens/Login'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {primaryColor,stylesCall} from '../supports/Styles'
import { Title } from 'native-base'


const Tab=createBottomTabNavigator()


// FROM THE STRUCTURE, THIS MAINTAB IS IDENTIFIED AS PARENT FROM HOME STACK
// THEREFORE TO HIDE THE TAB BAR WHEN OTHER STACK IS SELECTED FROM HOME STACK
// ROUTE.STATE IS USED TO GET VALUE OF WHICH STACK IS BEING RENDERED
// TO READ MORE VISIT https://reactnavigation.org/docs/screen-options-resolution/

const MainTab = () => {


    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                // console.log(route.state)

                var tabBarVisible=true

                const routeName = route.state
                ? // Get the currently active route name in the tab navigator
                route.state.routes[route.state.index].name
                : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
                // In our case, it's "Feed" as that's the first screen inside the navigator
                route.params?.screen || 'Home';

                // console.log('routename')
                // console.log(routeName)

                if(routeName==='Home'){
                    tabBarVisible=true
                }else{
                    tabBarVisible=false
                }
                

                return {
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        size=30

                        if (route.name === 'Home') {
                            iconName = focused
                            ? 'home-variant'
                            : 'home-variant-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }
    
                        // You can return any component that you like here!
                        return <MCIcon name={iconName} size={size} color={color}/>;
                    },
                    // tabBarVisible: route.name==='Home'?true:false
                    tabBarVisible: tabBarVisible
                    
                }
            }}
            tabBarOptions={{
                activeTintColor: primaryColor,
                inactiveTintColor: 'gray',
                style:{padding:5,height:60},
                labelStyle:[{marginBottom:5,fontSize:12},stylesCall.ubuntuMedium],
            }}
            // tabBarLabel='adsf'
            
            
        >
            <Tab.Screen name="Home" component={HomeStack}/>
            <Tab.Screen name="Settings" component={Login} options={{ tabBarLabel: 'Settings!' }}/>
        </Tab.Navigator>
    )
}


export default MainTab;