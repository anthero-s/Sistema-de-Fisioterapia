const express = require('express');
const router = express.Router();

const authController = require('../controllers/AuthController');
const pacienteController = require('../controllers/PacienteController');
const planoController = require('../controllers/PlanoController');
const sessaoController = require('../controllers/SessaoController');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/login', authController.login);

router.get('/pacientes', verificarToken, pacienteController.listar);
router.post('/pacientes', verificarToken, pacienteController.criar);
router.put('/pacientes/:id', verificarToken, pacienteController.atualizar);
router.delete('/pacientes/:id', verificarToken, pacienteController.excluir);

router.get('/planos', verificarToken, planoController.listar);
router.post('/planos', verificarToken, planoController.criar);

router.get('/sessoes', verificarToken, sessaoController.listar);
router.post('/sessoes', verificarToken, sessaoController.agendar);
router.put('/sessoes/:id/data', verificarToken, sessaoController.atualizarData);

module.exports = router;
