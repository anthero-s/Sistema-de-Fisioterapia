const sessaoModel = require('../models/SessaoModel');

class SessaoController {
  listar = async (req, res) => {
    try {
      const sessoes = await sessaoModel.listarOrdenadoPorData();
      return res.status(200).json(sessoes);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao listar sessões agendadas.' });
    }
  };

  agendar = async (req, res) => {
    try {
      const { paciente_id, plano_id, data_sessao, horario } = req.body;
      if (!paciente_id || !plano_id || !data_sessao || !horario) {
        return res.status(400).json({ erro: 'Todos os campos do agendamento são obrigatórios.' });
      }

      const sessao = await sessaoModel.agendar({ paciente_id, plano_id, data_sessao, horario });
      return res.status(201).json(sessao);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao agendar sessão.' });
    }
  };

  atualizarData = async (req, res) => {
    try {
      const { id } = req.params;
      const { data_sessao } = req.body;

      if (!data_sessao) {
        return res.status(400).json({ erro: 'A nova data da sessão é obrigatória.' });
      }

      const ok = await sessaoModel.atualizarData(id, data_sessao);
      if (!ok) {
        return res.status(404).json({ erro: 'Sessão não encontrada.' });
      }

      return res.status(200).json({ mensagem: 'Data da sessão atualizada com sucesso.' });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao atualizar data da sessão.' });
    }
  };
}

module.exports = new SessaoController();