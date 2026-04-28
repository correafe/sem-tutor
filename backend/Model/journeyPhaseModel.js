const db = require('./db');

class JourneyPhaseModel {
  getAllItemsByJourneyMapId(journeyMapId) {
    return db.query("SELECT * FROM journeyphase WHERE journeyMap_id = ?", [journeyMapId])
      .then(([rows]) => rows).catch(error => { throw error; });
  }

  insertJourneyPhase(data) {
    const posX = data.posX !== undefined ? data.posX : 0;
    const journeyMap_id = data.journeyMap_id !== undefined ? data.journeyMap_id : null;
    const linePos = data.linePos !== undefined ? data.linePos : 0;
    const length = data.length !== undefined ? data.length : (data.width !== undefined ? data.width : 0);
    const description = data.description || '';
    const emojiTag = data.emojiTag || '';

    return db.execute(
      "INSERT INTO journeyphase (journeyMap_id, linePos, posX, length, description, emojiTag) VALUES (?, ?, ?, ?, ?, ?)",
      [journeyMap_id, linePos, posX, length, description, emojiTag]
    ).then(([result]) => {
      this.lastId = result.insertId;
      return true;
    }).catch(error => { console.error(error); throw error; });
  }

  getLastInsertedId() {
    return Promise.resolve(this.lastId);
  }

  updateJourneyPhase(data) {
    const id = data.journeyPhase_id || data.id;
    const posX = data.posX !== undefined ? data.posX : 0;
    const length = data.length !== undefined ? data.length : (data.width !== undefined ? data.width : 0);
    const description = data.description || '';

    return db.execute(
      "UPDATE journeyphase SET posX = ?, description = ?, length = ? WHERE journeyPhase_id = ?",
      [posX, description, length, id]
    ).then(() => true).catch(error => { console.error(error); throw error; });
  }

  deleteJourneyPhase(id) {
    return db.execute("DELETE FROM journeyphase WHERE journeyPhase_id = ?", [id])
      .then(() => true).catch(error => { throw error; });
  }

  deleteByJourneyMapId(journeyMapId) {
    return db.execute("DELETE FROM journeyphase WHERE journeyMap_id = ?", [journeyMapId])
      .then(() => true).catch(error => { throw error; });
  }
}

module.exports = JourneyPhaseModel;