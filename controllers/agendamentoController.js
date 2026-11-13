const db = require('../config/database');
const AgendamentoModel = require('../models/agendamentoModel');

// 1. Salvar novo agendamento
exports.salvarAgendamento = async (req, res) => {
  try {
    const resultado = await AgendamentoModel.criarAgendamento(req.body);
    res.status(201).json({ message: 'Agendamento realizado com sucesso!', data: resultado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar agendamento no servidor.' });
  }
};

// 2. Listar todos os agendamentos (Painel Admin)
exports.listarAgendamentos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        a.id,
        c.nome AS cliente,
        c.whatsapp,
        DATE_FORMAT(a.data_agendamento, '%Y-%m-%d') AS data_agendamento,
        a.hora_agendamento,
        a.valor_total,
        a.status,
        a.barbeiro_id,
        IF(a.status = 'Concluído', 1, 0) AS ok
      FROM agendamentos a
      JOIN clientes c ON a.cliente_id = c.id
      ORDER BY a.data_agendamento ASC, a.hora_agendamento ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar agendamentos.' });
  }
};
// 3. Listar horários já ocupados para filtro no frontend
exports.listarHorariosOcupados = async (req, res) => {
  try {
    const { date, barber_id } = req.query;
    if (!date || !barber_id) {
      return res.status(400).json({ error: 'Data e barbeiro são obrigatórios.' });
    }

    const ocupados = await db.query(
      'SELECT hora_agendamento FROM agendamentos WHERE data_agendamento = ? AND barbeiro_id = ?',
      [date, barber_id]
    );
    res.json(ocupados[0] || ocupados);
  } catch (error) {
    console.error('Erro ao buscar horários ocupados:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

// 4. Concluir / Reabrir agendamento (Toggle de status)
exports.concluirAgendamento = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`
      UPDATE agendamentos 
      SET status = IF(status = 'Concluído', 'Confirmado', 'Concluído') 
      WHERE id = ?
    `, [id]);
    res.status(200).json({ message: 'Status atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro no MariaDB:', error);
    res.status(500).json({ error: 'Erro ao atualizar agendamento.' });
  }
};
// 5. Excluir / Cancelar agendamento
exports.excluirAgendamento = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM agendamentos WHERE id = ?', [id]);
    res.status(200).json({ message: 'Agendamento excluído com sucesso' });
  } catch (err) {
    console.error('Erro no MariaDB:', err);
    res.status(500).json({ error: 'Erro ao excluir agendamento' });
  }
};