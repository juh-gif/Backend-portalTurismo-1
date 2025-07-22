// Importa o framework Express para criação de rotas HTTP
const express = require('express');

// Cria uma instância de Router do Express para definir rotas modularizadas
const router = express.Router();

// Importa o controller responsável pela autenticação (login)
const auth = require('../controllers/authController');

// Define a rota POST /login para autenticação de usuários
// Quando uma requisição POST for feita para '/login', a função 'login' do controller será executada
router.post('/login', auth.login);

// Exporta o router para ser utilizado no arquivo principal da aplicação (ex: app.js ou server.js)
module.exports = router;
