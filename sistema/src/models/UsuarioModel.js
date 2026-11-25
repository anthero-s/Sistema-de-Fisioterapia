const BaseModel = require('./BaseModel');
const Pessoa = require('./Pessoa');

class Usuario extends Pessoa {
  #email;
  #senha;

  constructor(id, nome, email, senha) {
    super(id, nome);
    this.#email = email;
    this.#senha = senha;
  }

  get email() { return this.#email; }

  validarSenha(senhaInformada) {
    return this.#senha === senhaInformada;
  }

  // Polimorfismo
  exibirResumo() {
    return `Profissional: ${this.nome} (${this.#email})`;
  }
}

class UsuarioModel extends BaseModel {
  constructor() {
    super('usuarios');
  }

  async autenticar(email, senha) {
    const rows = await this.db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0) return null;

    const dado = rows[0];
    const usuarioObj = new Usuario(dado.id, dado.nome, dado.email, dado.senha);

    if (!usuarioObj.validarSenha(senha)) return null;
    return usuarioObj;
  }
}

module.exports = { Usuario, UsuarioModel };