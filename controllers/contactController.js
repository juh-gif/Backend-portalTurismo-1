const Contact = require('../models/contact');
 
exports.createContact = async (req, res) => {
    try {
      const { name, email, message } = req.body;
   
      // Validação básica
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }
   
      // Cria o novo contato
      const newContact = await Contact.create({ name, email, message });
   
      res.status(201).json(newContact);
    } catch (error) {
      console.error('Erro ao criar contato:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
 
  exports.listContact = async (_req, res) => {
    try {
      const contacts = await Contact.findAll();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar contatos.' });
    }
  }
 
  exports.listContactId = async (req, res) => {
    try {
      const contact = await Contact.findByPk(req.params.id);
   
      if (!contact) {
        return res.status(404).json({ message: 'Contato não encontrado.' });
      }
   
      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }