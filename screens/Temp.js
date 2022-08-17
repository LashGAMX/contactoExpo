import React, {useEffect,useState, useCallback} from 'react';
import {Text,StyleSheet, TouchableOpacity,View} from 'react-native'
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from "expo-sqlite"

//? Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

//todo Main
function Home (){ 

  const [contacto1, setContacto1] = useState()
  const [items, setItems] = useState();
  const getData = async (key) => {
      try { 
        let data = await AsyncStorage.getItem("contacto1")
        setContacto1(JSON.parse(data))
      } catch (error) {
         
      }
  }
  const removeItem = async () => {
    try {
      await AsyncStorage.removeItem("contacto1")
    } catch (error) {
      
    }
  }
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
// db.transaction((tx) => {
//   tx.executeSql("select * from contactos", [], (_, { rows: { _array } }) => setItems(_array) 
// );
// });  
console.log(items) 
const focusEffect = useCallback(() => {
  db.transaction((tx) => {
    tx.executeSql("select * from contactos", [], (_, { rows: { _array } }) => setItems(_array) 
  );
  });  
  // for (let i = 0; i < items.length; i++) {
  //   console.log(items[i].name)  
  // }
  getData()
}, [])
  
useFocusEffect(focusEffect)
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
            <View style={styles.contentContact}>
            { items.map((item)=>{
                <View   style={styles.cardContact}>
                  <View style={styles.circleContact}><Text style={styles.textCircle}>ASD</Text></View>
                  <Text style={styles.nameContact}>{item.name}</Text>
               </View>
              })
            }
            {/* {items.map((item) =>{
              <View key={item.id} style={styles.cardContact}>
                <View style={styles.circleContact}><Text style={styles.textCircle}>{}</Text></View>
                <Text style={styles.nameContact}>{item.name}</Text>
            </View>
            })} */}
              {/* <View style={styles.cardContact}>
                <View style={styles.circleContact}><Text style={styles.textCircle}>{contacto1.name[0]}</Text></View>
                <Text style={styles.nameContact}>{contacto1.name}</Text>
              </View>
              <View style={styles.cardContact}>
                <View style={styles.circleContact}><Text style={styles.textCircle}>{contacto1.name[0]}</Text></View>
                <Text style={styles.nameContact}>{contacto1.name}</Text>
              </View> */}
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
  contentContact: {
    flexDirection: 'row',
    padding: 5,
  },
  circleContact : {
    backgroundColor: 'blue',
    width: 50,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:50,
  },
  nameContact: {
    fontSize: 8
  },
  cardContact: {
    justifyContent: 'center',
    paddingRight:5
  },
  textCircle: {
    color: '#fff',
  },
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