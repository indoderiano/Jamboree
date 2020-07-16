import React from 'react'
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack'
import Home from '../screens/Home'
import MainTab from './MainTab'
import MenuList from '../screens/MenuList'
import MenuAdd from '../screens/MenuAdd'


const Stack=createStackNavigator()

const HomeStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name='MainTab' component={MainTab} options={{headerShown:false}}/>
            <Stack.Screen 
                name='MenuList'
                component={MenuList} 
                options={({route})=>({
                    headerTitle:route.params.storeName
                })}
            />
            <Stack.Screen
                name='MenuAdd'
                component={MenuAdd}
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}

export default HomeStack