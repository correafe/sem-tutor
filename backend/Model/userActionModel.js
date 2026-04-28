const db = require('./db');

class UserActionModel {
  getAllItemsByJourneyMapId(journeyMapId) {
    return db.query("SELECT * FROM useraction WHERE journeyMap_id = ?", [journeyMapId])
      .then(([rows]) => rows).catch(error => { throw error; });
  }

  insertUserAction(itemData) {
    return db.execute(
      "INSERT INTO useraction (journeyMap_id, linePos, posX, length, description, emojiTag) VALUES (?, ?, ?, ?, ?, ?)",
      [
        itemData.journeyMap_id ?? null,
        itemData.linePos ?? null,
        itemData.posX ?? null,
        itemData.length ?? null,
        itemData.description ?? '',
        itemData.emojiTag ?? ''
      ]
    ).then(([result]) => {
      this.lastId = result.insertId;
      return result.affectedRows > 0;
    }).catch(error => { throw error; });
  }

  getLastInsertedId() {
    return Promise.resolve(this.lastId);
  }

  updateUserAction(itemData) {
    return db.execute(
      "UPDATE useraction SET linePos = ?, posX = ?, length = ?, description = ?, emojiTag = ? WHERE userAction_id = ?",
      [
        itemData.linePos ?? null,
        itemData.posX ?? null,
        itemData.length ?? null,
        itemData.description ?? '',
        itemData.emojiTag ?? '',
        itemData.userAction_id ?? null
      ]
    ).then(([result]) => result.affectedRows > 0).catch(error => { throw error; });
  }

  deleteUserAction(itemId) {
    return db.execute("DELETE FROM useraction WHERE userAction_id = ?", [itemId ?? null])
      .then(([result]) => result.affectedRows > 0).catch(error => { throw error; });
  }

  deleteUserActionsByJourneyMapId(journeyMapId) {
    return db.execute("DELETE FROM useraction WHERE journeyMap_id = ?", [journeyMapId ?? null])
      .then(([result]) => result.affectedRows > 0).catch(error => { throw error; });
  }
}

module.exports = UserActionModel;
