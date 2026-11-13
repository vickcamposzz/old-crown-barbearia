const express = require('express');
const cors = require('cors');
const path = require('path'); // 1. Adicionado para manipular caminhos de pastas
const agendamentoRoutes = require('./routes/agendamentoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// 2. OBRIGATÓRIO: Permite que o Express sirva o admin.html e barbearia.html no navegador
app.use(express.static(path.join(__dirname)));

app.use('/api', agendamentoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor a rodar na porta ${PORT}`);
});