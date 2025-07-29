// Importa o modelo Contact que representa a tabela de contatos no banco de dados
const Contact = require('../models/contacts');

// Função para criar e listar todos os contatos (aparentemente o nome e funcionalidade estão trocados)
exports.createContact = async (_req, res) => {
    try {
        // Busca todos os contatos na tabela Contact, selecionando apenas alguns atributos
        const contact = await Contact.findAll({
            attributes: ['id', 'name', 'email', 'message', 'createdAt', 'updatedAt']
        });

        // Retorna a lista de contatos como JSON na resposta
        res.json(contact);
    } catch (error) {
        // Em caso de erro interno, retorna status 500 e mensagem de erro, incluindo o erro para debug
        res.status(500).json({ message: 'Erro interno do servidor.', error });
    }
}

// Função para listar contatos ordenados pela data de criação decrescente
exports.listContact = async (req, res) => {
    try {
        // Busca todos os contatos ordenados do mais recente para o mais antigo
        const contacts = await Contact.findAll({ order: [['createdAt', 'DESC']] });

        // Retorna os contatos encontrados em JSON
        res.json(contacts);
    } catch (error) {
        // Registra o erro no console para debug
        console.error('Erro ao listar contatos:', error);

        // Retorna status 500 com mensagem genérica de erro interno
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}
