const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userController = require('../controllers/userController')


// ✅ Criar usuário (registro) — público
router.post('/', userController.createUser);

// ✅ Listar todos os usuários
router.get('/', userController.listUser);

// ✅ Buscar usuário por ID
router.get('/:id', userController.listUserById);

// ✅ Atualizar usuário
router.put('/:id', userController.updateUser);

// ✅ Deletar usuário
router.delete('/:id', userController.deleteUser);

module.exports = router;
