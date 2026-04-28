const db = require('./db');

class JourneyPhaseModel {
  getAllItemsByJourneyMapId(journeyMapId) {
    return db.query("SELECT * FROM journeyphase WHERE journeyMap_id = ?", [journeyMapId])
      .then(([rows]) => rows).catch(error => { throw error; });
  }

  insertJourneyPhase(itemData) {
    return db.execute(
      "INSERT INTO journeyphase (journeyMap_id, linePos, posX, length, description, emojiTag) VALUES (?, ?, ?, ?, ?, ?)",
      [itemData.journeyMap_id, itemData.linePos, itemData.posX, itemData.length, itemData.description, itemData.emojiTag]
    ).then(([result]) => {
      this.lastId = result.insertId;
      return result.affectedRows > 0;
    }).catch(error => { throw error; });
  }

  getLastInsertedId() {
    return Promise.resolve(this.lastId);
  }

  updateJourneyPhase(itemData) {
    return db.execute(
      "UPDATE journeyphase SET linePos = ?, posX = ?, length = ?, description = ?, emojiTag = ? WHERE journeyPhase_id = ?",
      [itemData.linePos, itemData.posX, itemData.length, itemData.description, itemData.emojiTag, itemData.journeyPhase_id]
    ).then(([result]) => result.affectedRows > 0).catch(error => { throw error; });
  }

  deleteJourneyPhase(itemId) {
    return db.execute("DELETE FROM journeyphase WHERE journeyPhase_id = ?", [itemId])
      .then(([result]) => result.affectedRows > 0).catch(error => { throw error; });
  }

  deleteByJourneyMapId(journeyMapId) {
    return db.execute("DELETE FROM journeyphase WHERE journeyMap_id = ?", [journeyMapId])
      .then(([result]) => result.affectedRows > 0).catch(error => { throw error; });
  }
}

module.exports = JourneyPhaseModel;