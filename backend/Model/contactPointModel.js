// // ContactPointModel.js

// const db = require('./db');

// class ContactPointModel {
//   getAllItemsByJourneyMapId(journeyMapId) {
//     return db.query("SELECT * FROM contactpoint WHERE journeyMap_id = ?", [journeyMapId])
//       .then(([rows]) => {
//         return rows;
//       })
//       .catch((error) => {
//         console.error("Error fetching contactpoints by journeyMapId:", error);
//         throw error;
//       });
//   }

//   getAllItems() {
//     return db.query("SELECT * FROM contactpoint")
//       .then(([rows]) => {
//         return rows;
//       })
//       .catch((error) => {
//         console.error("Error fetching contactpoints:", error);
//         throw error;
//       });
//   }

//   insertContactPoint(data) {
//     if (data.posX !== undefined) {
//       const { posX, journeyMap_id, linePos, length, description, emojiTag } = data;
//       return db.execute("INSERT INTO contactpoint (posX, journeyMap_id, linePos, length, description, emojiTag) VALUES (?, ?, ?, ?, ?, ?)",
//         [posX, journeyMap_id, linePos, length, description, emojiTag])
//         .then(() => true)
//         .catch((error) => {
//           console.error("Error inserting contactpoint:", error);
//           throw error;
//         });
//     } else {
//       return Promise.resolve(false);
//     }
//   }

//   updateContactPoint(data) {
//     const { contactPoint_id, posX, description, width } = data;

//     return db.execute("UPDATE contactpoint SET posX = ?, description = ?, length = ? WHERE contactPoint_id = ?", [posX, description, width, contactPoint_id])
//       .then(() => true)
//       .catch((error) => {
//         console.error("Error updating contactpoint:", error);
//         throw error;
//       });
//   }

//   deleteContactPoint(contactPoint_id) {
//     return db.execute("DELETE FROM contactpoint WHERE contactPoint_id = ?", [contactPoint_id])
//       .then(() => true)
//       .catch((error) => {
//         console.error("Error deleting contactpoint:", error);
//         throw error;
//       });
//   }

//   getLastInsertedId() {
//     return db.query("SELECT LAST_INSERT_ID() as last_inserted_id")
//       .then(([rows]) => {
//         return rows[0].last_inserted_id;
//       })
//       .catch((error) => {
//         console.error("Error getting last inserted ID:", error);
//         throw error;
//       });
//   }

//   deleteByJourneyMapId(journeyMapId) {
//     return db.execute("DELETE FROM contactpoint WHERE journeyMap_id = ?", [journeyMapId])
//     .then(() => true)
//     .catch((error) => {
//       console.error("Error deleting contactpoint:", error);
//       throw error;
//     });
//   }
// }

// module.exports = ContactPointModel;

// backend/Model/contactPointModel.js
const db = require('./db');

class ContactPointModel {
  getAllItemsByJourneyMapId(journeyMapId) {
    return db.query("SELECT * FROM contactpoint WHERE journeyMap_id = ?", [journeyMapId])
      .then(([rows]) => rows)
      .catch((error) => { throw error; });
  }

  createItem(itemData) {
    return db.execute(
      "INSERT INTO contactpoint (journeyMap_id, linePos, posX, length, description, emojiTag) VALUES (?, ?, ?, ?, ?, ?)",
      [itemData.journeyMap_id, itemData.linePos, itemData.posX, itemData.length, itemData.description, itemData.emojiTag]
    ).then(([result]) => result.insertId)
     .catch((error) => { throw error; });
  }

  updateItem(itemId, itemData) {
    return db.execute(
      "UPDATE contactpoint SET linePos = ?, posX = ?, length = ?, description = ?, emojiTag = ? WHERE contactPoint_id = ?",
      [itemData.linePos, itemData.posX, itemData.length, itemData.description, itemData.emojiTag, itemId]
    ).then(([result]) => result.affectedRows > 0)
     .catch((error) => { throw error; });
  }

  deleteItem(itemId) {
    return db.execute("DELETE FROM contactpoint WHERE contactPoint_id = ?", [itemId])
      .then(([result]) => result.affectedRows > 0)
      .catch((error) => { throw error; });
  }
}

module.exports = new ContactPointModel();