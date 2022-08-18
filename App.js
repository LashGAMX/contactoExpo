// In App.js in a new project

import React,{useEffect} from 'react';
import { AppRegistry, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SQLite from "expo-sqlite";
import {openDatabase,createTables} from './utils/Db'

//?Imports

import HomeScreen from './screens/Home'
import AddContactoScreen from './screens/AddContacto'
//? Functions
const Stack = createNativeStackNavigator()
const db = openDatabase() 

//todo Main
function App() {
  useEffect(() => {
    createTables(db)
  },[])
  return (
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="addContacto" component={AddContactoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;