import React, {useEffect,useState} from 'react';
import {Text,StyleSheet, TouchableOpacity,View} from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

//? Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

//todo Main
function Home (){ 

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  useEffect(() => {
  
  })
  
  const Navigator = useNavigation()

  return(
    <View style={styles.container}>
      <View style={styles.card}>
        <View
          style={styles.cardHeader}
        >
          <Text style={styles.titleHeader}>Contactos de confianza</Text>
        </View>
        <View style={styles.cardBody}> 
          <View style={styles.cardLeft}>
            <View>
              <View><Text>{ getData('contacto1').name}</Text></View>
            </View>
          </View>
          <View style={styles.cardRight}>
            <Text style={styles.cardText} onPress={() => Navigator.navigate('addContacto')}><MaterialCommunityIcons name="account-plus" size={20} color="green" /> Agregar</Text>
            <Text style={styles.cardText}><MaterialCommunityIcons name="account-minus" size={20} color="red" /> Eliminar</Text>
          </View>
        </View>
      </View>
    </View> 
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor:'purple',
    flex: 1, // Permite sobreposicioar elementos
  },
  card: {
    backgroundColor:'#C496F5',
    marginTop:'20%',
    width:'90%',
    height: 150,
    alignSelf: 'center',
    borderRadius: 20,
  },
  cardHeader: {
    backgroundColor:'#f1f1f1',
    alignItems: 'center',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    marginTop: 0,
  },
  titleHeader: {
    fontSize: 25,
  },
  cardBody: {
    padding: 5,
    flexDirection: 'row',
  },
  cardLeft: {
    // backgroundColor:'red',
    width:'70%',
  },
  cardRight: {
    padding: 5,
    // backgroundColor:'yellow',
    width:'30%',
  },
  cardText: {
    color:'#fff',
  }
})