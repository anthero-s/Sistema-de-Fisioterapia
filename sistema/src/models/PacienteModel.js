const BaseModel = require('./BaseModel');
const Pessoa = require('./Pessoa');
const cryptoLGPD = require('../utils/CryptoLGPD');

class Paciente extends Pessoa {
  #cpfCriptografado;
  #telefone;
  #dataNascimento;

  constructor(id, nome, cpfPlanoOuCripto, telefone, dataNascimento, jaCriptografado = false) {
    super(id, nome);
    this.#cpfCriptografado = jaCriptografado
      ? cpfPlanoOuCripto
      : cryptoLGPD.criptografar(cpfPlanoOuCripto);
    this.#telefone = telefone;
    this.#dataNascimento = dataNascimento;
  }

  get cpfCriptografado() { return this.#cpfCriptografado; }
  get cpfDescriptografado() { return cryptoLGPD.descriptografar(this.#cpfCriptografado); }
  get telefone() { return this.#telefone; }
  get dataNascimento() { return this.#dataNascimento; }

  // Polimorfismo
  exibirResumo() {
    return `Paciente: ${this.nome} | Tel: ${this.#telefone}`;
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      cpf: this.cpfDescriptografado,
      telefone: this.#telefone,
      data_nascimento: this.#dataNascimento
    };
  }
}

class PacienteModel extends BaseModel {
  constructor() {
    super('pacientes');
  }

  async listar(termoBusca = '') {
    let rows;
    if (termoBusca) {
      const like = `%${termoBusca}%`;
      rows = await this.db.query(
        'SELECT * FROM pacientes WHERE nome LIKE ? OR telefone LIKE ? ORDER BY nome ASC',
        [like, like]
      );
    } else {
      rows = await this.db.query('SELECT * FROM pacientes ORDER BY nome ASC');
    }

    return rows.map(
      (r) =>
        new Paciente(
          r.id,
          r.nome,
          r.cpf_criptografado,
          r.telefone,
          new Date(r.data_nascimento).toISOString().split('T')[0],
          true
        ).toJSON()
    );
  }

  async criar({ nome, cpf, telefone, data_nascimento }) {
    const paciente = new Paciente(null, nome, cpf, telefone, data_nascimento, false);
    const result = await this.db.query(
      'INSERT INTO pacientes (nome, cpf_criptografado, telefone, data_nascimento) VALUES (?, ?, ?, ?)',
      [paciente.nome, paciente.cpfCriptografado, paciente.telefone, paciente.dataNascimento]
    );
    return { id: result.insertId, ...paciente.toJSON() };
  }

  async atualizar(id, { nome, cpf, telefone, data_nascimento }) {
    const paciente = new Paciente(id, nome, cpf, telefone, data_nascimento, false);
    await this.db.query(
      'UPDATE pacientes SET nome = ?, cpf_criptografado = ?, telefone = ?, data_nascimento = ? WHERE id = ?',
      [paciente.nome, paciente.cpfCriptografado, paciente.telefone, paciente.dataNascimento, id]
    );
    return paciente.toJSON();
  }
}

module.exports = new PacienteModel();