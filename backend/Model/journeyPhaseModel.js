// // const db = require('./db');

// // class JourneyPhaseModel {
// //   getAllItemsByJourneyMapId(journeyMapId) {
// //     return db.query("SELECT * FROM journeyPhase WHERE journeyMap_id = ?", [journeyMapId])
// //       .then(([rows]) => {
// //         return rows;
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching journeyPhases by journeyMapId:", error);
// //         throw error;
// //       });
// //   }

// //   getAllItems() {
// //     return db.query("SELECT * FROM journeyPhase")
// //       .then(([rows]) => {
// //         return rows;
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching journeyPhase:", error);
// //         throw error;
// //       });
// //   }

// //   insertJourneyPhase(data) {
// //     if (data.posX !== undefined) {
// //       const { posX, journeyMap_id, linePos, length, description, emojiTag } = data;
// //       return db.execute("INSERT INTO journeyPhase (posX, journeyMap_id, linePos, length, description, emojiTag) VALUES (?, ?, ?, ?, ?, ?)",
// //       [posX, journeyMap_id, linePos, length, description, emojiTag])
// //         .then(() => true)
// //         .catch((error) => {
// //           console.error("Error inserting journeyPhase:", error);
// //           throw error;
// //         });
// //     } else {
// //       return Promise.resolve(false);
// //     }
// //   }
  

// //   updateJourneyPhase(data) {
// //     const { journeyPhase_id, posX, description, width } = data;
  
// //     return db.execute("UPDATE journeyPhase SET posX = ?, description = ?, length = ? WHERE journeyPhase_id = ?", [posX, description, width, journeyPhase_id ])
// //       .then(() => true)
// //       .catch((error) => {
// //         console.error("Error updating journeyPhase:", error);
// //         throw error;
// //       });
// //   }

// //   deleteJourneyPhase(journeyPhase_id) {
// //     return db.execute("DELETE FROM journeyPhase WHERE journeyPhase_id = ?", [journeyPhase_id])
// //       .then(() => true)
// //       .catch((error) => {
// //         console.error("Error deleting journeyPhase:", error);
// //         throw error;
// //       });
// //   }

// //   getLastInsertedId() {
// //     return db.query("SELECT LAST_INSERT_ID() as last_inserted_id")
// //       .then(([rows]) => {
// //         return rows[0].last_inserted_id;
// //       })
// //       .catch((error) => {
// //         console.error("Error getting last inserted ID:", error);
// //         throw error;
// //       });
// //   }

// //   deleteByJourneyMapId(journeyMapId) {
// //     return db.execute("DELETE FROM journeyPhase WHERE journeyMap_id = ?", [journeyMapId])
// //     .then(() => true)
// //     .catch((error) => {
// //       console.error("Error deleting journeyPhase:", error);
// //       throw error;
// //     });
// //   }
  
// // }

// // module.exports = JourneyPhaseModel;

// // backend/Model/journeyMapModel.js
// const db = require('./db');

// class JourneyMapModel {
//   createNewMap(userId, mapName) {
//     return db.execute("INSERT INTO journeymap (map_name, user_id) VALUES (?, ?)", [mapName, userId])
//       .then(() => {
//         return this.getLastInsertedMap(userId);
//       })
//       .catch((error) => {
//         console.error("Error creating new journey map:", error);
//         throw error;
//       });
//   }

//   getLastInsertedMap(userId) {
//     return db.query("SELECT journeymap_id, map_name FROM journeymap WHERE user_id = ? ORDER BY journeymap_id DESC LIMIT 1", [userId])
//       .then(([rows]) => {
//         if (rows.length > 0) {
//           return { id: rows[0].journeymap_id, name: rows[0].map_name };
//         } else {
//           return null;
//         }
//       })
//       .catch((error) => {
//         console.error("Error getting last inserted map:", error);
//         throw error;
//       });
//   }

