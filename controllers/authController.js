// Importa o bcryptjs para comparação segura de senhas (hash)
const bcrypt = require('bcryptjs');

// Importa o modelo User que representa a tabela de usuários no banco de dados
const User = require('../models/users');

// Exporta a função login que será usada como controlador na rota de login
exports.login = async (req, res) => {
    try {
        // Desestrutura email e password enviados no corpo da requisição
        const { email, password } = req.body;

        // Validação básica: se email ou senha não forem fornecidos, retorna erro 400 (Bad Request)
        if (!email || !password)
            return res.status(400).json({ message: 'email e senha são obrigatorios' });

        // Busca o usuário no banco de dados pelo email informado
        const user = await User.findOne({ where: { email } });

        // Se usuário não for encontrado, retorna erro 404 (Not Found)
        if (!user)
            return res.status(404).json({ message: 'Usuario não encontrado' });

        // Compara a senha enviada (em texto) com a senha armazenada (hash) usando bcrypt.compare
        const passwordValid = await bcrypt.compare(password, user.password);

        // Se a senha não bater, retorna erro 400 informando que email ou senha estão incorretos
        if (!passwordValid)
            return res.status(400).json({ message: 'email ou senha estão incorretos' });

        // Se tudo estiver correto, retorna uma resposta JSON com mensagem de sucesso e dados básicos do usuário (sem senha)
        res.json({
            message: 'Login realizado com sucesso',
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        // Caso ocorra qualquer erro interno, retorna status 500 e mensagem de erro genérica
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}
