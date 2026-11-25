const jwt = require('jsonwebtoken');
const { UsuarioModel } = require('../models/UsuarioModel');
require('dotenv').config();

class AuthController {
  constructor() {
    this.usuarioModel = new UsuarioModel();
  }

  login = async (req, res) => {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
      }

      const usuario = await this.usuarioModel.autenticar(email, senha);
      if (!usuario) {
        return res.status(401).json({ erro: 'Falha na autenticação: credenciais inválidas.' });
      }

      // Gera token JWT com expiração de 15 minutos
      const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );

      return res.status(200).json({
        mensagem: 'Login realizado com sucesso.',
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          resumo: usuario.exibirResumo()
        }
      });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
  };
}

module.exports = new AuthController();