
import React, {useEffect,useState, useCallback} from 'react';
import {Text,StyleSheet, TouchableOpacity,View} from 'react-native'
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import * as SQLite from "expo-sqlite"
import { Octicons } from '@expo/vector-icons';

//? Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
function cardContactos(status) {
  const [items, setItems] = useState([]);

const db = openDatabase();  

useEffect(() => { 
  obtenerDatos()
})
const obtenerDatos = async () => {
  await db.transaction(async (tx) => {
    await tx.executeSql("select * from contactos", [], (_, { rows: { _array } }) => setItems(_array) 
    );
  });  
}
const deleteData = async (id) => {
  db.transaction(
    (tx) => {
      tx.executeSql(`delete from contactos where id = ?;`, [id]);
    })
}
return (
        items.map((item)=>{
          return(
          <View key={item.id}  style={styles.cardContact}>
            <View style={styles.circleContact}>
              {status ? 
                <TouchableOpacity style={{right:-18,top:-3}}
                  onPress={() => deleteData(item.id)}
                  >
                  <MaterialCommunityIcons name="close" size={24} color="#F20505" />
                </TouchableOpacity>
              : <Text></Text> }
              <Octicons  style={styles.textCircle} name="person" size={30} color="black" />
            </View>
            <Text style={styles.nameContact}>{item.name}</Text> 
          </View>
          ) 
        })
  )
}
//todo Main
function Home (){ 
  const [std, setStd] = useState(0);

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

// const focusEffect = useCallback(async () => {
//   await db.transaction(async (tx) => {
//     await tx.executeSql("select * from contactos", [], (_, { rows: { _array } }) => setItems(_array) 
//   );  
//   });  
// }, [])

// useFocusEffect(focusEffect)
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
          {cardContactos(std)}
            </View>
          </View>
          <View style={styles.cardRight}> 
            <Text style={styles.cardText} onPress={() => Navigator.navigate('addContacto')}><MaterialCommunityIcons name="account-plus" size={30} color="#22A62B" /> Agregar</Text>
            <Text style={styles.cardText} onPress={() => std ? setStd(0) : setStd(1)}><MaterialCommunityIcons name="account-minus" size={30} color="#F20505" /> Eliminar</Text>
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
    backgroundColor: '#FDFCFE',
    width: 50,
    height:50, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:50,
  },
  nameContact: {
    fontSize: 8,
    color: 'white'
  },
  cardContact: {
    justifyContent: 'center',
    paddingRight:5
  },
  textCircle: {
    color: '#000',
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
    paddingTop:10,
    color:'#fff',
  },
  deleteContact: {

  }
})