-- =====================================================
-- Projeto Integrador Transdisciplinar PIT-II
-- Sistema de Gestão para Barbearia – Old Crown
-- Script de Criação do Banco de Dados Físico (MariaDB)
-- =====================================================

-- 1. Criação e seleção da Base de Dados
CREATE DATABASE IF NOT EXISTS old_crown_db;
USE old_crown_db;

-- 2. Remoção de tabelas existentes (caso precise resetar o ambiente)
DROP TABLE IF EXISTS agendamentos;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS barbeiros;

-- 3. Tabela de Barbeiros
CREATE TABLE barbeiros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    funcao VARCHAR(100) NOT NULL,
    experiencia VARCHAR(50),
    avaliacao VARCHAR(10),
    atendimento VARCHAR(100),
    bio TEXT
);

-- 4. Tabela de Clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    whatsapp VARCHAR(20) NOT NULL
);

-- 5. Tabela de Agendamentos (Mapeada para o Model/Controller MVC)
CREATE TABLE agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    barbeiro_id INT NOT NULL,
    data_agendamento DATE NOT NULL,
    hora_agendamento VARCHAR(10) NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'Confirmado',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (barbeiro_id) REFERENCES barbeiros(id) ON DELETE CASCADE
);

-- =====================================================
-- Inserção de Dados Iniciais (Seed para Testes)
-- =====================================================

-- Inserir Barbeiros padrão
INSERT INTO barbeiros (id, nome, funcao, experiencia, avaliacao, atendimento, bio) VALUES
(101, 'Gabriel Silva', 'Mestre barbeiro', '12 anos', '5.0', 'Segunda a sábado', 'Especialista em cortes clássicos e tesoura.'),
(102, 'Lucas Santos', 'Especialista em degradê', '7 anos', '4.9', 'Terça a sábado', 'Apaixonado por cortes modernos e fade.'),
(103, 'Matheus Costa', 'Barba e navalha', '9 anos', '4.9', 'Segunda a sexta', 'Especialista em barba tradicional e visagismo.');

-- Inserir Cliente de Exemplo
INSERT INTO clientes (id, nome, whatsapp) VALUES
(1, 'vick', '63981223150');

-- Inserir Agendamento Inicial para Teste no Painel Admin
INSERT INTO agendamentos (cliente_id, barbeiro_id, data_agendamento, hora_agendamento, valor_total, status) VALUES
(1, 101, CURDATE(), '09:00', 115.00, 'Confirmado');