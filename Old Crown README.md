Projeto Integrador Transdisciplinar em Sistemas de Informação II (PIT-II)

Sistema de Gestão para Barbearia – Old Crown

Este repositório contém a solução completa desenvolvida para o projeto Old Crown, implementando uma aplicação web voltada para o setor de barbearias, com foco em agendamentos, painel administrativo funcional e integração com banco de dados relacional.

🚀 1. Tecnologias Utilizadas

Front-end: HTML5, CSS3, JavaScript (Vanilla com fetch API e design responsivo).

Back-end: Node.js com Express (Padrão arquitetural MVC).

Banco de Dados: MariaDB / MySQL.

📂 2. Estrutura do Projeto (Padrão MVC)

old-crown-barbearia/
│
├── config/
│   └── database.js         # Configuração de conexão com o MariaDB
├── controllers/
│   └── agendamentoController.js # Lógica de negócios (Listar, Inserir, Concluir/Reabrir, Deletar)
├── models/
│   └── agendamentoModel.js # Camada de persistência de dados
├── routes/
│   └── agendamentoRoutes.js # Definição das rotas da API REST
├── public/ (ou arquivos raiz)
│   ├── admin.html          # Painel administrativo do barbeiro
│   └── barbearia.html      # Site principal para clientes
├── server.js               # Ponto de entrada da aplicação Node.js
└── package.json            # Dependências e scripts do projeto


⚙️ 3. Pré-requisitos

Antes de executar o projeto na sua máquina, certifique-se de ter instalado:

Node.js (versão 16 ou superior recomendada).

MariaDB ou MySQL em execução local (via XAMPP, WampServer ou serviço nativo no Linux/WSL).

🗄️ 4. Configuração do Banco de Dados

Abra o seu cliente de banco de dados (ou terminal MariaDB).

Crie a base de dados utilizando o nome exigido pelo sistema:

CREATE DATABASE old_crown_db;
USE old_crown_db;


Crie a tabela de clientes e de agendamentos com os campos necessários (como id, cliente_id, barbeiro_id, data_agendamento, hora_agendamento, valor_total e status).

💻 5. Como Executar o Projeto Localmente

Baixar ou clonar o projeto para o seu ambiente de desenvolvimento.

Instalar as dependências do Node.js abrindo o terminal na pasta raiz do projeto e executando:

npm install


Iniciar o servidor back-end:

node server.js


Se a conexão com o banco de dados for bem-sucedida, você verá uma mensagem no terminal indicando que o servidor está rodando na porta configurada.

Acessar a aplicação no navegador:

Painel Administrativo: Abra o navegador e acesse:
http://localhost:3000/admin.html

A partir do painel, é possível visualizar os agendamentos cadastrados, alternar o estado entre "Concluído" e "Reabrir", gerenciar o cancelamento e acompanhar estatísticas diárias e semanais em tempo real.

📋 6. Testes e Validação

O projeto passou por ciclos de verificação e validação com usuários reais (colegas de turma), garantindo estabilidade nas rotas de GET, POST, PUT e DELETE, além de uma experiência de uso (UX/UI) fluida e consistente.