const db = require('./db');

class UserActionModel {
  getAllItemsByJourneyMapId(journeyMapId) {
    return db.query("SELECT * FROM useraction WHERE journeyMap_id = ?", [journeyMapId])
      .then(([rows]) => rows).catch(error => { throw error; });
  }

  insertUserAction(itemData) {
    return db.execute("INSERT INTO useraction (journeyMap_id, linePos, posX, length, description, emojiTag) VALUES (?, ?, ?, ?, ?, ?)", [itemData.journeyMap_id, itemData.linePos, itemData.posX, itemData.length, itemData.description, itemData.emojiTag])
      .then(() => {
        return this.getLastInsertedId();
      }).catch(error => { throw error; });
  }

  getLastInsertedId() {
    return db.query("SELECT LAST_INSERT_ID() as lastId")
      .then(([rows]) => {
        return rows[0].lastId;
      }).catch(error => { throw error; });
  }

  updateUserAction(itemData) {
    return db.execute("UPDATE useraction SET linePos = ?, posX = ?, length = ?, description = ?, emojiTag = ? WHERE userAction_id = ?", [itemData.linePos, itemData.posX, itemData.length, itemData.description, itemData.emojiTag, itemData.userAction_id])
      .then(([result]) => result.affectedRows > 0).catch(error => { throw error; });
  }

  deleteUserAction(itemId) {
    return db.execute("DELETE FROM useraction WHERE userAction_id = ?", [itemId])
      .then(([result]) => result.affectedRows > 0).catch(error => { throw error; });
  }

  deleteUserActionsByJourneyMapId(journeyMapId) {
    return db.execute("DELETE FROM useraction WHERE journeyMap_id = ?", [journeyMapId])
      .then(([result]) => result.affectedRows > 0).catch(error => { throw error; });
  }
}

module.exports = UserActionModel;
