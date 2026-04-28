const db = require('./db');

class ContactPointModel {
  getAllItemsByJourneyMapId(journeyMapId) {
    return db.query("SELECT * FROM contactpoint WHERE journeyMap_id = ?", [journeyMapId])
      .then(([rows]) => rows).catch((error) => { throw error; });
  }

  insertContactPoint(itemData) {
    return db.execute(
      "INSERT INTO contactpoint (journeyMap_id, linePos, posX, length, description, emojiTag) VALUES (?, ?, ?, ?, ?, ?)",
      [itemData.journeyMap_id, itemData.linePos, itemData.posX, itemData.length, itemData.description, itemData.emojiTag]
    ).then(([result]) => {
      this.lastId = result.insertId;
      return result.affectedRows > 0;
    }).catch((error) => { throw error; });
  }

  getLastInsertedId() {
    return Promise.resolve(this.lastId);
  }

  updateContactPoint(itemData) {
    return db.execute(
      "UPDATE contactpoint SET linePos = ?, posX = ?, length = ?, description = ?, emojiTag = ? WHERE contactPoint_id = ?",
      [itemData.linePos, itemData.posX, itemData.length, itemData.description, itemData.emojiTag, itemData.contactPoint_id]
    ).then(([result]) => result.affectedRows > 0).catch((error) => { throw error; });
  }

  deleteContactPoint(itemId) {
    return db.execute("DELETE FROM contactpoint WHERE contactPoint_id = ?", [itemId])
      .then(([result]) => result.affectedRows > 0).catch((error) => { throw error; });
  }

  deleteByJourneyMapId(journeyMapId) {
    return db.execute("DELETE FROM contactpoint WHERE journeyMap_id = ?", [journeyMapId])
      .then(([result]) => result.affectedRows > 0).catch((error) => { throw error; });
  }
}

module.exports = ContactPointModel;