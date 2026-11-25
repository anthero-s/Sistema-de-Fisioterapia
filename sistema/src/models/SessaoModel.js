const BaseModel = require('./BaseModel');
const cryptoLGPD = require('../utils/CryptoLGPD');

class SessaoModel extends BaseModel {
  constructor() {
    super('sessoes');
  }

  async listarOrdenadoPorData() {
    const rows = await this.db.query(`
      SELECT
        s.id AS sessao_id,
        s.data_sessao,
        s.horario,
        s.status,
        p.id AS paciente_id,
        p.nome AS paciente_nome,
        p.cpf_criptografado,
        p.telefone AS paciente_telefone,
        p.data_nascimento AS paciente_nascimento,
        pt.id AS plano_id,
        pt.descricao AS plano_descricao,
        pt.qtd_sessoes,
        pt.valor
      FROM sessoes s
      INNER JOIN pacientes p ON s.paciente_id = p.id
      INNER JOIN planos_tratamento pt ON s.plano_id = pt.id
      ORDER BY s.data_sessao ASC, s.horario ASC
    `);

    return rows.map((r) => ({
      sessao_id: r.sessao_id,
      data_sessao: new Date(r.data_sessao).toISOString().split('T')[0],
      horario: r.horario,
      status: r.status,
      paciente: {
        id: r.paciente_id,
        nome: r.paciente_nome,
        cpf: cryptoLGPD.descriptografar(r.cpf_criptografado),
        telefone: r.paciente_telefone,
        data_nascimento: new Date(r.paciente_nascimento).toISOString().split('T')[0]
      },
      plano: {
        id: r.plano_id,
        descricao: r.plano_descricao,
        qtd_sessoes: r.qtd_sessoes,
        valor: r.valor
      }
    }));
  }

  async agendar({ paciente_id, plano_id, data_sessao, horario }) {
    const result = await this.db.query(
      'INSERT INTO sessoes (paciente_id, plano_id, data_sessao, horario) VALUES (?, ?, ?, ?)',
      [paciente_id, plano_id, data_sessao, horario]
    );
    return { id: result.insertId, paciente_id, plano_id, data_sessao, horario, status: 'Agendada' };
  }

  async atualizarData(id, nova_data) {
    const result = await this.db.query(
      'UPDATE sessoes SET data_sessao = ? WHERE id = ?',
      [nova_data, id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = new SessaoModel();