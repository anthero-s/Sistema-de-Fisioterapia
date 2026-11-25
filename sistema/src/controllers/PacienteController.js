const pacienteModel = require('../models/PacienteModel');

class PacienteController {
  listar = async (req, res) => {
    try {
      const { busca } = req.query;
      const pacientes = await pacienteModel.listar(busca || '');
      return res.status(200).json(pacientes);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao listar pacientes.' });
    }
  };

  criar = async (req, res) => {
    try {
      const { nome, cpf, telefone, data_nascimento } = req.body;
      if (!nome || !cpf || !telefone || !data_nascimento) {
        return res.status(400).json({ erro: 'Todos os campos do paciente são obrigatórios.' });
      }

      const novo = await pacienteModel.criar({ nome, cpf, telefone, data_nascimento });
      return res.status(201).json(novo);
    } catch (error) {
      return res.status(400).json({ erro: error.message || 'Erro ao cadastrar paciente.' });
    }
  };

  atualizar = async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, cpf, telefone, data_nascimento } = req.body;

      const existente = await pacienteModel.findById(id);
      if (!existente) {
        return res.status(404).json({ erro: 'Paciente não encontrado.' });
      }

      const atualizado = await pacienteModel.atualizar(id, { nome, cpf, telefone, data_nascimento });
      return res.status(200).json(atualizado);
    } catch (error) {
      return res.status(400).json({ erro: error.message || 'Erro ao atualizar paciente.' });
    }
  };

  excluir = async (req, res) => {
    try {
      const { id } = req.params;
      await pacienteModel.delete(id);
      return res.status(200).json({ mensagem: 'Paciente removido com sucesso.' });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao remover paciente.' });
    }
  };
}

module.exports = new PacienteController();