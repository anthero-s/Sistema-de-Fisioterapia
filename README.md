# 🏥 FisioSys - API REST & Sistema de Gestão para Clínica de Fisioterapia

Sistema web desenvolvido em **Node.js**, **Express** e **MySQL2**, estruturado sob o padrão arquitetural **MVC (Model-View-Controller)** e princípios de **Programação Orientada a Objetos (POO)** para gerenciamento de pacientes, planos de tratamento e agendamentos de sessões de fisioterapia, com conformidade à **LGPD**.

## 🏗️ Arquitetura e Conceitos Aplicados

- **Padrão MVC:** Separação clara entre persistência/domínio (`src/models`), regras de controle HTTP (`src/controllers`), roteamento (`src/routes`) e interface cliente (`public/`).
- **Programação Orientada a Objetos (POO):**
  - *Abstração:* Classes base `BaseModel` e `Pessoa`.
  - *Encapsulamento:* Campos privados (`#cpfCriptografado`, `#senha`, `#nome`) protegidos por getters/setters.
  - *Herança:* `Usuario` e `Paciente` estendem `Pessoa`; os modelos estendem `BaseModel`.
  - *Polimorfismo:* Sobrescrita dos métodos `exibirResumo()` e serialização `toJSON()`.
- **Segurança & LGPD:** Criptografia `AES-256-CBC` para armazenamento de CPF no MySQL, prevenção contra SQL Injection via *Prepared Statements* (`mysql2/promise`), autenticação via **JWT** com expiração de 15 minutos e isolamento de credenciais via `.env`.

## 📡 Documentação dos Endpoints REST (Postman / Insomnia)

> Todas as rotas (exceto `/api/login`) exigem o cabeçalho: `Authorization: Bearer <seu_token_jwt>`

| Método | Endpoint | Descrição | Status HTTP |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/login` | Autentica usuário e retorna token JWT (15m) | `200`, `400`, `401` |
| `GET` | `/api/pacientes?busca=termo` | Lista ou pesquisa pacientes por nome/telefone | `200`, `401` |
| `POST` | `/api/pacientes` | Cadastra paciente com CPF criptografado | `201`, `400`, `401` |
| `PUT` | `/api/pacientes/:id` | Atualiza dados de um paciente existente | `200`, `404`, `401` |
| `DELETE` | `/api/pacientes/:id` | Remove um paciente | `200`, `401` |
| `GET` | `/api/planos` | Lista planos de tratamento e pacientes | `200`, `401` |
| `POST` | `/api/planos` | Cria plano de tratamento vinculado a paciente | `201`, `400`, `401` |
| `GET` | `/api/sessoes` | Lista sessões ordenadas por data (JOIN completo) | `200`, `401` |
| `POST` | `/api/sessoes` | Agenda nova sessão | `201`, `400`, `401` |
| `PUT` | `/api/sessoes/:id/data` | Atualiza a data de uma sessão agendada | `200`, `404`, `401` |

## 🚀 Execução Local

1. Importe o script `fisio_db.sql` no MySQL.
2. Configure o arquivo `sistema/.env` com as credenciais do seu banco.
3. Instale as dependências e inicie o servidor:
   ```bash
   cd sistema
   npm install
   npm startd