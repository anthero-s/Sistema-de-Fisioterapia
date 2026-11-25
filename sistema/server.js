const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const apiRoutes = require('./src/routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoints da API REST
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Servidor FisioSys rodando em http://localhost:${PORT}`);
});