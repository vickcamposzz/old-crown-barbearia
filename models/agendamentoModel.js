const db = require('../config/database');

class AgendamentoModel {
  // 1. Recebe um objeto descontruído diretamente do controller
  static async criarAgendamento(dados) {
    const {
      clientName,
      nome,
      clientPhone,
      whatsapp,
      barber,
      barbeiro_id,
      date,
      time,
      selectedServices,
      services,
      total
    } = dados;

    // Normaliza os valores para garantir que nada vá como undefined
    const clienteNome = clientName || nome;
    const clienteWhatsapp = clientPhone || whatsapp;
    const barbeiroId = barbeiro_id || barber;
    const servicosIds = selectedServices || [];
    const valorTotal = total;

    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // 1. Inserir Cliente
      const [clienteResult] = await connection.query(
        'INSERT INTO clientes (nome, whatsapp) VALUES (?, ?)',
        [clienteNome, clienteWhatsapp]
      );
      const clienteId = clienteResult.insertId;

      // 2. Criar Agendamento
      const [agendamentoResult] = await connection.query(
        'INSERT INTO agendamentos (cliente_id, barbeiro_id, data_agendamento, hora_agendamento, valor_total) VALUES (?, ?, ?, ?, ?)',
        [clienteId, barbeiroId, date, time, valorTotal]
      );
      const agendamentoId = agendamentoResult.insertId;

      // 3. Relacionar Serviços Selecionados (N:M)
      for (let servicoId of servicosIds) {
        await connection.query(
          'INSERT INTO agendamento_servicos (agendamento_id, servico_id) VALUES (?, ?)',
          [agendamentoId, servicoId]
        );
      }

      await connection.commit();
      return { agendamentoId, clienteId };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // 2. Método estático dentro da classe para buscar horários ocupados
  static async buscarHorariosOcupados(data, barbeiroId) {
    const query = `
      SELECT hora_agendamento 
      FROM agendamentos 
      WHERE data_agendamento = ? AND barbeiro_id = ?
    `;
    const [rows] = await db.query(query, [data, barbeiroId]);
    return rows.map(r => r.hora_agendamento);
  }
}

module.exports = AgendamentoModel;