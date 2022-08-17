import * as SQLite from "expo-sqlite"
import React from "react"

// export async function openDatabase ()

const openDatabase = () => {
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
