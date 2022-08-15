import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
// import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { StatusBar } from 'expo-status-bar';

export default function App() {

  const [contacts,setContacts] = useState()


  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data)
          // const contact = data[0];
          // console.log(contact);
        }
      }
    })();
  }, []);
  return (
    <FlatList 
    style={{width:'100%',padding: 20,marginTop:50}}
      data={contacts}
      keyExtractor={item=>item.id}
      renderItem={({item})=>{
        return(
          <View style={{borderBottomWidth:2}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>{item.name}</Text>
            <Text style={{fontSize:17}}>{item.PhoneNumbers && item.PhoneNumbers[0] && item.PhoneNumbers[0].number}</Text>
          </View>
        )
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
