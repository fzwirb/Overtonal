import * as React from 'react';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens 

import Metronome from '../screens/Metronome';
import Tuner from '../screens/Tuner';

const metScreen = 'Metronome';
const tunerScreen = 'Tuner';

const Tab = createBottomTabNavigator();
 
export default function Navbar() {
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={metScreen}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let routeName = route.name;

                    if(routeName == metScreen) {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (routeName == tunerScreen) {
                        iconName = focused ? 'list' : 'list-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}>
            <Tab.Screen name ={metScreen} component={Metronome}/>
            <Tab.Screen name ={tunerScreen} component={Tuner}/>


            </Tab.Navigator>
        </NavigationContainer>
    )

}