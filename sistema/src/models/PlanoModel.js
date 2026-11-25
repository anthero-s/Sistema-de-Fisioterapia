const BaseModel = require('./BaseModel');

class PlanoModel extends BaseModel {
  constructor() {
    super('planos_tratamento');
  }

  async listarComPaciente() {
    return await this.db.query(`
      SELECT pt.id, pt.paciente_id, pt.descricao, pt.qtd_sessoes, pt.valor, p.nome AS paciente_nome
      FROM planos_tratamento pt
      INNER JOIN pacientes p ON pt.paciente_id = p.id
      ORDER BY pt.id DESC
    `);
  }

  async criar({ paciente_id, descricao, qtd_sessoes, valor }) {
    const result = await this.db.query(
      'INSERT INTO planos_tratamento (paciente_id, descricao, qtd_sessoes, valor) VALUES (?, ?, ?, ?)',
      [paciente_id, descricao, qtd_sessoes, valor]
    );
    return { id: result.insertId, paciente_id, descricao, qtd_sessoes, valor };
  }
}

module.exports = new PlanoModel();