// Importa bcryptjs para hash seguro de senhas
const bcrypt = require('bcryptjs');

// Importa o modelo User, representando a tabela de usuários no banco
const User = require('../models/users');

// Função para criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    // Extrai os dados do corpo da requisição
    const { name, email, password } = req.body;

    // Valida que todos os campos obrigatórios foram preenchidos
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Verifica se já existe usuário com o email informado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email já cadastrado.' });
    }

    // Criptografa a senha usando bcrypt com 10 rounds de salt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário no banco com a senha já criptografada
    const newUser = await User.create({ name, email, password: hashedPassword });

    // Retorna resposta com dados do usuário (sem senha)
    const { id } = newUser;
    res.status(201).json({ id, name, email });
  } catch (error) {
    // Loga o erro para facilitar o debug e retorna erro genérico 500
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

// Função para listar todos os usuários com atributos específicos
exports.listUser =  async (_req, res) => {
  try {
    // Busca todos os usuários, selecionando apenas os campos essenciais para exposição
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
    });
    // Retorna a lista em formato JSON
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor.', error });
  }
}

// Função para listar um usuário pelo seu ID
exports.listUserById = async (req, res) => {
  try {
    // Busca usuário pelo ID enviado na rota (params)
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
    });

    // Se não encontrar, retorna erro 404
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Retorna o usuário encontrado
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor.', error });
  }
}

// Função para deletar um usuário pelo seu ID
exports.deleteUser = async (req, res) => {
  try {
    // Busca usuário pelo ID
    const user = await User.findByPk(req.params.id);

    // Se não existir, retorna erro 404
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Remove o usuário do banco
    await user.destroy();

    // Retorna mensagem de sucesso
    res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor.', error });
  }
}

// Função para atualizar os dados de um usuário
exports.updateUser = async (req, res) => {
  try {
    // Extrai dados enviados para atualização
    const { name, email, password } = req.body;

    // Busca usuário pelo ID
    const user = await User.findByPk(req.params.id);

    // Se não encontrar, retorna erro 404
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Atualiza o nome se fornecido
    if (name) user.name = name;

    // Atualiza email se fornecido e diferente do atual
    if (email && email !== user.email) {
      // Verifica se o email já está em uso por outro usuário
      const existing = await User.findOne({ where: { email } });
      if (existing) {
        return res.status(400).json({ message: 'Email já está em uso.' });
      }
      user.email = email;
    }

    // Atualiza a senha se fornecida, aplicando hash
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Salva as alterações no banco
    await user.save();

    // Retorna os dados atualizados (sem a senha)
    res.status(200).json({
      message: 'Usuário atualizado com sucesso.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor.', error });
  }
}
