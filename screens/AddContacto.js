import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList,Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Contacts from 'expo-contacts';
import * as SQLite from "expo-sqlite"
// import SearchBar from "react-native-dynamic-search-bar";

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

const db = openDatabase();



function AddContacto() {
  const [contactos, setContactos] = useState()
  const [temp,setTemp] = useState(0)
  const [sw,setSw] = useState(0)

  // const searchContacto = () {

  // }

  const add = (id,name,tel) => {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from contactos", [], (_, { rows }) => setSw(rows.length) )
        console.log("size:"+sw)
        if(sw >= 3){ 
          alert("Solo puedes tener una maximo de 4 contactos")
          return false
        } else{
          try {
            tx.executeSql("insert into contactos (id_cont, name, telefono) values (?, ? ,?)", [id,name,tel]);
            tx.executeSql("select * from contactos", [], (_, { rows }) =>
              console.log(JSON.stringify(rows)) 
            );
            alert("Datos guardados")
          } catch (error) {
            alert("Error: "+error)
          }
        }
      },    
    ); 
  }; 
  const storeData = (id,name,tel) => {
    try {
      const obj = {
        id: id,
        name: name, 
        tel: tel,
      }
      let sw = false;
      if(temp != null) {
        for (let i = 0; i < 4; i++) {
          if(temp[i].id == id){
            alert("Ya esta registrado")
          }else{
            console.log("Else")
          }
        }
      } 

    } catch (error) {
      alert('Error: ' + error.message);
    }
  } 
  const getCheckData = async (key) => {
    try { 
      let data = await AsyncStorage.getItem("contactos") 
      setTemp(JSON.parse(data))
      console.log(temp)
    } catch (error) {
       
    }
}
 
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({ 
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          // console.log(data)
          setContactos(data)
        }
      }
    })();
    getCheckData()
  }, []);

  return ( 
    <View style={styles.container}>
      <View style={styles.card}>
        <View
          style={styles.cardHeader}
        >
          <Text style={styles.titleHeader}>Contactos de confianza</Text>
        </View>
        <View>

        </View>
        <View style={styles.cardBody}>
          <FlatList
            style={styles.listaContacts}
            data={contactos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.cuadro}><Text style={{fontSize:25,fontWeight: 'bold',color: '#330326'}}>{item.name[0]}</Text></View>
                    <View style={{width:'70%'}}> 
                      <Text style={{ fontSize: 15, fontWeight: 'bold',alignItems: 'center',paddingLeft:10,   }}>
                        {item.name}
                      </Text>
                    </View>
                    <View>
                      <MaterialCommunityIcons name="plus" size={50} color="#608970" onPress={() => add(item.id,item.name,item.phoneNumbers[0].number)} />
                    </View>
                  </View>
                </View>
              )
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default AddContacto


function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}
//! Styles

const styles = StyleSheet.create({
  listaContacts: {
    width: '100%',
    height: 500,
    padding: 20,
    borderBottomColor: '#FDFDFD',
  },
  container: {
    backgroundColor: 'purple',
    flex: 1, // Permite sobreposicioar elementos
  },
  card: {
    backgroundColor: '#C3ADD9',
    marginTop: '20%',
    width: '90%',
    height: '80%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  cardHeader: {
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    width: '70%',
  },
  cardRight: {
    padding: 5,
    // backgroundColor:'yellow',
    width: '30%',
  },
  cardText: {
    color: '#fff',
  },
  cuadro: {
    backgroundColor: '#A15A97',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
})