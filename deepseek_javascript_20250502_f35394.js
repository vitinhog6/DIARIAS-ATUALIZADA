require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./src/middlewares/errorMiddleware');
const connectDB = require('./src/config/db');

// Conectar ao banco de dados
connectDB();

const app = express();

// Middlewares básicos
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de requisições por IP
});
app.use(limiter);

// Rotas
app.use('/api/diarias', require('./src/routes/diariaRoutes'));

// Middleware de erro
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));