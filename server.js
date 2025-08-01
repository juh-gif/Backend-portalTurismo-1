// Importa a instância do Sequelize configurada e o modelo de usuário
const sequelize = require('./config/db');
require('dotenv').config();
const express = require('express')
 
const cors = require('cors');
 
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
 
app.use(cors({
  origin: 'frontend-portal-turismo-nine.vercel.app',
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));
 
app.use(express.json());
 
app.get('/', (req, res)=> res.send('api funcionando'))
 
app.use('/api/users', userRoutes)
app.use('/api/login', authRoutes)
 app.use('/api/contact' , contactRoutes)
const PORT = process.env.PORT;
 
sequelize.authenticate()
  .then(() => {
    console.log('servidor online e conectado com o DB')
    return sequelize.sync();
  })
  .then(() =>{
    console.log('banco de dados sincronizado')
    app.listen(PORT, () => console.log("SERVIDOR RODANDO NA PORTA: " + PORT))
  }).catch(erro => console.log("Erro interno do servidor", erro))
 