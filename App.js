// In App.js in a new project

import React,{useEffect} from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import sql from './utils/db'
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
//?Imports

import HomeScreen from './screens/Home'
import AddContactoScreen from './screens/AddContacto'
//? Functions
const Stack = createNativeStackNavigator();

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        }; 
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}
const db = openDatabase();

//todo Main
function App() {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists contactos (id integer primary key not null,id_cont int unique , name text, telefono text);"
      );
    });
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