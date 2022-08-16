import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList,Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Contacts from 'expo-contacts';

//? Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

function AddContacto() {
  const [contactos, setContactos] = useState()

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('contacto1', jsonValue)
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('contacto1')
      // console.log(jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      alert('Error: ' + error.message);
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
          setContactos(data)
        }
      }
    })();

    getData()
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View
          style={styles.cardHeader}
        >
          <Text style={styles.titleHeader}>Contactos de confianza</Text>
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
                    <View style={styles.cuadro}><Text style={{fontSize:25,fontWeight: 'bold'}}>{item.name[0]}</Text></View>
                    <View style={{width:'70%'}}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold',alignItems: 'center'   }}>
                        {item.name}
                      </Text>
                    </View>
                    <View>
                      <MaterialCommunityIcons name="plus" size={30} color="green" onPress={() => storeData(item)} />
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

//! Styles

const styles = StyleSheet.create({
  listaContacts: {
    backgroundColor: '#f9c2ff',
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
    backgroundColor: '#C496F5',
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
    backgroundColor: 'red',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
})