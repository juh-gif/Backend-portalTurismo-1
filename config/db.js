// Importa a classe Sequelize do pacote 'sequelize', que é um ORM para bancos relacionais
const { Sequelize } = require('sequelize');

// Carrega variáveis de ambiente definidas no arquivo .env para segurança e configuração flexível
require('dotenv').config();

// Cria uma instância do Sequelize para gerenciar a conexão com o banco de dados MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nome do banco de dados (ex: "meu_banco")
  process.env.DB_USER,      // Usuário do banco de dados (ex: "root")
  process.env.DB_PASSWORD,  // Senha do usuário do banco de dados
  {
    host: process.env.DB_HOST,  // Endereço do servidor do banco (ex: "localhost" ou IP)
    dialect: 'mysql',           // Dialeto do banco, indicando que será usado MySQL
    logging: false,             // Desativa logs das queries SQL no console (para menos poluição visual)
  }
);

// Exporta a instância do Sequelize para ser usada em outros arquivos do projeto (models, config, etc.)
module.exports = sequelize;
