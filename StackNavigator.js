import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AddDetails from './screens/AddDetails';
import Lists from './screens/Lists';
import { NavigationContainer } from '@react-navigation/native';
import EditDetails from './screens/EditDetails';

const StackNavigator = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Add" component={AddDetails} options={{ tabBarLabel: "Add", headerShown: false, tabBarIcon: ({ focused }) => focused ? (<Ionicons name="person-add" size={24} color="black" />) : (<Ionicons name="person-add-outline" size={24} color="black" />) }} />
                <Tab.Screen name="List" component={Lists} options={{ tabBarLabel: "ANC List", headerShown: false, tabBarIcon: ({ focused }) => focused ? (<Entypo name="list" size={24} color="black" />) : (<Ionicons name="list-outline" size={24} color="black" />) }} />
            </Tab.Navigator>
        )
    }


    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Edit" component={EditDetails} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})