// Importa o tipo de dados do Sequelize para definir os tipos das colunas
const { DataTypes } = require('sequelize');

// Importa a instância do Sequelize configurada para conexão com o banco
const sequelize = require('../config/db');

// Define o modelo 'Contact' que representa a tabela 'contacts' no banco de dados
const Contact = sequelize.define('Contact', {
  // Campo 'id': chave primária, inteiro autoincrementável
  id: {
    type: DataTypes.INTEGER,    // Tipo inteiro
    autoIncrement: true,        // Incrementa automaticamente a cada novo registro
    primaryKey: true,           // Define como chave primária da tabela
  },

  // Campo 'name': nome do contato
  name: {
    type: DataTypes.STRING,     // Texto curto (string)
    allowNull: false,           // Campo obrigatório (não pode ser nulo)
  },

  // Campo 'email': e-mail do contato
  email: {
    type: DataTypes.STRING,     // Texto curto (string) - geralmente melhor usar STRING para e-mail
    allowNull: false,           // Campo obrigatório
  },

  // Campo 'message': mensagem enviada pelo contato
  message: {
    type: DataTypes.TEXT,       // Texto mais longo, adequado para mensagens
    allowNull: false,           // Campo obrigatório
  }

}, {
  // Configurações do modelo

  tableName: 'contacts',       // Define o nome da tabela no banco, evita pluralização automática

  timestamps: true,            // Cria automaticamente campos createdAt e updatedAt para controle de datas
});

// Exporta o modelo Contact para uso em outras partes do sistema (controllers, serviços, etc.)
module.exports = Contact;
