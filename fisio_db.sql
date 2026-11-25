CREATE DATABASE IF NOT EXISTS fisio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE fisio_db;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf_criptografado VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    data_nascimento DATE NOT NULL
);

CREATE TABLE planos_tratamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    qtd_sessoes INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

CREATE TABLE sessoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    plano_id INT NOT NULL,
    data_sessao DATE NOT NULL,
    horario TIME NOT NULL,
    status VARCHAR(30) DEFAULT 'Agendada',
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
    FOREIGN KEY (plano_id) REFERENCES planos_tratamento(id) ON DELETE CASCADE
);

INSERT INTO usuarios (nome, email, senha) VALUES
('Dr. Anthero Franco Sprana', 'anthero@fisio.com', '123456'),
('Dra. Ana Beatriz', 'ana@fisio.com', '123456'),
('Juliana Recepção', 'juliana@fisio.com', '123456');

INSERT INTO pacientes (nome, cpf_criptografado, telefone, data_nascimento) VALUES
('Marcos Oliveira', '7d4e6f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e', '(11) 98888-1111', '1985-04-12'),
('Fernanda Costa', '8e5f7a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f', '(11) 97777-2222', '1992-09-23'),
('Roberto Almeida', '9f6a8b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a', '(11) 96666-3333', '1978-11-05');

INSERT INTO planos_tratamento (paciente_id, descricao, qtd_sessoes, valor) VALUES
(1, 'Reabilitação Pós-Operatória de Joelho (LCA)', 10, 1200.00),
(2, 'Fisioterapia Respiratória e Postural (RPG)', 8, 960.00),
(3, 'Tratamento para Lombalgia Crônica', 12, 1440.00);

INSERT INTO sessoes (paciente_id, plano_id, data_sessao, horario, status) VALUES
(1, 1, '2026-11-26', '09:00:00', 'Agendada'),
(2, 2, '2026-11-27', '14:30:00', 'Agendada'),
(3, 3, '2026-11-28', '10:00:00', 'Agendada');