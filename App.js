// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//?Imports

import HomeScreen from './screens/Home'
import AddContactoScreen from './screens/AddContacto'
//? Functions
const Stack = createNativeStackNavigator();


//todo Main
function App() {
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