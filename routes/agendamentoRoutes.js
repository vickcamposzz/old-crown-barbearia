const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');

router.post('/agendamentos', agendamentoController.salvarAgendamento);
router.get('/agendamentos', agendamentoController.listarAgendamentos);
router.get('/agendamentos/ocupados', agendamentoController.listarHorariosOcupados);

// Novas rotas para Concluir e Cancelar/Excluir
router.put('/agendamentos/:id/concluir', agendamentoController.concluirAgendamento);
router.delete('/agendamentos/:id', agendamentoController.excluirAgendamento);

module.exports = router;