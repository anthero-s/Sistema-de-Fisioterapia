class Pessoa {
  #id;
  #nome;

  constructor(id, nome) {
    if (new.target === Pessoa) {
      throw new Error('Pessoa é uma classe abstrata.');
    }
    this.#id = id;
    this.#nome = nome;
  }

  get id() { return this.#id; }
  get nome() { return this.#nome; }
  set nome(valor) {
    if (!valor || valor.trim().length < 2) {
      throw new Error('Nome inválido.');
    }
    this.#nome = valor.trim();
  }

  // Método polimórfico a ser sobrescrito pelas classes filhas
  exibirResumo() {
    return `Pessoa: ${this.#nome}`;
  }
}

module.exports = Pessoa;