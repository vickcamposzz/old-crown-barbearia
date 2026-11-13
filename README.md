#  Old Crown — Sistema de Agendamento e Gestão de Barbearia

> Aplicação web full-stack desenvolvida para automatizar o agendamento de serviços pelos clientes e centralizar a gestão administrativa, controle de equipe e acompanhamento financeiro da barbearia **Old Crown**.

---

##  Credenciais de Acesso — Painel Administrativo

Para testar o ambiente de gestão (`admin.html`), utilize as credenciais abaixo:

* **URL de Acesso:** `http://localhost:3000/admin.html`
* **E-mail / Login:** `admin@oldcrown.com`
* **Senha:** `123456`

---

##  Informações Acadêmicas

* **Aluna:** Ana Vitória Campos da Silva
* **Curso:** Bacharelado em Sistemas de Informação
* **Instituição:** Universidade Cruzeiro do Sul
* **Disciplina:** Projeto Integrador Transdisciplinar II (PIT-II)
* **Ano:** 2026

---

##  Visão Geral do Sistema

O projeto resolve o problema do controle manual de horários e serviços, oferecendo duas interfaces integradas a uma mesma API e banco de dados relacional:

1. **Área do Cliente (`barbearia.html`):** Catálogo digital com valores, seleção de múltiplos serviços, escolha do profissional, consulta dinâmica de horários disponíveis e envio de agendamento com integração ao WhatsApp.
2. **Painel Administrativo (`admin.html`):** Dashboard protegido por autenticação com indicadores em tempo real de atendimentos do dia, atendimentos da semana, receita prevista diária e serviços concluídos. Permite filtrar a agenda por barbeiro, alternar entre visualizações (**Dia**, **Semana** e **Mês**), concluir ou cancelar atendimentos e gerenciar o cadastro da equipe.

---

##  Stack Tecnológica e Arquitetura

* **Front-end:** HTML5, CSS3 (Responsivo com suporte a tema claro/escuro) e JavaScript (Vanilla ES6+)
* **Back-end:** Node.js e Express.js estruturados no padrão **MVC** (*Model-View-Controller*)
* **Banco de Dados:** MariaDB / MySQL com transações SQL e integridade referencial
* **Modelagem:** PlantUML (`diagrama_classes.puml`)

### Estrutura de Diretórios

    old-crown-barbearia/
    ├── config/
    │   └── database.js              # Configuração do pool de conexões com o MariaDB
    ├── controllers/
    │   └── agendamentoController.js # Regras de negócio, formatação de datas e respostas HTTP
    ├── models/
    │   └── agendamentoModel.js      # Queries SQL e transações (clientes, agendamentos e serviços)
    ├── routes/
    │   └── agendamentoRoutes.js     # Definição dos endpoints da API REST
    ├── admin.html                   # Interface do Painel do Barbeiro (autenticado)
    ├── barbearia.html               # Interface pública de agendamento do cliente
    ├── schema.sql                   # Script DDL/DML para criação e população do banco de dados
    ├── diagrama_classes.puml        # Diagrama de classes da arquitetura
    ├── server.js                    # Ponto de entrada da aplicação e servidor Express
    └── package.json                 # Dependências e metadados do projeto Node.js

---

##  Endpoints da API REST

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/agendamentos` | Lista todos os agendamentos com dados de cliente, barbeiro e serviços vinculados |
| `POST` | `/api/agendamentos` | Cadastra um novo agendamento e registra os serviços selecionados via transação SQL |
| `PUT` | `/api/agendamentos/:id/concluir` | Alterna o status do atendimento entre *Pendente* e *Concluído* |
| `DELETE` | `/api/agendamentos/:id` | Remove um agendamento e seus registros associados |

---

##  Como Executar o Projeto Localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [MariaDB](https://mariadb.org/) ou MySQL Server ativo

### Passo a passo

1. **Clone este repositório:**

       git clone https://github.com/vickcamposzz/old-crown-barbearia.git
       cd old-crown-barbearia

2. **Instale as dependências do Node.js:**

       npm install

3. **Configure o banco de dados:**
   * Acesse seu gerenciador SQL (terminal MariaDB, DBeaver ou MySQL Workbench) e execute o script **`schema.sql`** para criar o banco de dados, as tabelas e inserir os serviços iniciais.
   * Verifique as credenciais de acesso (host, usuário, senha e porta) no arquivo **`config/database.js`** para garantir que correspondem ao seu ambiente local.

4. **Inicie o servidor:**

       node server.js

   *(O terminal exibirá a mensagem confirmando que o servidor está rodando na porta `3000`).*

5. **Acesse a aplicação no navegador:**
   * **Página do Cliente:** `http://localhost:3000/barbearia.html`
   * **Painel Administrativo:** `http://localhost:3000/admin.html`
     * **Login:** `admin@oldcrown.com`
     * **Senha:** `123456`

---

##  Licença

Projeto desenvolvido exclusivamente para fins acadêmicos na Universidade Cruzeiro do Sul.