//   getUserMaps(userId) {
//     return db.query("SELECT journeymap_id, map_name FROM journeymap WHERE user_id = ?", [userId])
//       .then(([rows]) => {
//         const maps = rows.map(row => ({ id: row.journeymap_id, name: row.map_name }));
//         return maps;
//       })
//       .catch((error) => {
//         console.error("Error getting user maps:", error);
//         throw error;
//       });
//   }

//   async updateMapName(journeymapId, newName) {
//     try {
//       const result = await db.execute("UPDATE journeymap SET map_name = ? WHERE journeymap_id = ?", [newName, journeymapId]);
//       return result.affectedRows > 0;
//     } catch (error) {
//       console.error("Error updating map name:", error);
//       throw error;
//     }
//   }

//   async deleteMap(journeymapId) {
//     const connection = await db.getConnection(); 
//     try {
//       await connection.beginTransaction();

//       // 1. Apaga os cartões/elementos vinculados ao mapa (nomes corrigidos para o padrão Linux)
//       await connection.execute("DELETE FROM contactpoint WHERE journeyMap_id = ?", [journeymapId]);
//       await connection.execute("DELETE FROM emotion WHERE journeyMap_id = ?", [journeymapId]);
//       await connection.execute("DELETE FROM thought WHERE journeyMap_id = ?", [journeymapId]);
//       await connection.execute("DELETE FROM useraction WHERE journeyMap_id = ?", [journeymapId]);
      
//       // 2. Apaga o Cenário vinculado a este mapa
//       await connection.execute("DELETE FROM scenario WHERE journeyMap_id = ?", [journeymapId]);

//       // 3. Apaga as Fases vinculadas a este mapa
//       await connection.execute("DELETE FROM journeyphase WHERE journeyMap_id = ?", [journeymapId]);

//       // 4. Finalmente, apaga o Mapa
//       const [result] = await connection.execute("DELETE FROM journeymap WHERE journeyMap_id = ?", [journeymapId]);

//       await connection.commit();
      
//       return result.affectedRows > 0;
//     } catch (error) {
//       await connection.rollback();
//       console.error("Error deleting user maps:", error);
//       throw error;
//     } finally {
//       connection.release();
//     }
//   }

//   getMapOwner(journeymapId) {
//     return db.query("SELECT user_id as uid FROM journeymap WHERE journeymap_id = ?", [journeymapId])
//       .then(([rows]) => {
//         if (rows.length > 0) {
//           return { uid: rows[0].uid };
//         } else {
//           return null;
//         }
//       })
//       .catch((error) => {
//         console.error("Error getting map owner:", error);
//         throw error;
//       });
//   }
// }

// module.exports = JourneyMapModel;

// backend/Model/journeyPhaseModel.js
const db = require('./db');

class JourneyPhaseModel {
  getAllItemsByJourneyMapId(journeyMapId) {
    return db.query("SELECT * FROM journeyphase WHERE journeyMap_id = ?", [journeyMapId])
      .then(([rows]) => rows)
      .catch(error => { throw error; });
  }

  createItem(itemData) {
    return db.execute(
      "INSERT INTO journeyphase (journeyMap_id, linePos, posX, length, description, emojiTag) VALUES (?, ?, ?, ?, ?, ?)",
      [itemData.journeyMap_id, itemData.linePos, itemData.posX, itemData.length, itemData.description, itemData.emojiTag]
    ).then(([result]) => result.insertId)
     .catch(error => { throw error; });
  }

  updateItem(itemId, itemData) {
    return db.execute(
      "UPDATE journeyphase SET linePos = ?, posX = ?, length = ?, description = ?, emojiTag = ? WHERE journeyPhase_id = ?",
      [itemData.linePos, itemData.posX, itemData.length, itemData.description, itemData.emojiTag, itemId]
    ).then(([result]) => result.affectedRows > 0)
     .catch(error => { throw error; });
  }

  deleteItem(itemId) {
    return db.execute("DELETE FROM journeyphase WHERE journeyPhase_id = ?", [itemId])
      .then(([result]) => result.affectedRows > 0)
      .catch(error => { throw error; });
  }
}

module.exports = new JourneyPhaseModel();