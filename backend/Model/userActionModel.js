const db = require('./db');

class UserActionModel {
  getAllItemsByJourneyMapId(journeyMapId) {
    return db.query("SELECT * FROM useraction WHERE journeyMap_id = ?", [journeyMapId])
      .then(([rows]) => rows).catch(error => { throw error; });
  }

  insertUserAction(data) {
    const posX = data.posX !== undefined ? data.posX : 0;
    const journeyMap_id = data.journeyMap_id !== undefined ? data.journeyMap_id : null;
    const linePos = data.linePos !== undefined ? data.linePos : 0;
    const length = data.length !== undefined ? data.length : (data.width !== undefined ? data.width : 0);
    const description = data.description || '';
    const emojiTag = data.emojiTag || '';

    return db.execute(
      "INSERT INTO useraction (journeyMap_id, linePos, posX, length, description, emojiTag) VALUES (?, ?, ?, ?, ?, ?)",
      [journeyMap_id, linePos, posX, length, description, emojiTag]
    ).then(([result]) => {
      this.lastId = result.insertId;
      return true;
    }).catch(error => { console.error(error); throw error; });
  }

  getLastInsertedId() {
    return Promise.resolve(this.lastId);
  }

  updateUserAction(data) {
    const id = data.userAction_id || data.id;
    const posX = data.posX !== undefined ? data.posX : 0;
    const length = data.length !== undefined ? data.length : (data.width !== undefined ? data.width : 0);
    const description = data.description || '';

    return db.execute(
      "UPDATE useraction SET posX = ?, description = ?, length = ? WHERE userAction_id = ?",
      [posX, description, length, id]
    ).then(() => true).catch(error => { console.error(error); throw error; });
  }

  deleteUserAction(id) {
    return db.execute("DELETE FROM useraction WHERE userAction_id = ?", [id])
      .then(() => true).catch(error => { throw error; });
  }

  deleteUserActionsByJourneyMapId(journeyMapId) {
    return db.execute("DELETE FROM useraction WHERE journeyMap_id = ?", [journeyMapId])
      .then(() => true).catch(error => { throw error; });
  }
}

module.exports = UserActionModel;
