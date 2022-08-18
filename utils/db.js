import React, {useState} from 'react';
import * as SQLite from "expo-sqlite"
import { AppRegistry, Platform } from 'react-native'

export function openDatabase() {
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
 };

export function createTables(db) {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists contactos (id integer primary key not null,id_cont int , name text, telefono text);"
    );
  });
}

export function getContactos(db){
  let temp = []
     db.transaction( (tx) => {
       tx.executeSql("select * from contactos", [], (_, { rows: { _array } }) => temp = _array 
      );
    });  
  return temp
}
export function deleteContacto(db){
  db.transaction(
    (tx) => {
      tx.executeSql(`delete from contactos where id = ?;`, [id]);
    })
}
export function createContacto(db,id,name,tel){
  let sw = 0
  db.transaction(
    (tx) => {
      let model = tx.executeSql("select * from contactos", [], (_, { rows }) => rows.length)
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
}