import React, {useEffect, useState} from 'react';
import {Text,View, StyleSheet, FlatList} from 'react-native'
import * as Contacts from 'expo-contacts';

function AddContacto(){

  const [contactos,setContactos] = useState()

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
  }, []);

  return (
    <View style={styles.container}>
      <FlatList 
        style={styles.listaContacts}
        data={contactos}
        keyExtractor={item=>item.id}
        renderItem={({item})=>{
          return (
            <View style={{borderBottomWidth: 2}}>
              <Text style={{fontSize:20, fontWeight: 'bold'}}>{item.name}</Text>
              <Text style={{fontSize:17}}>{item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].number}</Text>
            </View>
          )
        }}
      />
    </View>
  );
}

export default AddContacto

//! Styles

const styles = StyleSheet.create({
  container: {

  },
  listaContacts: {
    width:'100%',
    padding: 20,
    marginTop: 50,
  },
})