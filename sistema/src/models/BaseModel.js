const db = require('../config/database');

class BaseModel {
  constructor(tableName) {
    if (new.target === BaseModel) {
      throw new Error('BaseModel é uma classe abstrata e não pode ser instanciada diretamente.');
    }
    this.tableName = tableName;
    this.db = db;
  }

  async findAll() {
    return await this.db.query(`SELECT * FROM ${this.tableName}`);
  }

  async findById(id) {
    const rows = await this.db.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    return rows[0] || null;
  }

  async delete(id) {
    return await this.db.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
  }
}

module.exports = BaseModel;