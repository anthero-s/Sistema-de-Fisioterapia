const planoModel = require('../models/PlanoModel');

class PlanoController {
  listar = async (req, res) => {
    try {
      const planos = await planoModel.listarComPaciente();
      return res.status(200).json(planos);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao listar planos de tratamento.' });
    }
  };

  criar = async (req, res) => {
    try {
      const { paciente_id, descricao, qtd_sessoes, valor } = req.body;
      if (!paciente_id || !descricao || !qtd_sessoes || !valor) {
        return res.status(400).json({ erro: 'Informe o paciente associado e todos os dados do plano.' });
      }

      const plano = await planoModel.criar({ paciente_id, descricao, qtd_sessoes, valor });
      return res.status(201).json(plano);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao cadastrar plano de tratamento.' });
    }
  };
}

module.exports = new PlanoController();